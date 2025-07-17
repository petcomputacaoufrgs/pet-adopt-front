import { useState } from "react";
import axios from "axios";

import { 
  LoginContainer, 
  LoginForm, 
  Input, 
  Button 
} from "./styles";

import Header from "../../components/Header";

import loginPageLogo from "../../assets/HorizontalLogo.png";

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
      await axios.post("http://localhost:3002/api/v1/auth/login", { email, password });
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
    "Fale Conosco"
  ];

  const handleHeaderAction = (selected: string) => {
    // Ação a ser definida
  };

  return (
    <LoginContainer>
      <Header 
        options={headerOptions} 
        optionsToAction={handleHeaderAction} 
        color="rgba(0, 0, 0, 0)" 
        Logo={loginPageLogo} 
      />

      <LoginForm onSubmit={handleLogin}>
        <h2>Login</h2>

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

        <Input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit">Entrar</Button>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
