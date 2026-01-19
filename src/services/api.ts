import axios, { AxiosError } from 'axios';
import { isPublicApiEndpoint } from '../constants/routes';

// Configuração base da API
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3002/api/v1',
  withCredentials: true, // Permite o envio de cookies com as requisições
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Variável para controlar se já estamos fazendo refresh
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

// Função para processar a fila de requisições que falharam
const processQueue = (error: any, success: boolean = false) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(success);
    }
  });
  
  failedQueue = [];
};

// Interceptor para respostas (tratamento global de erros e refresh token)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const statusCode = error.response?.status;
    const errorMessage = error.response?.data?.message || 'Erro interno do servidor';

    // Se o erro for 401 e não for uma tentativa de refresh e não foi já tentado refresh
    if (statusCode === 401 && !originalRequest._retry && !isPublicApiEndpoint(originalRequest.url)) {
      
      // Se já estamos fazendo refresh, adicionar à fila
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          return api(originalRequest);
        }).catch((err) => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Tentar fazer refresh do token
        const refreshResponse = await api.post('/auth/refresh');
        
        // Aceitar tanto 200 (OK) quanto 201 (Created)
        if (refreshResponse.status === 200 || refreshResponse.status === 201) {
          // Processar fila de requisições pendentes
          processQueue(null, true);
          
          // Tentar novamente a requisição original
          const retryResponse = await api(originalRequest);
          
          return retryResponse;
          
        } else {
          throw new Error(`Refresh falhou com status ${refreshResponse.status}`);
        }
        
      } catch (refreshError: unknown) {
        // Processar fila com erro
        processQueue(refreshError, false);
        
        // Limpar dados de autenticação do localStorage (se houver)
        localStorage.removeItem('user');
        
        // Redirecionar para login se não estiver já lá
        if (window.location.pathname !== '/login') {
          localStorage.setItem('authError', 'Sua sessão expirou. Faça login novamente.');
          window.location.href = '/login';
        }
        
        return Promise.reject(refreshError);
        
      } finally {
        isRefreshing = false;
      }
    }

    // Se é erro 401 e já tentou refresh, ou é erro 401 em rota pública
    if (statusCode === 401) {
      // Para rotas públicas, apenas rejeitar sem redirecionar para login
      if (isPublicApiEndpoint(originalRequest.url)) {
        return Promise.reject(error);
      }
      
      // Para rotas privadas, limpar sessão e redirecionar
      localStorage.removeItem('user');
      
      if (window.location.pathname !== '/login') {
        localStorage.setItem('authError', 'Sua sessão expirou. Faça login novamente.');
        window.location.href = '/login';
      }
      
      return Promise.reject(error);
    }

    // Outros tratamentos de erro
    switch (statusCode) {
      case 403:
        if (window.location.pathname !== '/') {
          localStorage.setItem('authorizationError', 'A sua conta não tem autorização para acessar esta funcionalidade.');
          window.location.href = '/';
        }
        break;

      case 404:
        console.error('Recurso não encontrado:', errorMessage);
        break;

      case 500:
        console.error('Erro interno do servidor:', errorMessage);
        break;

      default:
        console.error('Erro na requisição:', errorMessage);
    }

    return Promise.reject(error);
  }
);

export default api;
