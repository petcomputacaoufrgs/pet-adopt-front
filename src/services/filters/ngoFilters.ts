export interface NGOFilters {
  name?: string;
  city?: string;
  state?: string;
}

/**
 * Constrói query parameters para filtros de NGO
 */
export const buildNGOQueryParams = (filters?: NGOFilters): string => {
  if (!filters) return '';
  
  const params = new URLSearchParams();
  
  if (filters.name && filters.name.trim()) {
    params.append('name', filters.name.trim());
  }
  
  if (filters.city && filters.city.trim()) {
    params.append('city', filters.city.trim());
  }
  
  if (filters.state && filters.state.trim() && filters.state !== 'Qualquer') {
    params.append('state', filters.state.trim());
  }
  
  return params.toString();
};

/**
 * Constrói URL completa para NGOs com filtros
 */
export const buildNGOUrl = (baseUrl: string, filters?: NGOFilters): string => {
  const queryString = buildNGOQueryParams(filters);
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};