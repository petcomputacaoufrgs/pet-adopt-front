export interface IAnimalFormSection {
  windowSize: number;
  name: string;
  age: string;
  breed: string;
  ong: string;
  city: string;
  state: string;
  specieIndex: number;
  animalSexIndex: number;
  sizeIndex: number;
  situationIndex: number;
  setName: (value: string) => void;
  setAge: (value: string) => void;
  setBreed: (value: string) => void;
  setCity: (value: string) => void;
  setState: (value: string) => void;
  setOng: (value: string) => void;
  setSpecieIndex: (value: number) => void;
  setAnimalSexIndex: (value: number) => void;
  setSizeIndex: (value: number) => void;
  setSituationIndex: (value: number) => void;
  setSpecie: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  images: (string | null)[];
  setImages: (value: (string | null)[]) => void;
  animalData?: any;
}

