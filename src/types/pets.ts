export interface Pet {
  id?: string;  // Adicionado campo id
  _id?: string; // Campo alternativo para compatibilidade com MongoDB
  name: string;
  age: string;
  sex: string;
  species: string;
  size?: string;
  breed?: string;
  characteristics: string;
  NGO: string;
  status: string;
  forTempHome: string;
  forAdoption: string;
  photos: string[];
  city: string;
  state: string;
  observations?: string;
}