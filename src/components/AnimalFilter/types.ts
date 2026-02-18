export interface IAnimalFilter {
  selectedSpecie: number;
  setSelectedSpecie: (specie: number) => void;
  selectedState: string;
  setSelectedState: (state: string) => void;
  selectedAge: string;
  setSelectedAge: (age: string) => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  selectedSituation: string;
  setSelectedSituation: (situation: string) => void;
  city: string;
  setCity: (city: string) => void;
  name: string;
  setName: (name: string) => void;
  breed: string;
  setBreed: (breed: string) => void;
  selectedSex: string;
  setSelectedSex: (sex: string) => void;
  hasBorder?: boolean;
  onSearch?: () => void;
  onClearFilters?: () => void;
}


export interface FilterFormSchema {
  specie: string; // ou 'dog' | 'cat' | 'other'
  name: string;
  size: string;
  city: string;
  state: string;
  breed: string;
  sex: string;
  age: string;
  situation: string;
}