import { json, redirect } from "react-router-dom";
import { petService } from "../../services";
import { AxiosError } from "axios";

export const petsLoader = async ({ request }: { request: Request }) => {
    const url = new URL(request.url);
    const pageParam = url.searchParams.get("page");
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    
    const filters: any = Object.fromEntries(url.searchParams);

    delete filters.page;
    delete filters.limit;

    const response = await petService.getPage(page, filters);
    return response.data;

};


export const petsAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const intent = formData.get('intent'); // Útil se tiver mais de uma ação na tela
  const petId = formData.get('petId') as string;

  if (intent === 'delete') {

    console.log("Deletando pet com ID:", petId);
    try {
      await petService.delete(petId);
      
      // Retornamos null ou um json de sucesso. 
      // O React Router entende isso e dispara o loader automaticamente.
      return { success: true };
    } catch (err) {
      // Retornamos o erro para ser acessado via useActionData ou fetcher.data
      const message = err instanceof AxiosError 
        ? err.response?.data?.message 
        : 'Erro ao deletar pet.';
      return { error: message };
    }
  }
  
  return null;
};