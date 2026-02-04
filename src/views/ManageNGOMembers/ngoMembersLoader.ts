import { json, redirect } from "react-router-dom";
import { userService } from "../../services";
import { AxiosError } from "axios";

export const membersLoader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  
  // Recuperar Filtros da URL
  const page = Number(url.searchParams.get("page")) || 1;
  const limit = Number(url.searchParams.get("limit")) || 6; // Default seguro
  const nameFilter = url.searchParams.get("name");

  // Recuperar Usuário (Lógica de autenticação)
  const userStr = localStorage.getItem('user');
  if(!userStr) return { members: [], user: null, totalItems: 0, error: "Usuário não autenticado" };
  
  const user = JSON.parse(userStr);
  const ngoId = user.ngoId;

  if (!ngoId) {
     return { members: [], user, totalItems: 0, error: "Usuário não associado a uma ONG" };
  }

  // Montar objeto de filtro para o Service
  const filters = {
    page,
    limit,
    name: nameFilter || undefined
  };

  try {

      const response = await userService.getApprovedMembersPage(ngoId, filters);
      const rawMembers = response.data.data || []; 
      const meta = response.data.meta || {};


      const members = rawMembers.map((member: any) => ({
        ...member,
        id: member._id || member.id,
      }));

      // Lógica de "Voltar página se deletou o último item"
      // Se a página pedida é maior que a última página disponível E não é a página 1
      if (page > 1 && page > meta.lastPage && meta.total > 0) {
        url.searchParams.set("page", String(meta.lastPage));
        return redirect(url.toString());
      }
      
      // Se pedimos página X, mas veio vazio (ex: filtro restritivo na pág 2), volta pra 1
      if (page > 1 && members.length === 0) {
         url.searchParams.set("page", String(page - 1));
         return redirect(url.toString());
      }

      return { members, user, meta };
      
  } catch (error) {
      console.error(error);
      return { members: [], user, meta: { total: 0, lastPage: 0, page: 1, limit: 6 }, error: "Falha ao carregar membros" };
  }
};

export const membersAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const memberId = formData.get("memberId") as string;

  if (intent === "delete") {
    try {
      await userService.delete(memberId);
      return { success: true };
    } catch (err) {
       const message = err instanceof AxiosError 
        ? err.response?.data?.message 
        : 'Erro ao deletar membro.';
      return { error: message };
    }
  }
  return null;
};