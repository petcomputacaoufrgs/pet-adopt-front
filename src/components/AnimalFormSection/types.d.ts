export interface IAnimalFormSection {
  // Todos os estados e setters do formulário
  images: (File | string | null)[];
  setImages: (value: (File | string | null)[]) => void;
  name: string;
  setName: (value: string) => void;
  age: string;
  setAge: (value: string) => void;
  breed: string;
  setBreed: (value: string) => void;
  sizeIndex: number;
  setSizeIndex: (value: number) => void;
  situationIndex: number;
  setSituationIndex: (value: number) => void;
  animalSexIndex: number;
  setAnimalSexIndex: (value: number) => void;
  characteristics: string;
  setCharacteristics: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  state: string;
  setState: (value: string) => void;
  specie: string;
  setSpecie: (value: string) => void;
  specieIndex: number;
  setSpecieIndex: (value: number) => void;
  ngoId: string;
  setNgoId: (value: string) => void;
  windowSize: number;
  animalData?: any;
}

// Interface para o ImageSlotsGroup
export interface ImageSlot {
  id: string;
  file?: File; // Novo arquivo selecionado
  url?: string; // URL de imagem existente no servidor
  preview: string; // URL para exibição (base64 para novos, URL para existentes)
}
