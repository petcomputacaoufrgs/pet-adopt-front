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
    // Tratamento global de erros
    if (error.response?.status === 401) {
      // Token expirado, redirecionar para login
      // localStorage.removeItem('authToken');
      // window.location.href = '/login';
    }
    if (error.response?.status === 403) {
      // Acesso negado, redirecionar para HomePage
    }
    return Promise.reject(error);
  }
);

export default api;
