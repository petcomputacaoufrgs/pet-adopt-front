export interface PetFilters {
  species?: string;
  name?: string;
  state?: string;
  city?: string;
  breed?: string;
  sex?: string;
  age?: string;
  size?: string;
  situation?: string;
}

/**
 * Mapeia estados do frontend para códigos do backend
 */
const mapStateToBackend = (state: string): string | null => {
  switch (state) {
    case "Rio Grande do Sul": 
      return 'RS';
    case "Santa Catarina": 
      return 'SC';
    case "Paraná": 
      return 'PR';
    default:
      return state !== 'Qualquer' ? state : null;
  }
};

/**
 * Mapeia idades do frontend para códigos do backend
 */
const mapAgeToBackend = (age: string): string => {
  switch (age) {
    case "Abaixo de 3 meses": 
      return 'newborn';
    case "3 a 11 meses": 
      return 'baby';
    case "1 ano": 
      return '1y';
    case "2 anos": 
      return '2y';
    case "3 anos": 
      return '3y';
    case "4 anos": 
      return '4y';
    case "5 anos": 
      return '5y';
    case "6 anos e acima": 
      return '6y+';
    default:
      return age;
  }
};

/**
 * Mapeia tamanhos do frontend para códigos do backend
 */
const mapSizeToBackend = (size: string): string => {
  switch (size) {
    case "Pequeno": 
      return 'P';
    case "Médio": 
      return 'M';
    case "Grande": 
      return 'G';
    default:
      return size;
  }
};

/**
 * Mapeia sexo do frontend para códigos do backend
 */

const mapSexToBackend = (sex: string): string => {
  switch (sex) {
    case "Macho": 
      return 'M';
    case "Fêmea": 
      return 'F';
    default:
      return '';
  }
}

/**
 * Mapeia espécies por índice para strings
 */
export const mapSpeciesIndexToString = (speciesIndex: number): string | null => {
  switch (speciesIndex) {
    case 0: 
      return "dog";
    case 1: 
      return "cat";
    case 2: 
      return "other";
    default:
      return null;
  }
};

/**
 * Constrói query parameters para filtros de Pet
 */
export const buildPetQueryParams = (filters?: PetFilters): string => {
  if (!filters) return '';
  
  const params = new URLSearchParams();
  
  // Espécie
  if (filters.species) {
    params.append('species', filters.species);
  }
  
  // Nome
  if (filters.name && filters.name.trim()) {
    params.append('name', filters.name.trim());
  }
  
  // Estado
  if (filters.state) {
    const mappedState = mapStateToBackend(filters.state);
    if (mappedState) {
      params.append('state', mappedState);
    }
  }
  
  // Cidade
  if (filters.city && filters.city.trim()) {
    params.append('city', filters.city.trim());
  }
  
  // Raça
  if (filters.breed && filters.breed.trim()) {
    params.append('breed', filters.breed.trim());
  }
  
  // Sexo
  if (filters.sex) {
    params.append('sex', mapSexToBackend(filters.sex));
  }
  
  // Idade
  if (filters.age) {
    params.append('age', mapAgeToBackend(filters.age));
  }
  
  // Tamanho
  if (filters.size) {
    params.append('size', mapSizeToBackend(filters.size));
  }
  
  // Situação
  if (filters.situation) {
    params.append('situation', filters.situation);
  }
  
  return params.toString();
};

/**
 * Constrói URL completa para pets com filtros
 */
export const buildPetUrl = (baseUrl: string, filters?: PetFilters): string => {
  const queryString = buildPetQueryParams(filters);
  const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;
  
  console.log('📡 URL gerada para pets:', url);
  return url;
};

/**
 * Cria filtros de pet a partir dos estados do componente
 */
export const createPetFiltersFromState = (state: {
  selectedSpecie: number;
  name: string;
  selectedState: string;
  city: string;
  breed: string;
  selectedSex: string;
  selectedAge: string;
  selectedSize: string;
  selectedSituation: string;
}): PetFilters => {
  const filters: PetFilters = {};
  
  // Mapear espécie por índice
  if (state.selectedSpecie !== -1) {
    const species = mapSpeciesIndexToString(state.selectedSpecie);
    if (species) {
      filters.species = species;
    }
  }
  
  if (state.name) filters.name = state.name;
  if (state.selectedState) filters.state = state.selectedState;
  if (state.city) filters.city = state.city;
  if (state.breed) filters.breed = state.breed;
  if (state.selectedSex) filters.sex = state.selectedSex;
  if (state.selectedAge) filters.age = state.selectedAge;
  if (state.selectedSize) filters.size = state.selectedSize;
  if (state.selectedSituation) filters.situation = state.selectedSituation;
  
  return filters;
};