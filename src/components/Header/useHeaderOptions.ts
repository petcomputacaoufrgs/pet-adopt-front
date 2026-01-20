import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { User } from "../../types/user";
import { Role } from "./types";
import { get } from "http";
import { useTransition } from "react";



export const useHeaderOptions = () => {
  const { user, isLoggedIn, logout } = useAuth();

  const navigate = useNavigate();

  const [isPending, startTransition] = useTransition();
  const navigateWaitingForPendencies = (to: string, options?: {state: any}) => {
    startTransition(() => {
      navigate(to, options);
    });
  };
  
  const location = useLocation();
  
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

  const handleNavigation = (path: string) => {
    if (path.startsWith("#")) {
      // já está na home
      if (location.pathname === "/") {
        const id = path.substring(1);
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: "smooth" });
      } else {
        // navega para home carregando state

        navigateWaitingForPendencies("/", { state: { scrollTo: path.substring(1) } });
      }
    } else {
      navigateWaitingForPendencies(path);
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
        "Validar Membros": () => handleNavigation("/approveNgoMembers"),
        "Ver ONGs": () => handleNavigation("/listNGOs"),
        "Gerenciar Membros": () => handleNavigation("/manageNgoMembers"),
        "Gerenciar Conta": () => (user?.role==="NGO_ADMIN")? handleNavigation(`/NGOProfile/${user.ngoId}`):user ? handleNavigation(`/manageInfo/`) : handleNavigation("/"),
        "Gerenciar Animais": () => handleNavigation("/manageAnimals"),
        "Cadastrar Pet": () => handleNavigation("/createAnimal"),
        "Home": () => handleNavigation("/"),
        "Sair": () => logout(),

        "Ver Animais": () => handleNavigation("/searchAnimals"),
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