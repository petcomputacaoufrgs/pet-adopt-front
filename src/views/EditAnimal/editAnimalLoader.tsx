import { petService, ngoService } from "../../services";
import { Animal } from "./types";
import { redirect } from "react-router-dom";

// Interface do retorno
interface AnimalLoaderData {
  animalData?: Animal;
  user: any;
}

export const editAnimalLoader = async ({ params }: { params: any }): Promise<AnimalLoaderData> => {
  const { id } = params;
  
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  if (!user) {
      throw new Error("Você precisa estar logado.");
  }

  // MODO CRIAÇÃO
  if (!id) {
    return { 
      animalData: undefined, 
      user, 
    };
  }

  // MODO EDIÇÃO
  try {
    // Busca o Pet
    const petResponse = await petService.getById(id);
    const pet = petResponse.data;

    // Busca a ONG
    const ngoResponse = await ngoService.getById(pet.ngoId);
    const ngo = ngoResponse.data;

    // Validação de Permissão
    // Admin pode tudo, ou o usuário deve ser o dono da ONG do pet
    if (user.role !== "ADMIN" && user.ngoId !== pet.ngoId) {
      throw new Error("Acesso negado. Você não tem permissão para editar este animal.");
    }

    // Monta o objeto final
    const animalData = {
      ...pet,
      ngoStrId: `${ngo.name} - ${ngo.email}`
    };

    return { 
      animalData, 
      user, 
    };

  } catch (error) {
    console.error("Erro no loader:", error);
    throw new Error("Falha ao carregar dados do animal.");
  }
};