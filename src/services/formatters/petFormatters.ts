import type { AnimalFormSchema } from "../../hooks/useAnimalForm";

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
    case "other": return "Outro";
    default: return formatString(species);
  }
};


/* =============================================== */
// Mapemanetos do front para o backend (quando o usuário submete o formulário)


// 1. Helpers menores e puros (Fáceis de testar)
const mapSexToBackend = (index: number) => index === 0 ? "M" : "F";
const mapSizeToBackend = (index: number) => ["P", "M", "G"][index] || "P";

const mapSpeciesToBackend = (index: number, otherValue?: string) => {
  if (index === 0) return { species: "dog", otherSpecies: "" };
  if (index === 1) return { species: "cat", otherSpecies: "" };
  return { species: "other", otherSpecies: otherValue || String(index) };
};

const mapSituationToBackend = (index: number) => {
  const options = [
    { status: "Available", forAdoption: "true", forTempHome: "true" },
    { status: "TempHome", forAdoption: "true", forTempHome: "false" },
    { status: "Adopted", forAdoption: "false", forTempHome: "false" }
  ];
  return options[index] || options[0];
};

// Mapas auxiliares para envio (Submit)
const ageMapBackend: Record<string, string> = {
  "Abaixo de 3 meses": "newborn",
  "3 a 11 meses": "baby",
  "1 ano": "1y", "2 anos": "2y", "3 anos": "3y", "4 anos": "4y", "5 anos": "5y", "6 anos e acima": "6y+"
};

const mapAgeToBackend = (ageStr: string): string => ageMapBackend[ageStr] || ageStr;


const resolveNgoId = (ngoStrId: string, ngoOptions: any[]) => {
  const selectedNgo = ngoOptions.find(n => `${n.name} - ${n.email}` === ngoStrId);
  if (!selectedNgo) throw new Error("ONG inválida selecionada");
  return selectedNgo.id;
};



export const buildAnimalFormData = (
  data: AnimalFormSchema, 
  ngoOptions: any[], 
): FormData => {
  const formData = new FormData();

  // Campos Simples
  formData.append("name", data.name);
  formData.append("age", mapAgeToBackend(data.age));
  formData.append("breed", data.breed || "");
  formData.append("characteristics", data.characteristics);
  formData.append("city", data.city);
  formData.append("state", data.state);
  formData.append("observations", ""); 

  // NGO
  formData.append("ngoId", resolveNgoId(data.ngoStrId, ngoOptions));

  // Mapeamentos de Índices
  formData.append("sex", mapSexToBackend(data.animalSexIndex));
  formData.append("size", mapSizeToBackend(data.sizeIndex));
  
  const speciesData = mapSpeciesToBackend(data.specieIndex, data.otherSpecies);
  formData.append("species", speciesData.species);
  if (speciesData.otherSpecies) formData.append("otherSpecies", speciesData.otherSpecies);

  // Status
  const statusData = mapSituationToBackend(data.situationIndex);
  formData.append("status", statusData.status);
  formData.append("forAdoption", statusData.forAdoption);
  formData.append("forTempHome", statusData.forTempHome);

  // Imagens
  const validImages = data.images.filter(img => img !== null);
  const photoOrder = validImages.map(img => {
    if (typeof img === 'string') return img;
    if (img instanceof File) return "NEW_FILE_MARKER";
    return null;
  });
  
  formData.append('photoOrder', JSON.stringify(photoOrder));
  validImages.forEach((img) => {
    if (img instanceof File) formData.append('photos', img);
  });

  return formData;
};


