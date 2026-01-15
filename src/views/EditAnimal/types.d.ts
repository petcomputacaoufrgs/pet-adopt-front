export interface Animal {
  id: string;
  name: string;
  age: string;
  breed: string;
  ngoId: string;
  ngoStrId: string;
  city: string;
  state: string;
  specieIndex: number;
  animalSexIndex: number;
  sizeIndex: number;
  situationIndex: number;
  characteristics: string;
  photos: string[]; // URLs das imagens
  
  species: string; // "DOG", "CAT", "OTHER"
  sex: string; // "M", "F"
  size?: string; // "P", "M", "G" (apenas para cachorros)
  status: string; // "Available", "TempHome", "Adopted"
  otherSpecies?: string; // Para quando species === "OTHER"
  
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
  isActive?: boolean;

}

export interface IAnimalForm {
  animalData?: Animal; // Se presente, é edição; se undefined, é criação
}