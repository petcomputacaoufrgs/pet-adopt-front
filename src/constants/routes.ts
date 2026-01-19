// Configuração centralizada de rotas da aplicação

// Rotas públicas do frontend
export const PUBLIC_PATHS = {
  HOME: '/',
  SEARCH_ANIMALS: '/searchAnimals',
  PET_PROFILE: '/petProfile/:id',
  NGO_PROFILE: '/NGOProfile/:id',
  LIST_NGOS: '/listNGOs',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgotPassword',
  RESET_PASSWORD: '/resetPassword',
} as const;

// Endpoints da API que são públicos (não requerem autenticação)
export const PUBLIC_API_ENDPOINTS = [
  '/auth/login',
  '/auth/signup/ngo',
  '/auth/signup/ngo-member',
  '/auth/password/request-reset',
  '/auth/password/reset',
  '/auth/refresh',
] as const;

// Verifica se uma URL de API é pública
export const isPublicApiEndpoint = (url?: string): boolean => {
  if (!url) return false;
  return PUBLIC_API_ENDPOINTS.some(endpoint => url.includes(endpoint));
};
