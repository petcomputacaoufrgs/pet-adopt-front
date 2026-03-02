// src/routes/actions.ts (ou no seu arquivo de rotas)

import { AxiosError } from "axios";
import { authService } from "../../services";

export const signUpAction = async ({ request }: { request: Request }) => {
  // Pega o payload enviado pelo fetcher.submit (que mandamos como application/json)
  const data = await request.json();

  try {
    // === 1. FLUXO DE MEMBRO ===
    if (data.intent === "signup_member") {
      await authService.signupNgoMember({
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        ngoId: data.ngoId // O ID que encontramos na lista do Loader
      });

      return { 
        success: true, 
        message: "Seu pedido foi enviado para a aprovação do administrador da ONG." 
      };
    }

    // === 2. FLUXO DE ONG ===
    if (data.intent === "signup_ngo") {
      await authService.signupNgo({
        // Dados da conta do Administrador da ONG
        user: { 
          name: data.name, 
          email: data.email, 
          password: data.password, 
          confirmPassword: data.confirmPassword 
        },
        // Dados do Perfil da ONG
        ngo: {
          name: data.name, 
          email: data.email, 
          doc: data.doc, 
          description: data.description, 
          phone: data.phone, 
          city: data.city, 
          state: data.state, 
          website: data.website,
          instagram: data.instagram, 
          facebook: data.facebook, 
          adoptionForm: data.adoptionForm, 
          sponsorshipForm: data.sponsorshipForm,
          temporaryHomeForm: data.temporaryHomeForm, 
          claimForm: data.claimForm,
        }
      });

      return { 
        success: true, 
        message: "O cadastro da sua ONG foi enviado para análise da nossa equipe." 
      };
    }

    return { error: "Ação inválida." };

  } catch (err) {
    console.error("Erro na action de SignUp:", err);
    
    // Tratamento de erro elegante para o NestJS
    if (err instanceof AxiosError && err.response) {
      const backendMessage = err.response.data?.message;
      
      // Se o NestJS mandar um array de erros (ex: falhou em várias validações)
      if (Array.isArray(backendMessage)) {
        return { error: backendMessage.join(" | ") };
      }
      
      // Se mandar uma string simples
      return { error: backendMessage || "Erro no cadastro. Verifique os dados." };
    }

    return { error: "Erro de conexão. Tente novamente mais tarde." };
  }
};