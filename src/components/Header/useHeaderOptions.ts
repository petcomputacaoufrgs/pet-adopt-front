import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { User } from "../../types/user";
import { Role } from "./types";
import { get } from "http";



export const useHeaderOptions = () => {
  const { user, isLoggedIn, logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  
  const optionsByRole: Record<Role, { accountOptions: string[]; navigationOptions: string[] }> = {

  ADMIN: {
    accountOptions: ["Gerenciar Conta", "Sair"],
    navigationOptions: ["Gerenciar Animais", "Cadastrar Pet", "Gerenciar ONGs", "Validar ONGs"],
  },
  NGO_MEMBER: {
    accountOptions: ["Gerenciar Conta", "Sair"],
    navigationOptions: ["Gerenciar Animais", "Cadastrar Pet"],
  },
  NGO_ADMIN: {
    accountOptions: ["Gerenciar Conta", "Sair"],
    navigationOptions: ["Gerenciar Animais", "Cadastrar Pet", "Gerenciar ONGs", "Gerenciar Membros de ONG"],
  },
  REGULAR: {
    accountOptions: ["Fazer Login", "Cadastrar ONG ou Membro"],
    navigationOptions: ["Sobre Nós", "Animais Recém Adicionados", "Dicas", "Fale Conosco"],
  }
};

  const handleNavigation = (path: string) => {
    if (path.startsWith("#")) {
      // já está na home
      if (location.pathname === "/") {
        const id = path.substring(1);
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: "smooth" });
      } else {
        // navega para home carregando state
        navigate("/", { state: { scrollTo: path.substring(1) } });
      }
    } else {
      navigate(path);
    }
  };


    const getOptionsOfUser = (isLoggedIn: boolean, user?: User) => {
    if (!isLoggedIn) return optionsByRole.REGULAR;
    return optionsByRole[user!.role as Role] || optionsByRole.REGULAR;
    };


    const actions: Record<string, () => void> = {
        "Cadastrar ONG ou Membro": () => handleNavigation("/signup"),
        "Fazer Login": () => handleNavigation("/login"),
        "Gerenciar Pets" : () => handleNavigation("/searchAnimals"),
        "Validar ONGs": () => handleNavigation("/approveNgo"),
        "Gerenciar ONGs": () => handleNavigation("/manageNgo"),
        "Gerenciar Membros de ONG": () => handleNavigation("/manageNgoMembers"),
        "Gerenciar Conta": () => handleNavigation("/manageInfo"),
        "Gerenciar Animais": () => handleNavigation("/manageAnimals"),
        "Cadastrar Pet": () => handleNavigation("/createAnimal"),
        "Sair": () => logout(),

        "Sobre Nós": () => handleNavigation("#about"),
        "Animais Recém Adicionados": () => handleNavigation("#listAnimals"),
        "Dicas": () => handleNavigation("#hints"),
        "Fale Conosco": () => handleNavigation("#contact")
    };

    const userHeaderOptions = getOptionsOfUser(isLoggedIn, user as User);

    const handleUserAction = (selected: string) => {
        return actions[selected] ? actions[selected]() : null;
    }

    return {
        accountOptions: userHeaderOptions.accountOptions,
        navigationOptions: userHeaderOptions.navigationOptions,
        handleAction: handleUserAction
    }




};