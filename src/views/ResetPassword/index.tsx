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
import { useAuth } from "../../hooks/useAuth";
import { Navigate, useNavigate, useLocation, useSearchParams} from "react-router-dom";
import { Weight } from "lucide-react";
import ActionText from "../../components/ActionText";
import { wait } from "@testing-library/user-event/dist/utils";

const ResetPassword: React.FC = () => {

  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const token = searchParams.get("token");

  const [isWaiting, setIsWaiting] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');

  // CONTROLE DO COMPRIMENTO DA JANELA PARA RESPONSIVIDADE ============================================
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const { isLoading, user, isLoggedIn} = useAuth();

  // Verificar se há mensagem de erro de autenticação ao carregar
  useEffect(() => {
    const authError = getAuthError();
    if (authError) {
      setErrorMessage(authError);
    }
  }, []);
    
  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Functions
  const handleNavigation = (to: string, options?: { state?: any }) => {
    startTransition(() => {
      navigate(to, options);
    });
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
        setError('As senhas não coincidem');
        return;
    }

    if (!token) {
        setError('Token inválido ou ausente');
        return;
    }

    try {
        await authService.resetPassword(token, newPassword);
        
        setSuccess(true);
        setTimeout(() => navigate('/login'), 3000);
        
    } catch (err: any) {
        setError(err.response?.data?.message || 'Erro ao resetar senha');
    }
  };

  // Conditional returns (after all hooks)
  if(isLoading)
    return null;

  // Validar se token existe
  if (!token) {
    return <div>Token inválido ou ausente</div>;
  }

  if (success) {
    return <div>Senha atualizada! Redirecionando...</div>;
  }

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
          <ForgotPasswordForm onSubmit={handleResetPassword}>
            <ForgotPasswordFormTextContainer>
              <h1>Redefinir Senha</h1>
              <p>Digite sua nova senha.</p>
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
              
              <PasswordInput
                  title="Senha"
                  required={true}
                  isDisabled={false}
                  $fontSize="1rem" 
                  placeholder="Insira sua senha aqui"
                  $width="100%"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={confirmPasswordError}
                  errorMessage={confirmPasswordErrorMessage} 
                  visible={false}
              />
              
            </ForgotPasswordFormInputsContainer>
            
            <PrimarySecondaryButton width="100%" buttonType="Primário" content={"Redefinir Senha"} onClick={handleResetPassword} isDisabled={isWaiting} paddingH="5px" paddingV="10px"/>

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

export default ResetPassword;