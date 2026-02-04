import { redirect } from "react-router-dom";
import { AxiosError } from "axios";

// Interface Genérica do Backend
interface BackendResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
    limit: number;
  };
}

// Configuração do Loader
interface LoaderConfig<T> {
  // A função que busca os dados.
  // user: Passamos o usuário inteiro para você decidir se usa ngoId, role, ou nada (public)
  fetchData: (filters: any, user: any | null) => Promise<{ data: BackendResponse<T> }>;
  
  // Quais filtros a URL deve "escutar". Ex: ['specie', 'size'] para pets
  filterKeys?: string[];
  
  // Se true, redireciona/erro se não tiver user. Se false, permite acesso (ex: Pets)
  isPublic?: boolean; 
}

// --- LOADER FACTORY ---
export const createPaginatedLoader = <T>(config: LoaderConfig<T>) => 
  async ({ request }: { request: Request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const limit = Number(url.searchParams.get("limit")) || 6; // Ou leia da URL

    // 1. Monta Filtros
    const filters: any = { page, limit };
    (config.filterKeys || []).forEach(key => {
      const value = url.searchParams.get(key);
      if (value && value !== "Qualquer") filters[key] = value;
    });

    // 2. Auth Check
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;

    if (!config.isPublic && !user) {
      // Retorna erro ou redireciona para login
      return { items: [], user: null, meta: { total: 0 }, error: "Acesso negado" };
    }

    console.log("Loader Filters:", filters, "User:", user);

    try {
      // 3. Chama o Service (passando o user para lógica específica)
      const response = await config.fetchData(filters, user);
      
      const result = response.data;
      const rawItems = result.data || [];
      const meta = result.meta;

      console.log("Loader response: ", result);
      console.log("Loader fetched items:", rawItems);

      // Normaliza ID
      const items = rawItems.map((item: any) => ({
        ...item,
        _id: item._id || item.id, 
      }));

      // 4. Redirecionamentos de Segurança (Página vazia)
      if (page > 1 && page > meta.lastPage && meta.total > 0) {
        url.searchParams.set("page", String(meta.lastPage));
        return redirect(url.toString());
      }
      if (page > 1 && items.length === 0) {
        url.searchParams.set("page", String(page - 1));
        return redirect(url.toString());
      }

      return { items, user, meta };

    } catch (error) {
      console.error("Loader Error:", error);
      return { items: [], user, meta: { total: 0, page, limit }, error: "Erro ao carregar dados" };
    }
};

// --- ACTION FACTORY ---
interface ActionConfig {
  // Recebe o ID e executa a lógica
  deleteFn?: (id: string) => Promise<any>;
  approveFn?: (id: string) => Promise<any>; // Para validações
}

export const createCrudAction = (config: ActionConfig) => 
  async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const intent = formData.get("intent");
    
    // Tenta pegar o ID de qualquer nome comum de campo
    const id = (formData.get("id") || formData.get("memberId") || formData.get("ngoId") || formData.get("petId")) as string;

    try {
      // Fluxo de Aprovação
      if (intent === "aprovar" && config.approveFn) {
        await config.approveFn(id);
        return { success: true, type: "aprovar" };
      }

      // Fluxo de Deleção / Recusa
      if ((intent === "delete" || intent === "recusar") && config.deleteFn) {
        console.log(`Executando ação ${intent} para ID:`, id);
        await config.deleteFn(id);
        console.log(`Ação ${intent} executada com sucesso para ID:`, id);
        return { success: true, type: intent }; // Retorna o tipo para mostrar msg correta no toast
      }
    } catch (err) {
      const message = err instanceof AxiosError 
        ? err.response?.data?.message 
        : 'Erro na operação.';
      return { error: message };
    }
    return null;
};