import api from './api';

import { buildNGOUrl } from './filters/ngoFilters';
import type { NGOFilters } from './filters/ngoFilters';

import { buildUserUrl } from './filters/userFilters';
import type { UserFilters } from './filters/userFilters';

import { buildPetUrl, normalizeFiltersForApi } from './filters/petFilters';
import type { PetFilters } from './filters/petFilters';


// Serviços relacionados à autenticação
export const authService = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  
  signupNgoMember: (userData: any) => 
    api.post('/auth/signup/ngo-member', userData),
  
  signupNgo: (userData: any) => 
    api.post('/auth/signup/ngo', userData),

  updateNgo: (ngoId: string, ngoData: any) => 
    api.patch(`/auth/${ngoId}`, ngoData),

  requestPasswordReset: (email: string) => 
    api.post('/auth/password/request-reset', { email }),

  resetPassword: (token: string, newPassword: string) => 
    api.post('/auth/password/reset', { token, newPassword }),
};

// Serviços relacionados às ONGs
export const ngoService = {
  getApproved: (filters?: NGOFilters) => {
    const url = buildNGOUrl('/ngos', filters);
    return api.get(url);
  },

  getApprovedPage: (filters?: NGOFilters) => {
    return api.get('/ngos/page', {
      params: filters
    }); 
  },

  
  getUnapproved: (filters?: NGOFilters) => {
    const url = buildNGOUrl('/ngos/unapproved', filters);
    return api.get(url);
  },

  getUnapprovedPage: (filters?: NGOFilters) => {
    return api.get('/ngos/unapproved/page', {
      params: filters
    }); 
  },
  
  approve: (ngoId: string) => 
    api.patch(`/ngos/${ngoId}/approve`),
  
  delete: (ngoId: string) => 
    api.delete(`/ngos/${ngoId}`),

  getById: (ngoId: string) => 
    api.get(`/ngos/${ngoId}`),

  isApproved:(id: string) => 
    api.get(`/ngos/${id}/is-approved`),

  update: (ngoId: string, ngoData: any) => {
    console.log("Updating NGO ID:", ngoId, "with data:", ngoData);
    return api.patch(`/ngos/${ngoId}`, ngoData);
  }  
};

// Serviços relacionados aos pets
export const petService = {
  getAll: (filters?: PetFilters) => {
    const url = buildPetUrl('/pets', filters);
    return api.get(url);
  },

  getPage: (filters?: PetFilters) => {
    const apiFilters = normalizeFiltersForApi(filters || {});
    return api.get('/pets/page', {
      params: apiFilters
    });

  },

  getImage: (imagePath: string) => 
    api.get(`/pets/image/${imagePath}`, { responseType: 'blob' }),
  
  getById: (petId: string) => 
    api.get(`/pets/${petId}`),

  getRecentPets: () =>
    api.get('/pets/recent'),
  
  create: (petData: FormData) => 
    api.post('/pets', petData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  
  update: (petId: string, petData: FormData) => 
    api.patch(`/pets/${petId}`, petData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  
  delete: (petId: string) => 
    api.delete(`/pets/${petId}`),
};

// Serviços relacionados aos usuários
export const userService = {
  getByRole: (role: string) => 
    api.get(`/users/role/${role}`),


  getById: (userId: string) => {
    return api.get(`/users/${userId}`);
  },

  
  getApprovedMembers: (ngoId: string, filters?: UserFilters) => {
    const url = buildUserUrl('/users/approvedMembers/', ngoId, filters);
    return api.get(url);
  },

  getApprovedMembersPage: (ngoId: string, filters?: UserFilters) => {    
    return api.get(`/users/approvedMembers/page/${ngoId}`, {
      params: filters
    });
},

  getUnapprovedMembers: (ngoId: string, filters?: UserFilters) => {
    
    const url = buildUserUrl('/users/unapprovedMembers/', ngoId, filters);
    return api.get(url);
  },

  getUnapprovedMembersPage: (ngoId: string, filters?: UserFilters) => {    
    return api.get(`/users/unapprovedMembers/page/${ngoId}`, {
      params: filters
    });
  },


  approve: (memberId: string) => 
    api.patch(`/users/${memberId}/approve`),

  delete: (memberId: string) => 
    api.delete(`/users/${memberId}`),

  update: (userId: string, userData: any) => 
    api.patch(`/users/${userId}`, userData),
};

/* Serviços relacionados a estatísticas
export const statisticsService = {
  
};*/

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

// Exportar interfaces e utilitários
export type { NGOFilters, PetFilters, UserFilters };
export { buildUserUrl } from './filters/userFilters';
export { buildNGOUrl } from './filters/ngoFilters';
export { buildPetUrl, createPetFiltersFromState } from './filters/petFilters';
export { formatAge, formatSize, formatString, formatSpecies } from './formatters/petFormatters';
