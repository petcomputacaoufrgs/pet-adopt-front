import { useState, useEffect } from 'react';
import { Animal } from '../views/EditAnimal/types';

interface AnimalFormState {
  images: (File | string | null)[];
  name: string;
  age: string;
  breed: string;
  sizeIndex: number;
  situationIndex: number;
  animalSexIndex: number;
  characteristics: string;
  city: string;
  state: string;
  specie: string;
  specieIndex: number;
  ong: string;
  windowSize: number;
}

interface UseAnimalFormReturn extends AnimalFormState {
  setImages: (value: (File | string | null)[]) => void;
  setName: (value: string) => void;
  setAge: (value: string) => void;
  setBreed: (value: string) => void;
  setSizeIndex: (value: number) => void;
  setSituationIndex: (value: number) => void;
  setAnimalSexIndex: (value: number) => void;
  setCharacteristics: (value: string) => void;
  setCity: (value: string) => void;
  setState: (value: string) => void;
  setSpecie: (value: string) => void;
  setSpecieIndex: (value: number) => void;
  setOng: (value: string) => void;
  resetForm: () => void;
}

// Função de mapeamento
const mapAnimalDataToFormState = (animalData: Animal) => {
  const formState = {
    name: animalData.name || "",
    age: animalData.age || "",
    breed: animalData.breed || "",
    city: animalData.city || "",
    state: animalData.state || "",
    ong: animalData.NGO || "",
    characteristics: animalData.characteristics || "",
    specieIndex: -1,
    animalSexIndex: -1,
    sizeIndex: -1,
    situationIndex: -1,
    specie: "",
  };

  // Mapear espécie
  const speciesMap: Record<string, number> = {
    "DOG": 0,
    "CAT": 1,
    "OTHER": 2
  };
  formState.specieIndex = speciesMap[animalData.species] ?? -1;
  
  if (animalData.species === "OTHER") {
    formState.specie = animalData.otherSpecies || "";
  }

  // Mapear sexo
  const sexMap: Record<string, number> = {
    "M": 0,
    "F": 1
  };
  formState.animalSexIndex = sexMap[animalData.sex] ?? -1;

  // Mapear porte (apenas para cachorros)
  if (animalData.species === "DOG" && animalData.size) {
    const sizeMap: Record<string, number> = {
      "P": 0,
      "M": 1,
      "G": 2
    };
    formState.sizeIndex = sizeMap[animalData.size] ?? -1;
  }

  // Mapear situação
  const statusMap: Record<string, number> = {
    "Available": 0,
    "TempHome": 1,
    "Temporary home": 1,
    "Adopted": 2
  };
  formState.situationIndex = statusMap[animalData.status] ?? -1;

  return formState;
};

export const useAnimalForm = (animalData?: Animal): UseAnimalFormReturn => {
  // Estados do formulário
  const [images, setImages] = useState<(File | string | null)[]>(Array(10).fill(null));
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [sizeIndex, setSizeIndex] = useState(-1);
  const [situationIndex, setSituationIndex] = useState(-1);
  const [animalSexIndex, setAnimalSexIndex] = useState(-1);
  const [characteristics, setCharacteristics] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [specie, setSpecie] = useState("");
  const [specieIndex, setSpecieIndex] = useState(-1);
  const [ong, setOng] = useState("");
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  // Função para resetar o formulário
  const resetForm = () => {
    setImages(Array(10).fill(null));
    setName("");
    setAge("");
    setBreed("");
    setSizeIndex(-1);
    setSituationIndex(-1);
    setAnimalSexIndex(-1);
    setCharacteristics("");
    setCity("");
    setState("");
    setSpecie("");
    setSpecieIndex(-1);
    setOng("");
  };

  // Efeito para atualizar windowSize
  useEffect(() => {
    const handleResize = () => setWindowSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Efeito para carregar dados do animal quando disponível
  useEffect(() => {
    if (animalData) {
      const formState = mapAnimalDataToFormState(animalData);
      
      setName(formState.name);
      setAge(formState.age);
      setBreed(formState.breed);
      setCity(formState.city);
      setState(formState.state);
      setOng(formState.ong);
      setCharacteristics(formState.characteristics);
      setSpecieIndex(formState.specieIndex);
      setAnimalSexIndex(formState.animalSexIndex);
      setSizeIndex(formState.sizeIndex);
      setSituationIndex(formState.situationIndex);
      setSpecie(formState.specie);

      if (animalData.photos) {
        const existingPhotos = animalData.photos.slice(0, 10);
        setImages([
          ...existingPhotos,
          ...Array(10 - existingPhotos.length).fill(null)
        ]);
      }
    }
  }, [animalData]);

  return {
    images,
    setImages,
    name,
    setName,
    age,
    setAge,
    breed,
    setBreed,
    sizeIndex,
    setSizeIndex,
    situationIndex,
    setSituationIndex,
    animalSexIndex,
    setAnimalSexIndex,
    characteristics,
    setCharacteristics,
    city,
    setCity,
    state,
    setState,
    specie,
    setSpecie,
    specieIndex,
    setSpecieIndex,
    ong,
    setOng,
    windowSize,
    resetForm
  };
};