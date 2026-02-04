import { redirect } from "react-router-dom";
import { ngoService } from "../../services"; // Certifique-se que o getApprovedPage existe aqui
import { AxiosError } from "axios";

// Interface para tipar a resposta do backend
interface BackendResponse {
  data: any[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
    limit: number;
  }
}

export const ngosLoader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);


  // Extrair Paginação e Filtros da URL
  const page = Number(url.searchParams.get("page")) || 1;
  const limit = Number(url.searchParams.get("limit")) || 6;
  
  const name = url.searchParams.get("name");
  const city = url.searchParams.get("city");
  const state = url.searchParams.get("state");

  // Verificação de Autenticação (Padrão do membersLoader)
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  // Montar objeto de filtros
  const filters: any = {
    page,
    limit,
    name: name || undefined,
    city: city || undefined,
    state: (state && state !== "Qualquer") ? state : undefined
  };

  console.log("Onde ele está errando??");
  try {
    
    const response = await ngoService.getApprovedPage(filters);

    const result = response.data as BackendResponse;
    const rawNgos = result.data || [];
    const meta = result.meta;

    // Normalização dos IDs (_id -> id)
    const ngos = rawNgos.map((ngo: any) => ({
      ...ngo,
      _id: ngo._id || ngo.id, // O componente usa _id
    }));

    // Lógica de Redirecionamento de Página 
  
    // Cenário 1: Usuário pede página 5, mas só existem 4 páginas (filtrou muito)
    if (page > 1 && page > meta.lastPage && meta.total > 0) {
      url.searchParams.set("page", String(meta.lastPage));
      return redirect(url.toString());
    }

    // Cenário 2: Usuário estava na página 2, deletou o último item, lista ficou vazia
    if (page > 1 && ngos.length === 0) {
      url.searchParams.set("page", String(page - 1));
      return redirect(url.toString());
    }

    return { ngos, user, meta };

  } catch (error) {
    console.error("Erro ao carregar ONGs:", error);
    return { 
      ngos: [], 
      user, 
      meta: { total: 0, limit, page: 1, lastPage: 1 }, 
      error: "Falha ao carregar lista de ONGs" 
    };
  }
};

export const ngosAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const ngoId = formData.get("ngoId") as string;

  if (intent === "delete") {
    try {
      await ngoService.delete(ngoId);
      return { success: true };
    } catch (err) {
      const message = err instanceof AxiosError 
        ? err.response?.data?.message 
        : 'Erro ao deletar ONG.';
      return { error: message };
    }
  }
  
  return null;
};