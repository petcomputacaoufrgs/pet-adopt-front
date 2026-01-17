import { useEffect, useState, useTransition } from "react";
import { authService, getAuthError } from "../../services";

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
import PasswordInput from "../../components/PasswordInput";
import verifyPassword from "../SignUp";
import setConfirmPassword from "../SignUp";
import verifyConfirmPassword from "../SignUp";
import { useAuth } from "../../hooks/useAuth";
import { Navigate, useNavigate, useLocation} from "react-router-dom";
import { Weight } from "lucide-react";
import ActionText from "../../components/ActionText";
import { wait } from "@testing-library/user-event/dist/utils";

const ForgotPassword2: React.FC = () => {

  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const location = useLocation();

  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const [isWaiting, setIsWaiting] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const [codeError, setCodeError] = useState(false);
  const [codeErrorMessage, setCodeErrorMessage] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');

  // Verificar se há mensagem de erro de autenticação ao carregar
  useEffect(() => {
    const authError = getAuthError();
    if (authError) {
      setErrorMessage(authError);
    }
  }, []);

  const handleNavigation = (to: string, options?: { state?: any }) => {
    startTransition(() => {
      navigate(to, options);
    });
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    // e.preventDefault();

    // setErrorMessage("");
    // setSuccessMessage("");

    // try {
    //   await authService.forgotPassword(email, password);
    //   setSuccessMessage("Instruções para redefinir sua senha foram enviadas para o seu e-mail.");
    // } catch (error: any) {
    //   const errorMsg = error.response?.data?.message || "Ocorreu um erro ao tentar redefinir a senha.";
    //   setErrorMessage(errorMsg);
    // }
  };


 // CONTROLE DO COMPRIMENTO DA JANELA PARA RESPONSIVIDADE ============================================
  
  const [windowSize, setWindowSize] = useState(window.innerWidth);
    
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

  const verifyCode = (codeToVerify: string) => {
    // Exemplo simples: o código deve ter exatamente 6 caracteres
    if (codeToVerify.length !== 6) {
      setCodeError(true);
      setCodeErrorMessage("O código deve ter exatamente 6 caracteres.");
      return false;
    } else {
      setCodeError(false);
      setCodeErrorMessage("");
      return true;
    }
  }

  // Função para ser chamada quando o botão é clicado
  const handleSendCode = () => {

    //logica do BACKEND para reenvio do código
    console.log("Enviando código...");

    // Ativa o modo de espera
    setIsWaiting(true);
  };

  // useEffect para gerenciar o timer do contador
  useEffect(() => {
    // Só ativamos o intervalo se estivermos no modo de espera
    if (!isWaiting) {
      return;
    }

    // Se o contador chegar a zero, paramos de esperar
    if (countdown <= 0) {
      setIsWaiting(false);
      setCountdown(60); // Reseta o contador para a próxima vez
      return;
    }

    // Configura o intervalo para decrementar o contador a cada segundo
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    //Função de limpeza:
    // O React executa esta função quando o componente é desmontado
    // ou antes de o efeito rodar novamente. Isso previne memory leaks.
    return () => clearInterval(intervalId);

  }, [isWaiting, countdown]); // O efeito roda novamente se `isWaiting` or `countdown` mudar

  const { isLoading, user, isLoggedIn} = useAuth();

  if(isLoading)
    return null;

  if (location.state?.from !== '/forgotPassword1') {
    return <Navigate to="/forgotPassword1" replace />;
  }

  
 // ========================================================================================================
  return (
    <Container style={{ paddingRight: getScrollbarWidth() } }>
      <Header
        color="rgba(0, 0, 0, 0)"
        Logo={ForgotPasswordPageLogo}
        isLoggedIn={isLoggedIn}
        user={user}
      />

      <ForgotPasswordContainer>
      {windowSize >= 1200 &&
        <div style={{minHeight: "600px", maxWidth: "732.95px", backgroundImage: `url(${ForgotPasswordDog})`, width: "43%", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover"}}></div>
        } 

        <ForgotPasswordFormContainer>
          <ForgotPasswordForm onSubmit={handleForgotPassword}>
            <ForgotPasswordFormTextContainer>
              <h1>Esqueci a Senha</h1>
              <p>Você receberá um e-mail com um "código de redefinição". Digite este código aqui, e então digite sua nova senha.</p>
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
                title="Código de Redefinição"
                required = {false} 
                placeholder="XXX-XXX"
                value={code}
                $fontSize="1rem"
                $width="100%"
                error = {codeError}
                errorMessage={codeErrorMessage}
                onChange={(e) => {
                  setCode(e.target.value)
                  verifyCode(e.target.value);
                }}
              />
              
              <PasswordInput
                  title="Senha"
                  required={true}
                  isDisabled={false}
                  $fontSize="1rem" 
                  placeholder="Insira sua senha aqui"
                  $width="100%"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    verifyPassword(e.target.value);
                  } }
                  error={passwordError}
                  errorMessage={passwordErrorMessage} 
                  visible={false}
              />

              <PasswordInput
                  title="Confirmar Senha"
                  required={true}
                  isDisabled={false}
                  $fontSize="1rem" 
                  placeholder="Confirme sua senha aqui"
                  $width="100%"
                  value={confirmPassword}
                      onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    verifyConfirmPassword(e.target.value);
                  } }
                  error={confirmPasswordError}
                  errorMessage={confirmPasswordErrorMessage} 
                  visible={false}
              />
              
            </ForgotPasswordFormInputsContainer>
            
            <PrimarySecondaryButton width="100%" buttonType="Primário" content={isWaiting ? `Aguarde ${countdown}s para reenviar o código` : "Reenviar Código"} onClick={handleSendCode} isDisabled={isWaiting} paddingH="5px" paddingV="10px"/>

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
                  handleNavigation("/signUp")
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

export default ForgotPassword2;