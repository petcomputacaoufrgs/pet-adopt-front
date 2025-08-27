import axios from 'axios';

// Configuração base da API
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3002/api/v1',
  withCredentials: true, // Habilita o envio de cookies para o backend
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para respostas (tratamento global de erros)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const statusCode = error.response?.status;
    const errorMessage = error.response?.data?.message || 'Erro interno do servidor';

    // Log do erro para debug
    console.error('API Error:', {
      status: statusCode,
      message: errorMessage,
      url: error.config?.url
    });

    switch (statusCode) {
      case 401:
        // Token expirado ou inválido - redirecionar para login
        console.log('Token expirado ou inválido, redirecionando para login...');
        
        // Limpar dados de autenticação
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        
        // Salvar mensagem de erro para mostrar na tela de login
        if (window.location.pathname !== '/login') {
          localStorage.setItem('authError', 'Sua sessão expirou. Faça login novamente.');
          window.location.href = '/login';
        }
        break;

      case 403:
        // Usuário logado mas sem autorização - redirecionar para homepage
        console.log('Acesso negado, redirecionando para homepage...');
        
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
