import { LoginContainer, LoginForm, Input, Button } from "./styles";
import axios from 'axios';

import Header from "../../components/Header";

import logo from "../../assets/HorizontalLogo.png";
import { useState } from "react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3002/api/v1/auth/login', { email, password });
      alert('Login feito!');
    } catch (err) {
      console.error(err);
      alert('Erro no Login!');
    }
    console.log("Email:", email);
    console.log("Senha:", password);
  };

  return (
    <LoginContainer>
      <Header color="rgba(0, 0, 0, 0)" user="not in" Logo={logo} />
      <LoginForm onSubmit={handleLogin}>
        <h2>Login</h2>
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