import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import type { Animal } from '../views/EditAnimal/types';

export interface AnimalFormSchema {
  name: string;
  age: string;
  breed: string;
  city: string;
  state: string;
  ngoStrId: string;
  characteristics: string;
  specieIndex: number; 
  animalSexIndex: number;
  sizeIndex: number;
  situationIndex: number;
  images: (File | string | null)[];
  specieOther: string; 
}

export const useAnimalForm = (animalData?: Animal) => {

  // Definimos os valores vazios padrão
  const emptyDefaults: AnimalFormSchema = {
    name: "",
    age: "",
    breed: "",
    city: "",
    state: "",
    ngoStrId: "",
    characteristics: "",
    specieIndex: -1,
    animalSexIndex: -1,
    sizeIndex: -1,
    situationIndex: -1,
    images: Array(10).fill(null),
    specieOther: ""
  };

  // Calculamos os valores iniciais (usando useMemo para performance)
  // Se animalData existir, fazemos o map agora. Se não, usamos o emptyDefaults
  const defaultValues = useMemo(() => {
    if (!animalData) return emptyDefaults;

    // Mapas auxiliares
    const speciesMap: Record<string, number> = { "dog": 0, "cat": 1, "other": 2 };
    const sexMap: Record<string, number> = { "M": 0, "F": 1 };
    const sizeMap: Record<string, number> = { "P": 0, "M": 1, "G": 2 };
    const statusMap: Record<string, number> = { 
      "Available": 0, "TempHome": 1, "Temporary home": 1, "Adopted": 2 
    };


    const loadedImages = animalData.photos 
      ? [...animalData.photos, ...Array(10 - animalData.photos.length).fill(null)]
      : Array(10).fill(null);

    return {
      name: animalData.name || "",
      age: animalData.age || "",
      breed: animalData.breed || "",
      city: animalData.city || "",
      state: animalData.state || "",
      ngoStrId: animalData.ngoStrId || "",
      characteristics: animalData.characteristics || "",
      
      specieIndex: speciesMap[animalData.species] ?? -1,
      animalSexIndex: sexMap[animalData.sex] ?? -1,
      sizeIndex: sizeMap[animalData.size] ?? -1,
      situationIndex: statusMap[animalData.status] ?? -1,
      
      specieOther: animalData.species === "other" ? animalData.otherSpecies : "",
      images: loadedImages
    };
  }, [animalData]);

  // Passamos os valores JÁ calculados para o useForm
  const methods = useForm<AnimalFormSchema>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: defaultValues
  });

  const { reset } = methods;

  // Mantemos o useEffect apenas para casos onde animalData mude DEPOIS da montagem
  // (Ex: refetch de dados). Mas na primeira renderização, o defaultValues já resolveu
  useEffect(() => {
    if (animalData) {
        reset(defaultValues);
    }
  }, [defaultValues, reset, animalData]);

  return { methods };
};