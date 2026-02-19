import { petService, ngoService } from "../../services";
import type { Animal } from "./types";
import { redirect } from "react-router-dom";

// Interface do retorno
interface AnimalLoaderData {
  animalData?: Animal;
  user: any;
}

export const editAnimalLoader = async ({ params }: { params: any }): Promise<AnimalLoaderData | Response> => {
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

    // VALIDAÇÃO LOCAL: Verifica se o pet pertence à ONG do usuário.
    if (user.role !== "ADMIN" && pet.ngoId !== user.ngoId) {
      localStorage.setItem('authorizationError', 
        'Você não tem permissão para editar este pet. Ele pertence a outra ONG.');
      return redirect('/manageAnimals');
    }

    // Busca a ONG
    const ngoResponse = await ngoService.getById(pet.ngoId);

    console.log(ngoResponse.data);
    const ngo = ngoResponse.data;

    // Monta o objeto final
    const animalData = {
      ...pet,
      ngoStrId: `${ngo.name} - ${ngo.email}`
    };

    return { 
      animalData, 
      user, 
    };

  } catch (error: any) {
    console.error("Erro no loader:", error);
    
    // Tratamento específico para erro 403 (Forbidden) - Sem permissão
    if (error.response?.status === 403) {
      localStorage.setItem('authorizationError', 
        error.response?.data?.message || 'Você não tem permissão para editar este pet.');
      return redirect('/manageAnimals');
    }
    
    // Tratamento específico para erro 404 (Not Found)
    if (error.response?.status === 404) {
      localStorage.setItem('authorizationError', 'Pet não encontrado.');
      return redirect('/manageAnimals');
    }
    
    throw new Error("Falha ao carregar dados do animal.");
  }
};