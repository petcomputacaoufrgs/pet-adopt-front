export interface UserFilters {
  name?: string;
  city?: string;
  state?: string;
  NGO?: string;
}

/**
 * Constrói query parameters para filtros de NGO
 */
export const buildUserQueryParams = (filters?: UserFilters): string => {
  if (!filters) return '';
  
  const params = new URLSearchParams();
  
  if (filters.name && filters.name.trim()) {
    params.append('name', filters.name.trim());
  }


  return params.toString();
};

/**
 * Constrói URL completa para Users de uma ongs com filtros
 */
export const buildUserUrl = (baseUrl: string, ngoId: string, filters?: UserFilters): string => {
  const queryString = buildUserQueryParams(filters);
  return queryString ? `${baseUrl}${ngoId}?${queryString}` : `${baseUrl}${ngoId}`;
};