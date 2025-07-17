import React, { useState } from 'react';
import axios from 'axios';

import {
  Button,
  FormTitle,
  Input,
  RoleToggleContainer,
  RoleToggleButton,
  SignUpContainer,
  SignUpForm,
} from './styles';

import Header from '../../components/Header';

import HorizontalLogo from '../../assets/HorizontalLogo.png';

const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [ngo, setNgo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = (): string | null => {
    if (!role) {
      return 'Escolha Admin ou Membro de ONG.';
    }
    if (role === 'NGO_MEMBER' && !ngo.trim()) {
      return 'O nome da ONG é obrigatório';
    }
    if (password !== confirmPassword) {
      return 'As senhas não coincidem';
    }
    return null;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
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

  const headerOptions = ['Sobre Nós', 'Animais Recém Adicionados', 'Dicas', 'Fale Conosco'];

  const handleHeaderAction = (selected: string) => {
    console.log(`Opção selecionada no cabeçalho: ${selected}`);
  };

  return (
    <SignUpContainer>
      <Header options={headerOptions} optionsToAction={handleHeaderAction} color="rgba(0, 0, 0, 0)" Logo={HorizontalLogo} />
      <SignUpForm onSubmit={handleSignUp}>
        <FormTitle>Cadastro</FormTitle>
        {errorMessage && (
          <div style={{ color: 'red', margin: '0.625em 0' }}>{errorMessage}</div>
        )}
        {successMessage && (
          <div style={{ color: 'green', margin: '0.625em 0' }}>{successMessage}</div>
        )}
        <Input
          type="text"
          placeholder="Digite seu nome"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Confirme a senha"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
        <RoleToggleContainer>
          <RoleToggleButton type="button" active={role === 'ADMIN'} onClick={() => setRole('ADMIN')}>
            ADMIN
          </RoleToggleButton>
          <RoleToggleButton type="button" active={role === 'NGO_MEMBER'} onClick={() => setRole('NGO_MEMBER')}>
            ONG
          </RoleToggleButton>
        </RoleToggleContainer>
        {role === 'NGO_MEMBER' && (
          <Input
            type="text"
            placeholder="Nome da ONG"
            value={ngo}
            onChange={e => setNgo(e.target.value)}
          />
        )}
        <Button type="submit">Cadastrar</Button>
      </SignUpForm>
    </SignUpContainer>
  );
};

export default SignUp;