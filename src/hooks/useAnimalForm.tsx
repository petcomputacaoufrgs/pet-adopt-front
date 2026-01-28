import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Animal } from '../views/EditAnimal/types';

export interface AnimalFormSchema {
  name: string;
  age: string;
  breed: string;
  city: string;
  state: string;
  ngoStrId: string; // "Nome - Email", é a chave única para identificar uma ONG
  characteristics: string;
  
  // Índices dos Radio Buttons
  specieIndex: number; 
  animalSexIndex: number;
  sizeIndex: number;
  situationIndex: number;
  
  // Campo de imagens controlado pelo React Hook Form
  images: (File | string | null)[];
  

  specieOther: string; 
}

export const useAnimalForm = (animalData?: Animal) => {

  const methods = useForm<AnimalFormSchema>({
    mode: 'onSubmit', // Valida inicialmente só ao submeter
    reValidateMode: 'onSubmit', // Revalida só ao submeter
    defaultValues: {
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
    }
  });

  const { reset } = methods;

  // Mapeamento de dados (Vindo da Edição)
  useEffect(() => {
    if (animalData) {
      // Mapas auxiliares
      const speciesMap: Record<string, number> = { "dog": 0, "cat": 1, "other": 2 };
      const sexMap: Record<string, number> = { "M": 0, "F": 1 };
      const sizeMap: Record<string, number> = { "P": 0, "M": 1, "G": 2 };
      const statusMap: Record<string, number> = { 
        "Available": 0, "TempHome": 1, "Temporary home": 1, "Adopted": 2 
      };

      // Preparar imagens
      const loadedImages = animalData.photos 
        ? [...animalData.photos, ...Array(10 - animalData.photos.length).fill(null)]
        : Array(10).fill(null);

      // Resetar o formulário com os dados carregados
      reset({
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
      });
    }
  }, [animalData, reset]);

  return { methods };
};