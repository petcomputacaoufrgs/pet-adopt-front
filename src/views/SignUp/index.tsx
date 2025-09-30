import { useEffect, useState } from "react";
import { ngoService, authService } from "../../services";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import { 
  Container,
  SignUpContainer,
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

// VIEW ==============================================================================
// O componente SignUp é responsável por renderizar a página de cadastro de usuários

const SignUp: React.FC = () => {

  // ESTADOS =================================================

  interface NGO_ID {
    id: string;
    name: string;
  }

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

  // Estados para armazenar as ONGs disponíveis e o texto de busca
  const [ngoOptions, setNgoOptions] = useState<NGO_ID[]>([]);
  const [ngoSearchText, setNgoSearchText] = useState('');

  // Estado específico da role Membro
  const [ngo, setNgo] = useState<NGO_ID | null>(null); 

  // Estados específicos da role Ong
  const [doc, setdoc] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [website, setWebsite] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [adoptionForm, setAdoptionForm] = useState('');
  const [sponsorshipForm, setSponsorshipForm] = useState('');
  const [temporaryHomeForm, setTemporaryHomeForm] = useState('');
  const [claimForm, setClaimForm] = useState('');

  // FUNÇÕES DE INTEGRAÇÂO COM BACKEND ===========================

  const fetchNgoOptions = async () => {
    try {
      const response = await ngoService.getApproved();
      
      // Pega só nome e ID da NGO
      const mappedNgoOptions = response.data.map((ngo: any) => ({
        id: ngo._id || ngo.id, // Lida com nomeclatura "_id" do MongoDB.
        name: ngo.name
      }));
      
      setNgoOptions(mappedNgoOptions);
    } catch (error) {
      console.error('Error fetching NGO options:', error);
    }
  };

  useEffect(() => {
    fetchNgoOptions();
  }, []);

  const handleMemberSignUp = async () => {
    try {
      await authService.signupRegular({
        name,
        email,
        password,
        confirmPassword,
        ngoId: ngo?.id
      });
      setSuccessMessage('Cadastro realizado com sucesso!');
    } catch (err) {
      console.error(err);
      if (err instanceof AxiosError && err.response) {
        setErrorMessage(err.response.data.message || 'Erro no cadastro. Tente novamente.');
      } else {
        setErrorMessage('Erro de conexão. Tente novamente mais tarde.');
      }
    }
  };

  const handleOngSignUp = async () => {
    try {
      await authService.signupNgo({
        user: {
          name,
          email,
          password,
          confirmPassword
        },
        ngo: {
          name,
          email,
          doc,
          description,
          phone,
          city,
          website,
          instagram,
          facebook,
          adoptionForm,
          sponsorshipForm,
          temporaryHomeForm,
          claimForm,
        }
      });
      setSuccessMessage('Cadastro realizado com sucesso!');
    } catch (err) {
      console.error(err);
      if (err instanceof AxiosError && err.response) {
        setErrorMessage(err.response.data.message || 'Erro no cadastro. Tente novamente.');
      } else {
        setErrorMessage('Erro de conexão. Tente novamente mais tarde.');
      }
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {

    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (role === 'membro' && (!name || !email || !password || !confirmPassword || !ngo)) {
      setError(true);
      setErrorMessage('Preencha todos campos obrigatórios');
      return;
    }

    if (role === 'ong' && (!name || !email || !password || !confirmPassword || !doc || !instagram || !adoptionForm)) {
      setError(true);
      setErrorMessage('Preencha todos campos obrigatórios');
      return;
    }

    if (passwordError || confirmPasswordError || emailError) {
      setError(true);
      setErrorMessage('Verifique os campos preenchidos');
      return;
    }

    if (role === 'membro') {
      await handleMemberSignUp();
    }
    else if (role === 'ong') {
      await handleOngSignUp();
    }
  }

// FUNÇÕES DE VALIDAÇÃO ===========================================
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
  const isOngDisabled = !name || !email || !password || !confirmPassword || !doc || !instagram || !adoptionForm;   

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

  // Função para atualizar quando uma ONG é selecionada
  const handleNgoSelection = (searchText: string) => {
    setNgoSearchText(searchText);
    
    // Busca por correspondência exata
    const exactMatch = ngoOptions.find(option => option.name === searchText);
    
    if (exactMatch) {
      setNgo(exactMatch);
    } else {
      // Se não há correspondência exata, busca por correspondência parcial
      const partialMatch = ngoOptions.find(option => 
        option.name.toLowerCase().includes(searchText.toLowerCase())
      );
      
      if (partialMatch && searchText.length > 0) {
        // Não seleciona automaticamente, mas mantém como opção
        setNgo(null);
      } else {
        setNgo(null);
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

  // RENDERIZAÇÃO ============================================================
  
  return (
    <Container style={{ paddingRight: getScrollbarWidth() }}>
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
                    value={doc}
                    $fontSize="1rem"
                    $width="100%"
                    onChange={(e) => setdoc(e.target.value)}
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
                  options={ngoOptions.map(ngo => ngo.name)}
                  width="100%"
                  fontSize="1rem"
                  titleFontSize="1rem"
                  placeholder="Encontre ou selecione uma ONG"
                  title="Selecione sua ONG"
                  required={true}
                  query={ngoSearchText}
                  setQuery={handleNgoSelection}
                  readOnly={false}
                />
              )}

            </SignUpFormInputsContainer>

            {role === 'ong' && (
            
              <SignUpFormInputsContainer>
                <h2>Contato</h2>

                <BasicInput
                    title="Número para Contato (Opcional)"
                    required = {false}
                    placeholder="Insira o contato da sua ONG aqui"
                    value={phone}
                    $fontSize="1rem"
                    $width="100%"
                    onChange={(e) => setPhone(e.target.value)}
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
                    value={website}
                    $fontSize="1rem"
                    $width="100%"
                    onChange={(e) => setWebsite(e.target.value)}
                  />

                  <BasicInput
                    title="Link do Instagram"
                    required = {true}
                    placeholder="Insira o link aqui"
                    value={instagram}
                    $fontSize="1rem"
                    $width="100%"
                    onChange={(e) => setInstagram(e.target.value)}
                  />

                  <BasicInput
                    title="Link do Facebook (Opcional)"
                    required = {false}
                    placeholder="Insira o link aqui"
                    value={facebook}
                    $fontSize="1rem"
                    $width="100%"
                    onChange={(e) => setFacebook(e.target.value)}
                  />

              </SignUpFormInputsContainer>
              
              )}

              {role === 'ong' && (
            
              <SignUpFormInputsContainer>
                <h2>Formulários</h2>

                <BasicInput
                    title="Formulario de Adoção"
                    required = {true}
                    placeholder="Insira o link aqui"
                    value={adoptionForm}
                    $fontSize="1rem"
                    $width="100%"
                    onChange={(e) => setAdoptionForm(e.target.value)}
                />

                <BasicInput
                    title="Formulario de Apadrinhamento (Opcional)"
                    required = {false}
                    placeholder="Insira o link aqui"
                    value={sponsorshipForm}
                    $fontSize="1rem"
                    $width="100%"
                    onChange={(e) => setSponsorshipForm(e.target.value)}
                />

                <BasicInput
                    title="Formulario de Lar Temporário (Opcional)"
                    required = {false}
                    placeholder="Insira o link aqui"
                    value={temporaryHomeForm}
                    $fontSize="1rem"
                    $width="100%"
                    onChange={(e) => setTemporaryHomeForm(e.target.value)}
                />

                <BasicInput
                    title="Formulario de Reivindicação (Opcional)"
                    required = {false}
                    placeholder="Insira o link aqui"
                    value={claimForm}
                    $fontSize="1rem"
                    $width="100%"
                    onChange={(e) => setClaimForm(e.target.value)}
                />

              </SignUpFormInputsContainer>
              
              )}
                        
            <SignUpFormLinksContainer>

              {role === 'membro' ? (
                <PrimarySecondaryButton /*type="submit"*/ width="100%" buttonType="Primário" content="Criar Conta" onClick={handleSignUp} isDisabled={isMemberDisabled} paddingH="5px" paddingV="10px"/>
              ) : (
                <PrimarySecondaryButton /*type="submit"*/ width="100%" buttonType="Primário" content="Criar Conta" onClick={handleSignUp} isDisabled={isOngDisabled} paddingH="5px" paddingV="10px"/>
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
