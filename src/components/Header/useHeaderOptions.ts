import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { User } from "../../types/user";
import type { Role } from "./types";

export const useHeaderOptions = (user?: User | null) => {

  const { logout } = useAuth();
  const navigate = useNavigate();

  // Definição das opções por cargo (mantive igual)
  const optionsByRole: Record<Role, { accountOptions: string[]; navigationOptions: string[] }> = {
    ADMIN: {
      accountOptions: ["Gerenciar Conta", "Sair"],
      navigationOptions: ["Ver Animais", "Ver ONGs", "Gerenciar Animais", "Cadastrar Pet", "Validar ONGs"],
    },
    NGO_MEMBER: {
      accountOptions: ["Gerenciar Conta", "Sair"],
      navigationOptions: ["Ver Animais", "Ver ONGs", "Gerenciar Animais", "Cadastrar Pet"],
    },
    NGO_ADMIN: {
      accountOptions: ["Gerenciar Conta", "Sair"],
      navigationOptions: ["Ver Animais", "Ver ONGs", "Gerenciar Animais", "Cadastrar Pet", "Gerenciar Membros", "Validar Membros"],
    },
    NGO_ADMIN_PENDING: {
      accountOptions: ["Sair"],
      navigationOptions: ["Sobre Nós", "Ver Animais", "Ver ONGs", "Dicas", "Fale Conosco"],
    },
    REGULAR: {
      accountOptions: ["Fazer Login", "Cadastrar ONG ou Membro"],
      navigationOptions: ["Ver Animais", "Ver ONGs", "Dicas", "Fale Conosco"],
    }
  };

  const getOptionsOfUser = (isLoggedIn: boolean, user?: User | null) => {
    if (!isLoggedIn) return optionsByRole.REGULAR;
    if (!user) return optionsByRole.REGULAR;
    return optionsByRole[user!.role as Role] || optionsByRole.REGULAR;
  };

  // Mapeamento das Ações
  // ATENÇÃO: Os links com # agora começam com / (ex: /#about)
  // e os nomes dos IDs devem bater com o que definimos no HomeView
  const actions: Record<string, () => void> = {
    // Rotas Normais
    "Cadastrar ONG ou Membro": () => navigate("/signup"),
    "Fazer Login": () => navigate("/login"),
    "Gerenciar Pets" : () => navigate("/searchAnimals"),
    "Validar ONGs": () => navigate("/approveNgo"),
    "Validar Membros": () => navigate("/approveNgoMembers"),
    "Ver ONGs": () => navigate("/listNGOs"),
    "Gerenciar Membros": () => navigate("/manageNgoMembers"),
    "Gerenciar Conta": () => (user?.role === "NGO_ADMIN") ? navigate(`/NGOProfile/${user.ngoId}`) : user ? navigate(`/manageInfo/`) : navigate("/"),
    "Gerenciar Animais": () => navigate("/manageAnimals"),
    "Cadastrar Pet": () => navigate("/createAnimal"),
    "Home": () => navigate("/"),
    "Sair": () => logout(),
    "Ver Animais": () => navigate("/searchAnimals"),

    // Rotas de Seção (Hash Navigation)
    // Certifique-se que esses IDs existem no seu HomeView (ex: id="about")
    "Sobre Nós": () => navigate("/"),
    "Animais Recém Adicionados": () => navigate("/#list-animals"),
    "Dicas": () => navigate("/#dicas"),
    "Fale Conosco": () => navigate("/#contact")
  };

  const userHeaderOptions = getOptionsOfUser(!!user, user);

  const handleUserAction = (selected: string) => {
    return actions[selected] ? actions[selected]() : null;
  }

  return {
    accountOptions: userHeaderOptions.accountOptions,
    navigationOptions: userHeaderOptions.navigationOptions,
    handleAction: handleUserAction
  }
};