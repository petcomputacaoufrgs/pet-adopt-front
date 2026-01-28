import { useEffect, useState, useTransition } from "react";
import { authService, getAuthError } from "../../services";
import { getErrorMessage } from "../../services/helpers/errorHandlers";

import {
  Container,
  ForgotPasswordContainer,
  ForgotPasswordFormContainer,
  ForgotPasswordForm,
  ForgotPasswordFormTextContainer,
  ForgotPasswordFormInputsContainer,
  ForgotPasswordFormLinksContainer,
  TextContainer,
} from "./styles"; 

import Header from "../../components/Header"; 
import PrimarySecondaryButton from "../../components/PrimarySecondaryButton";

import ForgotPasswordPageLogo from "../../assets/HorizontalLogo.png";
import ForgotPasswordDog from "../../assets/LoginDog.png";
import BasicInput from "../../components/BasicInput";
import PasswordInputField from "../../components/PasswordInput";
import { useAuth } from "../../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import { Weight } from "lucide-react";
import ActionText from "../../components/ActionText";

const ForgotPassword1: React.FC = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Verificar se há mensagem de erro de autenticação ao carregar
  useEffect(() => {
    const authError = getAuthError();
    if (authError) {
      setErrorMessage(authError);
    }
  }, []);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    try {
      await authService.requestPasswordReset(email);
      setSuccessMessage("Instruções para redefinir sua senha foram enviadas para o seu e-mail.");
    } catch (error: any) {
      setErrorMessage(getErrorMessage(error, "Ocorreu um erro ao tentar redefinir a senha."));
    }
  };


// CONTROLE DO COMPRIMENTO DA JANELA PARA RESPONSIVIDADE ============================================
  
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const handleNavigation = (to: string, options?: { state?: any }) => {
    startTransition(() => {
      navigate(to, options);
    });
  };
    
  useEffect(() => {
        const handleResize = () => {
          setWindowSize(window.innerWidth);
        }
    
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
  }, []);

// PADDING PARA EVITAR SALTO DE COM SCROLL BAR E SEM SCROLL BAR ============================================

  function getScrollbarWidth() {
    // Cria um div externo invisível
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // Força o scroll
    document.body.appendChild(outer);

    // Cria um div interno
    const inner = document.createElement('div');
    outer.appendChild(inner);

    // Calcula a diferença
    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

    // Remove os divs da página
    if (outer.parentNode) {
      outer.parentNode.removeChild(outer);
    }

    return scrollbarWidth;
  }


    const { isLoading, user, isLoggedIn} = useAuth();

  if(isLoading)
    return null;
  
// ========================================================================================================
  return (
    <Container style={{ paddingRight: getScrollbarWidth() } }>

      <ForgotPasswordContainer>
      {windowSize >= 1200 &&
        <div style={{minHeight: "600px", maxWidth: "732.95px", backgroundImage: `url(${ForgotPasswordDog})`, width: "43%", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover"}}></div>
        } 

        <ForgotPasswordFormContainer>
          <ForgotPasswordForm onSubmit={handleForgotPassword}>
            <ForgotPasswordFormTextContainer>
              <h1>Esqueci a Senha</h1>
              <p>Insira o email usado para criar sua conta. Nós enviaremos um "código de redefinição" para poder definir uma nova senha.</p>
            </ForgotPasswordFormTextContainer>

            {errorMessage && (
              <div style={{ 
                color: "red", 
                margin: "10px 0", 
                padding: "10px",
                backgroundColor: "#ffeaea",
                border: "1px solid #ffcdd2",
                borderRadius: "4px"
              }}>
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div style={{ 
                color: "green", 
                margin: "10px 0",
                padding: "10px",
                backgroundColor: "#f1f8e9",
                border: "1px solid #c8e6c9",
                borderRadius: "4px"
              }}>
                {successMessage}
              </div>
            )}

            <ForgotPasswordFormInputsContainer>
              
              <BasicInput
                title="E-mail"
                required = {false} 
                placeholder="Insira seu email aqui"
                value={email}
                $fontSize="1rem"
                $width="100%"
                onChange={(e) => setEmail(e.target.value)}
              />
              
            </ForgotPasswordFormInputsContainer>
            
            <PrimarySecondaryButton width="100%" buttonType="Primário" content="Próximo" onClick={handleForgotPassword} paddingH="5px" paddingV="10px"/>

            <ForgotPasswordFormLinksContainer>

              <ActionText
                key={"loginActionText"}
                width="100%"
                fontSize="1rem"
                textColor="#553525"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation("/login")
                }}
              >
              <h3>Fazer Login</h3>
    
              </ActionText>

              <TextContainer>
                <div />
                <span>Ou</span>
                <div />
              </TextContainer>

              <ActionText
                key={"signUpActionText"}
                width="100%"
                fontSize="1rem"
                textColor="#553525"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation("/signup")
                }}
              >
              <h3>Criar Conta</h3>
    
              </ActionText>
            </ForgotPasswordFormLinksContainer>
          </ForgotPasswordForm>
        </ForgotPasswordFormContainer>
      </ForgotPasswordContainer>
    </Container>
                
  );
};

export default ForgotPassword1;