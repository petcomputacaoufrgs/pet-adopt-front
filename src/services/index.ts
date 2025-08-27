import api from './api';

// Serviços relacionados à autenticação
export const authService = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  
  signupRegular: (userData: any) => 
    api.post('/auth/signup/regular', userData),
  
  signupNgo: (userData: any) => 
    api.post('/auth/signup/ngo', userData),
  
  manageInfo: (userData: any) => 
    api.post('/auth/manageInfo', userData),
};

// Serviços relacionados às ONGs
export const ngoService = {
  getApproved: () => 
    api.get('/ngos/approved'),
  
  getUnapproved: () => 
    api.get('/ngos/unapproved'),
  
  approve: (ngoId: string) => 
    api.patch(`/ngos/${ngoId}/approve`),
  
  delete: (ngoId: string) => 
    api.delete(`/ngos/${ngoId}`),
};

// Serviços relacionados aos pets
export const petService = {
  getAll: () => 
    api.get('/pets'),
  
  getById: (petId: string) => 
    api.get(`/pets/${petId}`),
  
  create: (petData: any) => 
    api.post('/pets', petData),
  
  update: (petId: string, petData: any) => 
    api.put(`/pets/${petId}`, petData),
  
  delete: (petId: string) => 
    api.delete(`/pets/${petId}`),
};

// Serviços relacionados aos usuários
export const userService = {
  getByRole: (role: string) => 
    api.get(`/users/role/${role}`),
};

// Funções utilitárias para verificar e limpar mensagens de erro
export const getAuthError = (): string | null => {
  const error = localStorage.getItem('authError');
  if (error) {
    localStorage.removeItem('authError');
    return error;
  }
  return null;
};

export const getAuthorizationError = (): string | null => {
  const error = localStorage.getItem('authorizationError');
  if (error) {
    localStorage.removeItem('authorizationError');
    return error;
  }
  return null;
};
