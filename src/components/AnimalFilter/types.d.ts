export interface IAnimalFilter {
  selectedSpecie: number;
  setSelectedSpecie: (value: number) => void;
  selectedState: string;
  setSelectedState: (value: string) => void;
  selectedAge: string;
  setSelectedAge: (value: string) => void;
  selectedSize: string;
  setSelectedSize: (value: string) => void;
  selectedSituation: string;
  setSelectedSituation: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  name: string;
  setName: (value: string) => void;
  breed: string;
  setBreed: (value: string) => void;
  selectedSex: string;
  setSelectedSex: (value: string) => void;
  hasBorder?: boolean;
}