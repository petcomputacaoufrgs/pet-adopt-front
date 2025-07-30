import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { 
  Container,
  SignUpContainer,
  Image,
  SignUpFormContainer, 
  SignUpForm, 
  SignUpFormTextContainer,
  SignUpFormInputsContainer,
  SignUpFormLinksContainer,
} from "./styles";

import Header from "../../components/Header";
import PrimarySecondaryButton from "../../components/PrimarySecondaryButton";
import BasicInput from "../../components/BasicInput";
import PasswordInput from "../../components/PasswordInput";
import ActionText from "../../components/ActionText";
import SearchBar from "../../components/SearchBar";
import SignUpToggle from "../../components/SignUpToggle";
import LargeInputField from "../../components/LargeInput";

import loginPageLogo from "../../assets/HorizontalLogo.png";
import LoginDog from "../../assets/LoginDog.png";
import Login from "../Login";

// VIEW ==============================================================================
// O componente SignUp é responsável por renderizar a página de cadastro de usuários

const SignUp: React.FC = () => {

  // ESTADOS =================================================

  // utilizar um pull do BD aqui
  const ongOptions = ["Ong Cachorrada", 
                   "Ong Adoção", 
                   "Ong Ajuda Animal", 
                   "Ong Pet Lovers",
                   "Ong Animais Felizes", 
                   "Ong Vida Animal", 
                   "Ong Amigos dos Animais", 
                   "Ong Patinhas Solidárias", 
                   "Ong Cão Feliz", 
                   "Ong Gatos e Cães Unidos"];

  // Estados comum as duas roles (membro e ong)
  const [role, setRole] = useState('membro');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(false);

  // Estados específico da role Membro
  const [ngo, setNgo] = useState('');

  // Estados específico da role Ong
  const [document, setDocument] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [city, setCity] = useState('');
  const [websiteLink, setWebsiteLink] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [facebookLink, setFacebookLink] = useState('');
  const [adoptionFormLink, setAdoptionFormLink] = useState('');
  const [sponsorshipFormLink, setSponsorshipFormLink] = useState('');
  const [temporaryHomeFormLink, setTemporaryHomeFormLink] = useState('');
  const [claimFormLink, setClaimFormLink] = useState('');

  // FUNÇÕES DE VALIDAÇÃO ===========================================

  const handleSignUp = async (e: React.FormEvent) => {

    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (role === 'membro' && (!name || !email || !password || !confirmPassword || !ngo)) {
      setError(true);
      setErrorMessage('Preencha todos campos obrigatórios');
      return;
    }

    if (role === 'ong' && (!name || !email || !password || !confirmPassword || !document || !instagramLink || !adoptionFormLink)) {
      setError(true);
      setErrorMessage('Preencha todos campos obrigatórios');
      return;
    }

    if (passwordError || confirmPasswordError || emailError) {
      setError(true);
      setErrorMessage('Verifique os campos preenchidos');
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

  const verifyEmail = (email: string) => {

    if(email.trim() === '') {
      setEmailError(false);
      setEmailErrorMessage('');
      return;
    }
    
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if(!emailRegex.test(email)){
      setEmailError(true);
      setEmailErrorMessage('Digite um endereço de e-mail válido');
      return;
    }

    setEmailError(false);
    setEmailErrorMessage('');

  }

  // Verifica se todos os campos obrigatórios estão preenchidos e se não há erros para habilitar o botão de cadastro. 
  // Se houver erros, o botão de cadastro ficará desabilitado
  const isMemberDisabled = !name || !email || !password || !confirmPassword || !ngo;
  const isOngDisabled = !name || !email || !password || !confirmPassword || !document || !instagramLink || !adoptionFormLink;   

  const headerOptions = [
    "Sobre Nós", 
    "Animais Recém Adicionados", 
    "Dicas", 
    "Fale Conosco"
  ];

  // AÇÕES DE HEADER E NAVEGAÇÃO ============================================

  const handleHeaderAction = (selected: string) => {
    // Ação a ser definida
  };

  const navigate = useNavigate();

  const handleUserAction = (selected: string) => {
    if (selected === "Fazer Login") navigate("/login");
  };

  const currentUserOptions = ["Fazer Login"];

  const currentUserActions = handleUserAction;


  // CONTROLE DO COMPRIMENTO DA JANELA PARA RESPONSIVIDADE ============================================

  const [windowSize, setWindowSize] = useState(window.innerWidth);
  
  useEffect(() => {
      const handleResize = () => {
        setWindowSize(window.innerWidth);
      }
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
  }, []);



  // RENDERIZAÇÃO ============================================================
  
  return (
    <Container>
      <Header 
        options={headerOptions} 
        optionsToAction={handleHeaderAction} 
        color="rgba(0, 0, 0, 0)" 
        Logo={loginPageLogo} 
      />      

      <SignUpContainer>

        {windowSize >= 1200 &&
        <div style={{maxWidth: "732.95px", backgroundImage: `url(${LoginDog})`, width: "43%", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover"}}></div>
        } 


        <SignUpFormContainer role={role}>
                  
          <SignUpForm onSubmit={handleSignUp} role={role}>
            
            <SignUpToggle
              selected={role}
              onSelect={setRole}
            />

            <SignUpFormTextContainer>
              <h1>Cadastro de {role === 'membro' ? 'Membro' : 'ONG'} </h1>
            </SignUpFormTextContainer>

            {errorMessage && (
              <div style={{ color: "red"}}>
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div style={{ color: "green"}}>
                {successMessage}
              </div>
            )}

            <SignUpFormInputsContainer>
              
              {role==='ong' && (
                <h2>Informações da ONG </h2>
              )}

              <BasicInput
                title= {role === 'ong' ? 'Nome da ONG' : 'Nome'}
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
                      onChange={(e) => {
                    setEmail(e.target.value);
                    verifyEmail(e.target.value);
                  } }
                $fontSize="1rem"
                $width="100%"
                error={emailError}
                errorMessage={emailErrorMessage} 
              />

              {role === 'ong' && (
                  <BasicInput
                    title="CPF/CNPJ"
                    required = {true}
                    placeholder="Insira seu CPF/CNPJ aqui"
                    value={document}
                    $fontSize="1rem"
                    $width="100%"
                    onChange={(e) => setDocument(e.target.value)}
                  />
              )}

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

              {role === 'ong' && (
                
                <LargeInputField
                  title="Descrição (Opcional)"
                  required={false}
                  $fontSize="1rem"
                  placeholder="Escreva uma breve descrição aqui"
                  $width="100%"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  error={false}
                  visible={false}
                  isDisabled={false}
                  $inputType="Primário"
                />
              )}

              {role === 'membro' && (
                <SearchBar 
                  options={ongOptions}
                  width="100%"
                  fontSize="1rem"
                  titleFontSize="1rem"
                  placeholder="Encontre ou selecione uma ONG"
                  title="Selecione sua ONG"
                  required={true}
                  query={ngo}
                  setQuery={setNgo}
                  readOnly={false}
                />
              )}

            </SignUpFormInputsContainer>

            {role === 'ong' && (
            
              <SignUpFormInputsContainer>
                {role==='ong' && (
                  <h2>Contato</h2>
                )}

                <BasicInput
                    title="Número para Contato (Opcional)"
                    required = {false}
                    placeholder="Insira o contato da sua ONG aqui"
                    value={contact}
                    $fontSize="1rem"
                    $width="100%"
                    onChange={(e) => setContact(e.target.value)}
                />

                <BasicInput
                    title="Cidade (Opcional)"
                    required = {false}
                    placeholder="Insira a cidade da sua ONG aqui"
                    value={city}
                    $fontSize="1rem"
                    $width="100%"
                    onChange={(e) => setCity(e.target.value)}
                  />

                  <BasicInput
                    title="Link do WebSite (Opcional)"
                    required = {false}
                    placeholder="Insira o link aqui"
                    value={websiteLink}
                    $fontSize="1rem"
                    $width="100%"
                    onChange={(e) => setWebsiteLink(e.target.value)}
                  />

                  <BasicInput
                    title="Link do Instagram"
                    required = {true}
                    placeholder="Insira o link aqui"
                    value={instagramLink}
                    $fontSize="1rem"
                    $width="100%"
                    onChange={(e) => setInstagramLink(e.target.value)}
                  />

                  <BasicInput
                    title="Link do Facebook (Opcional)"
                    required = {false}
                    placeholder="Insira o link aqui"
                    value={facebookLink}
                    $fontSize="1rem"
                    $width="100%"
                    onChange={(e) => setFacebookLink(e.target.value)}
                  />

              </SignUpFormInputsContainer>
              
              )}

              {role === 'ong' && (
            
              <SignUpFormInputsContainer>
                {role==='ong' && (
                  <h2>Formulários</h2>
                )}

                <BasicInput
                    title="Formulario de Adoção"
                    required = {true}
                    placeholder="Insira o link aqui"
                    value={adoptionFormLink}
                    $fontSize="1rem"
                    $width="100%"
                    onChange={(e) => setAdoptionFormLink(e.target.value)}
                />

                <BasicInput
                    title="Formulario de Apadrinhamento (Opcional)"
                    required = {false}
                    placeholder="Insira o link aqui"
                    value={sponsorshipFormLink}
                    $fontSize="1rem"
                    $width="100%"
                    onChange={(e) => setSponsorshipFormLink(e.target.value)}
                />

                <BasicInput
                    title="Formulario de Lar Temporário (Opcional)"
                    required = {false}
                    placeholder="Insira o link aqui"
                    value={temporaryHomeFormLink}
                    $fontSize="1rem"
                    $width="100%"
                    onChange={(e) => setTemporaryHomeFormLink(e.target.value)}
                />

                <BasicInput
                    title="Formulario de Reivindicação (Opcional)"
                    required = {false}
                    placeholder="Insira o link aqui"
                    value={claimFormLink}
                    $fontSize="1rem"
                    $width="100%"
                    onChange={(e) => setClaimFormLink(e.target.value)}
                />

              </SignUpFormInputsContainer>
              
              )}
                        
            <SignUpFormLinksContainer>

              {role === 'membro' ? (
                <PrimarySecondaryButton /*type="submit"*/ width="100%" buttonType="Primário" content="Criar Conta" onClick={handleSignUp} isDisabled={isMemberDisabled}/>
              ) : (
                <PrimarySecondaryButton /*type="submit"*/ width="100%" buttonType="Primário" content="Criar Conta" onClick={handleSignUp} isDisabled={isOngDisabled}/>
              )}

              <ActionText
                key={currentUserOptions[0]}
                width="100%"
                fontSize="1rem"
                textColor="#553525"
                onClick={() => currentUserActions(currentUserOptions[0])}
              >
                <h3 style={{ marginBottom: '69px' }}>Fazer Login</h3>
                
              </ActionText>
          
            </SignUpFormLinksContainer>
          </SignUpForm>
        </SignUpFormContainer>
      </SignUpContainer>
    </Container>
  );
};

export default SignUp;
