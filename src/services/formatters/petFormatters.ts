/**
 * Formata idade do backend para exibição
 */
export const formatAge = (age: string): string => {
  switch (age) {
    case "newborn": return "Recém nascido";
    case "baby": return "Filhote";
    case "1y": return "1 ano";
    case "2y": return "2 anos";
    case "3y": return "3 anos";
    case "4y": return "4 anos";
    case "5y": return "5 anos";
    case "6y+": return "6 anos+";
    default: return age;
  }
};

/**
 * Formata tamanho do backend para exibição
 */
export const formatSize = (size: string): string => {
  switch (size) {
    case "P": return "Pequeno";
    case "M": return "Médio";
    case "G": return "Grande";
    default: return size;
  }
};

/**
 * Formata string genérica para exibição
 */
export const formatString = (str?: any): string => {
  if (str === undefined || str === null) return "";
  const clean = String(str).replace(/['"]/g, "").trim();
  return clean.charAt(0).toUpperCase() + clean.slice(1);
};

/**
 * Formata espécie para exibição
 */
export const formatSpecies = (species: string): string => {
  switch (species.toLowerCase()) {
    case "dog": return "Cão";
    case "cat": return "Gato";
    case "bird": return "Pássaro";
    default: return formatString(species);
  }
};