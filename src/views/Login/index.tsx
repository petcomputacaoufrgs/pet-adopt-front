import { useState } from "react";
import axios from "axios";

import {
  Container,
  LoginContainer,
  Image,
  LoginFormContainer,
  LoginForm,
  LoginFormTextContainer,
  LoginFormInputsContainer,
  LoginFormLinksContainer,
  TextContainer,
} from "./styles"; 

import Header from "../../components/Header"; 
import PrimarySecondaryButton from "../../components/PrimarySecondaryButton";

import loginPageLogo from "../../assets/HorizontalLogo.png";
import LoginDog from "../../assets/LoginDog.png";
import BasicInput from "../../components/BasicInput";
import PasswordInputField from "../../components/PasswordInput";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await axios.post("http://localhost:3002/api/v1/auth/login", {
        email,
        password,
      });
      setSuccessMessage("Login realizado com sucesso!");
    } catch (err) {
      console.error(err);
      setErrorMessage("Login falhou. Verifique suas credenciais.");
    }
  };

  const headerOptions = [
    "Sobre Nós",
    "Animais Recém Adicionados",
    "Dicas",
    "Fale Conosco",
  ];

  const handleHeaderAction = (selected: string) => {
    // Ação a ser definida
  };

  return (
    <Container>
      <Header
        options={headerOptions}
        optionsToAction={handleHeaderAction}
        color="rgba(0, 0, 0, 0)"
        Logo={loginPageLogo}
      />

      <LoginContainer>
        <Image src={LoginDog} alt="Cachorro da página de login" />

        <LoginFormContainer>
          <LoginForm onSubmit={handleLogin}>
            <LoginFormTextContainer>
              <h1>Fazer Login</h1>
              <p>Representa uma ONG? Crie sua conta para começar</p>
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

            <LoginFormLinksContainer>
              <PrimarySecondaryButton width="100%" buttonType="Primário" content="Entrar" onClick={handleLogin}/>

              <p>Esqueci minha senha</p>
              <TextContainer>
                <div />
                <span>Ou</span>
                <div />
              </TextContainer>
              <p>Criar uma conta</p>
            </LoginFormLinksContainer>
          </LoginForm>
        </LoginFormContainer>
      </LoginContainer>
    </Container>
  );
};

export default Login;