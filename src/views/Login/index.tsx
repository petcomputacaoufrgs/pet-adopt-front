import { useEffect, useState } from "react";
import { authService, getAuthError } from "../../services";
import { getErrorMessage } from "../../services/helpers/errorHandlers";

import {
  Container,
  LoginContainer,
  LoginFormContainer,
  LoginForm,
  LoginFormTextContainer,
  LoginFormInputsContainer,
  LoginFormLinksContainer,
  TextContainer,
} from "./styles"; 

import PrimarySecondaryButton from "../../components/PrimarySecondaryButton";

import LoginDog from "../../assets/LoginDog.png";
import BasicInput from "../../components/BasicInput";
import PasswordInputField from "../../components/PasswordInput";
import ActionText from "../../components/ActionText";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Verificar se há mensagem de erro de autenticação ao carregar
  useEffect(() => {
    const authError = getAuthError();
    if (authError) {
      setErrorMessage(authError);
    }
  }, []);



  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await authService.login(email, password);
      
      // Salvar dados do usuário se necessário
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      setSuccessMessage("Login realizado com sucesso!");
      
      // Redirecionar para a home após login bem-sucedido
      setTimeout(() => {
        window.location.href = '/';
      }, 300);
      
    } catch (err: any) {
      if (err.response?.status === 401) {
        setErrorMessage('Email ou senha incorretos');
      } else if (err.response?.status === 403) {
        // Mensagem específica do backend
        setErrorMessage(err.response.data.message);
      } else if (err.response?.status === 429) {
        setErrorMessage('Muitas tentativas de login. Por favor, aguarde alguns minutos antes de tentar novamente.');
      } else {
        setErrorMessage('Ocorreu um erro ao fazer login. Por favor, tente novamente.');
      }
    }
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
  
// ========================================================================================================
  return (
    <Container style={{ paddingRight: getScrollbarWidth() } }>

      <LoginContainer>
      {windowSize >= 1200 &&
        <div style={{minHeight: "600px", maxWidth: "732.95px", backgroundImage: `url(${LoginDog})`, width: "43%", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover"}}></div>
        }

        <LoginFormContainer>
          <LoginForm onSubmit={handleLogin}>
            <LoginFormTextContainer>
              <h1>Fazer Login</h1>
              <p>Representa uma ONG? Crie sua conta para começar</p>
            </LoginFormTextContainer>

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

            <LoginFormInputsContainer>
              
              <BasicInput
                title="E-mail"
                required = {false} 
                placeholder="Insira seu email aqui"
                value={email}
                $fontSize="1rem"
                $width="100%"
                onChange={(e) => setEmail(e.target.value)}
              />

              <PasswordInputField
                  title="Senha"
                  required={false}
                  isDisabled={false}
                  $fontSize="1rem" 
                  placeholder="Insira sua senha aqui"
                  $width="100%"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  } }
                  visible={false} 
              />
              
            </LoginFormInputsContainer>
            
            <PrimarySecondaryButton width="100%" buttonType="Primário" content="Entrar" onClick={handleLogin} paddingH="5px" paddingV="10px"/>

            <LoginFormLinksContainer>

              <ActionText
                key={"forgotPasswordActionText"}
                width="100%"
                fontSize="1rem"
                textColor="#553525"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/forgotPassword");
                }}
              >
              <h3>Esqueci minha senha</h3>

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
                  navigate("/signUp");
                }}
              >
              <h3>Criar conta</h3>

              </ActionText>
            </LoginFormLinksContainer>
          </LoginForm>
        </LoginFormContainer>
      </LoginContainer>
    </Container>
                
  );
};

export default Login;