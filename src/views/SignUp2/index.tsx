import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { 
  Container,
  LoginContainer,
  Image,
  LoginFormContainer, 
  LoginForm, 
  LoginFormTextContainer,
  LoginFormInputsContainer,
  LoginFormLinksContainer,
  TextContainer 
} from "./styles";

import Header from "../../components/Header";
import PrimarySecondaryButton from "../../components/PrimarySecondaryButton";
import BasicInput from "../../components/BasicInput";
import PasswordInput from "../../components/PasswordInput";
import ActionText from "../../components/ActionText";

import loginPageLogo from "../../assets/HorizontalLogo.png";
import LoginDog from "../../assets/LoginDog.png";

const Login: React.FC = () => {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [ngo, setNgo] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [error, setError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!name || !email || !password || !confirmPassword) {
      setError(true);
      setErrorMessage('Preencha todos campos obrigatórios');
      return;
    }

    try {
      await axios.post('http://localhost:3002/api/v1/auth/signup', {
        name,
        email,
        password,
        confirmPassword,
        role,
        ngo,
      });
      setSuccessMessage('Cadastro realizado com sucesso!');
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err) && err.response) {
        setErrorMessage(err.response.data.message || 'Erro no cadastro. Tente novamente.');
      } else {
        setErrorMessage('Erro de conexão. Tente novamente mais tarde.');
      }
    }
  };

  const headerOptions = [
    "Sobre Nós", 
    "Animais Recém Adicionados", 
    "Dicas", 
    "Fale Conosco"
  ];

  const handleHeaderAction = (selected: string) => {
    // Ação a ser definida
  };

  const verifyPassword = (password: string) => {
    if(password.trim() === '') {
      setPasswordError(false);
      setPasswordErrorMessage('');
      return;
    }

    if (password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('A senha deve ter pelo menos 6 caracteres');
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordError(true);
      setPasswordErrorMessage('A senha deve ter pelo menos uma letra maiúscula');
      return;
    }
    if (!/[0-9]/.test(password)) {
      setPasswordError(true);
      setPasswordErrorMessage('A senha deve ter pelo menos um número');
      return;
    }
    if (!/[!@#$%^&*]/.test(password)) {
      setPasswordError(true);
      setPasswordErrorMessage('A senha deve ter pelo menos um caractere especial');
      return;
    }
    setPasswordError(false);
    setPasswordErrorMessage('');
  };

  const isDisabled = passwordError || confirmPasswordError || !name || !email || !password || !confirmPassword;

  const verifyConfirmPassword = (confirmPassword: string) => {
    if (confirmPassword.trim() === '') {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage('');
      return;
    }
    if (confirmPassword !== password) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage('As senhas não coincidem');
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage('');
    }
  };

  const navigate = useNavigate();

  const handleUserAction = (selected: string) => {
    if (selected === "Fazer Login") navigate("/login");
  };

  const currentUserOptions = ["Fazer Login"];

  const currentUserActions = handleUserAction;

  return (
    <Container>
      <Header 
        options={headerOptions} 
        optionsToAction={handleHeaderAction} 
        color="rgba(0, 0, 0, 0)" 
        Logo={loginPageLogo} 
      />      

      <LoginContainer>
        <Image src={LoginDog} alt="Dog do Login"/>

        <LoginFormContainer>
          <LoginForm onSubmit={handleSignUp}>
            <LoginFormTextContainer>
              <h1>Cadastro</h1>
            </LoginFormTextContainer>

            {errorMessage && (
              <div style={{ color: "red", margin: "10px 0" }}>
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div style={{ color: "green", margin: "10px 0" }}>
                {successMessage}
              </div>
            )}

            <LoginFormInputsContainer>

              <BasicInput
                title="Nome"
                required = {true} 
                placeholder="Insira seu nome aqui"
                value={name}
                $fontSize="1rem"
                $width="100%"
                onChange={(e) => setName(e.target.value)}
              />
              
              <BasicInput
                title="E-mail"
                required = {true} 
                placeholder="Insira seu email aqui"
                value={email}
                $fontSize="1rem"
                $width="100%"
                onChange={(e) => setEmail(e.target.value)}
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
              
            </LoginFormInputsContainer>

            <LoginFormLinksContainer>
              <PrimarySecondaryButton /*type="submit"*/ width="100%" buttonType="Primário" content="Criar Conta" onClick={handleSignUp} isDisabled={isDisabled}/>
              <ActionText
                key={currentUserOptions[0]}
                width="100%"
                fontSize="1rem"
                textColor="#553525"
                onClick={() => currentUserActions(currentUserOptions[0])}
              >
                <h3>Fazer Login</h3>
              </ActionText>
          
            </LoginFormLinksContainer>
          </LoginForm>
        </LoginFormContainer>
      </LoginContainer>
    </Container>
  );
};

export default Login;
