import { useEffect, useState, useTransition } from "react";
import { ngoService, authService } from "../../services";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../services/helpers/errorHandlers";
import { createPasswordValidators } from "../../services/helpers/passwordValidation";

import { 
  Container,
  SignUpContainer,
  SignUpFormContainer, 
  SignUpForm, 
  SignUpFormTextContainer,
  SignUpFormInputsContainer,
  SignUpFormLinksContainer,
  ModalOverlay,
  ModalContent
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
import { useAuth } from "../../hooks/useAuth";

import { isCPF, isCNPJ } from "validation-br";


const SignUp: React.FC = () => {

// === ESTADOS =================================================

  interface NGO_ID {
    id: string;
    name: string;
  }

  // Estados de Dados
  const [role, setRole] = useState('membro');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Estados de Erro (VALIDAÇÃO INLINE)
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');

  // Erros específicos de Membro
  const [ngoError, setNgoError] = useState(false); // Para o SearchBar
  const [ngoErrorMessage, setNgoErrorMessage] = useState('');

  // Erros específicos de ONG
  const [docError, setDocError] = useState(false);
  const [docErrorMessage, setDocErrorMessage] = useState('');

  const [adoptionFormError, setAdoptionFormError] = useState(false);
  const [adoptionFormErrorMessage, setAdoptionFormErrorMessage] = useState('');

  const [stateError, setStateError] = useState(false);
  const [stateErrorMessage, setStateErrorMessage] = useState('');

  // Erro do grupo de contatos (se nenhum for preenchido)
  const [contactError, setContactError] = useState(false); 

  // Estados do Modal
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error'>('success');
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  // Outros Dados
  const [ngoOptions, setNgoOptions] = useState<NGO_ID[]>([]);
  const [ngoSearchText, setNgoSearchText] = useState('');
  const [ngo, setNgo] = useState<NGO_ID | null>(null); 

  // Dados ONG
  const [doc, setDoc] = useState('');
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
  const [state, setState] = useState('');

  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  // === FUNÇÕES DE HELPERS E MODAL ===========================

  const openModal = (type: 'success' | 'error', title: string, message: string) => {
    setModalType(type);
    setModalTitle(title);
    setModalMessage(message);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    if (modalType === 'success') {
       handleNavigation('/');
    }
  };

  const handleNavigation = (to: string) => {
    startTransition(() => {
      navigate(to);
    });
  }

  // === VALIDAÇÕES LÓGICAS (VALIDATE FORM) ===========================

  // Verifica campos básicos e retorna TRUE se estiver tudo certo
  const validateForm = () => {
    let isValid = true;

    // Validar Nome
    if (!name.trim()) {
      setNameError(true);
      setNameErrorMessage('Nome é obrigatório');
      isValid = false;
    }

    // Validar Email (Vazio ou Formato)
    if (!email.trim()) {
      setEmailError(true);
      setEmailErrorMessage('E-mail é obrigatório');
      isValid = false;
    } else {
      // Se verifyEmail já rodou no onChange e setou erro, isValid deve ser false
      if (emailError) isValid = false;
    }

    // Validar Senhas
    if (!password) {
      setPasswordError(true);
      setPasswordErrorMessage('Senha é obrigatória');
      isValid = false;
    } else if (passwordError) isValid = false;

    if (!confirmPassword) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage('Confirmação é obrigatória');
      isValid = false;
    } else if (confirmPasswordError) isValid = false;


    // Validações Específicas de ROLE
    if (role === 'membro') {
      if (!ngo) {
        setNgoError(true);
        setNgoErrorMessage('Selecione uma ONG da lista');
        isValid = false;
      }
    }

    if (role === 'ong') {
      // Documento
      if (!doc.trim()) {
        setDocError(true);
        setDocErrorMessage('CPF ou CNPJ é obrigatório');
        isValid = false;
      } else if (!isCNPJ(doc) && !isCPF(doc)) {
        setDocError(true);
        setDocErrorMessage('Documento inválido');
        isValid = false;
      }

      // Estado
      if (!state.trim()) {
        setStateError(true);
        setStateErrorMessage('Estado é obrigatório');
        isValid = false;
      }

      // Formulário de Adoção
      if (!adoptionForm.trim()) {
        setAdoptionFormError(true);
        setAdoptionFormErrorMessage('Link do formulário é obrigatório');
        isValid = false;
      }

      // Grupo de Contato (Pelo menos um)
      if (!phone.trim() && !instagram.trim() && !facebook.trim()) {
        setContactError(true);
        isValid = false;
      } else {
        setContactError(false);
      }
    }

    return isValid;
  };

  // Funções de verificação "on typing" (usando helper reutilizável)
  const { verifyPassword, verifyConfirmPassword: verifyConfirmPasswordHelper } = createPasswordValidators(
    setPasswordError,
    setPasswordErrorMessage,
    setConfirmPasswordError,
    setConfirmPasswordErrorMessage
  );

  const verifyConfirmPassword = (cPass: string) => {
    verifyConfirmPasswordHelper(password, cPass);
  };

  const verifyConfirmPasswordFromStandard = (pass: string) => {
    verifyConfirmPasswordHelper(pass, confirmPassword);
  }

  const verifyEmail = (mail: string) => {
    if(mail.trim() === '') { setEmailError(false); setEmailErrorMessage(''); return; }
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if(!emailRegex.test(mail)){ setEmailError(true); setEmailErrorMessage('E-mail inválido'); return; }
    setEmailError(false); setEmailErrorMessage('');
  }

  // === HANDLERS DE SUBMIT ===========================

  const fetchNgoOptions = async () => {
    try {
      const response = await ngoService.getApproved();
      const mappedNgoOptions = response.data.map((ngo: any) => ({
        id: ngo._id || ngo.id,
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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // Executa a validação completa
    const isFormValid = validateForm();

    
    if (!isFormValid) {
      // Se falhar, abre o modal avisando para verificar os campos
      openModal('error', 'Atenção', 'Verifique os erros nos campos destacados e tente novamente.');
      return;
    }

    // Se passou, prossegue para o envio
    if (role === 'membro') {
      await handleMemberSignUp();
    } else if (role === 'ong') {
      await handleOngSignUp();
    }
  }

  const handleMemberSignUp = async () => {
    try {
      await authService.signupNgoMember({
        name, email, password, confirmPassword, ngoId: ngo?.id
      });
      openModal('success', 'Cadastro Realizado!', 'Seu pedido foi enviado para aprovação.');
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleOngSignUp = async () => {
    try {
      await authService.signupNgo({
        user: { name, email, password, confirmPassword },
        ngo: {
          name, email, doc, description, phone, city, state, website,
          instagram, facebook, adoptionForm, sponsorshipForm,
          temporaryHomeForm, claimForm,
        }
      });
      openModal('success', 'Solicitação Enviada!', 'O cadastro da sua ONG foi enviado para análise.');
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleApiError = (err: any) => {
    console.error(err);
    const msg = getErrorMessage(err, 'Erro de conexão. Tente novamente mais tarde.');
    openModal('error', 'Algo deu errado', msg);
  }

  // === OUTROS HANDLERS =======================

  const handleNgoSelection = (searchText: string) => {
    setNgoSearchText(searchText);
    if(ngoError) { setNgoError(false); setNgoErrorMessage(''); } // Limpa erro ao digitar

    const exactMatch = ngoOptions.find(option => option.name === searchText);
    setNgo(exactMatch || null);
  };

  const [windowSize, setWindowSize] = useState(window.innerWidth);
  useEffect(() => {
      const handleResize = () => setWindowSize(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
  }, []);

  

  // OUTROS ============================================

  const currentUserOptions = ["Fazer Login"];

  function getScrollbarWidth() {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden'; outer.style.overflow = 'scroll';
    document.body.appendChild(outer);
    const inner = document.createElement('div');
    outer.appendChild(inner);
    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
    if (outer.parentNode) outer.parentNode.removeChild(outer);
    return scrollbarWidth;
  }

  // RENDERIZAÇÃO ============================================================
  
  const {isLoading, user, isLoggedIn} = useAuth();
  if(isLoading) return null;
      
return (
    <Container style={{ paddingRight: getScrollbarWidth() }}>
      
      {/* MODAL */}
      {showModal && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2 style={{ color: modalType === 'error' ? '#FF3B30' : '#4CAF50' }}>{modalTitle}</h2>
            <p>{modalMessage}</p>
            <PrimarySecondaryButton 
              width="100%" 
              buttonType={modalType === 'error' ? "Secundário" : "Primário"} 
              content={modalType === 'error' ? "Corrigir" : "Ok"} 
              onClick={closeModal} 
              isDisabled={false} 
              paddingH="5px" paddingV="10px"
            />
          </ModalContent>
        </ModalOverlay>
      )}

      <Header Logo={loginPageLogo} isLoggedIn={isLoggedIn} user={user} color="rgba(0,0,0,0)"/>      

      <SignUpContainer>
        {windowSize >= 1200 &&
          <div style={{maxWidth: "732.95px", backgroundImage: `url(${LoginDog})`, width: "43%", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover"}}></div>
        } 

        <SignUpFormContainer role={role}>
          <SignUpForm onSubmit={handleSignUp} role={role}>
            
            <SignUpToggle selected={role} onSelect={setRole}/>

            <SignUpFormTextContainer>
              <h1>Cadastro de {role === 'membro' ? 'Membro' : 'ONG'} </h1>
            </SignUpFormTextContainer>
            
            <SignUpFormInputsContainer>
              
              {role==='ong' && <h2>Informações da ONG </h2>}

              {/* === INPUT NOME === */}
              <BasicInput
                title= {role === 'ong' ? 'Nome da ONG' : 'Nome'}
                required = {true} 
                placeholder="Insira seu nome aqui"
                value={name}
                $fontSize="1rem"
                $width="100%"
                onChange={(e) => {
                   setName(e.target.value);
                   // Limpa erro ao digitar
                   if(nameError) { setNameError(false); setNameErrorMessage(''); }
                }}
                error={nameError}
                errorMessage={nameErrorMessage}
              />
              
              {/* === INPUT EMAIL === */}
              <BasicInput
                title="E-mail"
                required = {true} 
                placeholder="Insira seu email aqui"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  verifyEmail(e.target.value);
                }}
                $fontSize="1rem"
                $width="100%"
                error={emailError}
                errorMessage={emailErrorMessage} 
              />

              {/* === INPUT CPF/CNPJ (ONG) === */}
              {role === 'ong' && (
                  <BasicInput
                    title="CPF/CNPJ"
                    required = {true}
                    placeholder="Insira seu CPF/CNPJ aqui"
                    value={doc}
                    $fontSize="1rem"
                    $width="100%"
                    onChange={(e) => {
                        setDoc(e.target.value);
                        if(docError) { setDocError(false); setDocErrorMessage(''); }
                    }}
                    error={docError}
                    errorMessage={docErrorMessage}
                  />
              )}

              {/* === SENHAS === */}
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
                    verifyConfirmPasswordFromStandard(e.target.value);
                  }}
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
                  }}
                  error={confirmPasswordError}
                  errorMessage={confirmPasswordErrorMessage} 
                  visible={false}
              />

              {role === 'ong' && (
                <>
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
                    maxLength={1000}
                  />
                  <BasicInput
                    title="Cidade (Opcional)"
                    required={false}
                    placeholder="Insira a cidade da sua ONG aqui"
                    value={city}
                    $fontSize="1rem"
                    $width="100%"
                    onChange={(e) => setCity(e.target.value)}
                  />

                  <SearchBar
                    title="Estado"
                    required
                    placeholder="Insira o estado sede da ONG aqui"
                    query={state}
                    setQuery={setState}
                    options={[
                      "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT",
                      "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO",
                      "RR", "SC", "SP", "SE", "TO",
                    ]}
                    resetOption="Qualquer"
                    width="100%"
                    fontSize="16px"
                    listMaxHeight="200px"
                  />

                  <BasicInput
                    title="Link do WebSite (Opcional)"
                    required={false}
                    placeholder="Insira o link aqui"
                    value={website}
                    $fontSize="1rem"
                    $width="100%"
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </>
              )}

             {/* === SELEÇÃO DE ONG (MEMBRO) === */}
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
                  // Passando propriedades de erro (Assumindo que SearchBar suporta ou você vai ajustar)
                  error={ngoError}
                  errorMessage={ngoErrorMessage}
                />
              )}

            </SignUpFormInputsContainer>

            {role === 'ong' && (
              <SignUpFormInputsContainer>
                <div>
                  <h2>Contato <span style={{color: "#F17D6E"}}>*</span></h2>
                  <p style={{ 
                      color: contactError ? '#FF3B30' : 'inherit', 
                      fontWeight: contactError ? 'bold' : 'normal' 
                  }}>
                    {contactError ? "ERRO: Preencha ao menos um campo abaixo" : "Preencha ao menos um dos campos abaixo"}
                  </p>
                </div>

                {/* Se contactError for true, destacamos todos os inputs do grupo para alertar */}
                <BasicInput
                    title="Número para Contato"
                    required = {false}
                    placeholder="Insira o contato aqui"
                    value={phone}
                    $fontSize="1rem"
                    $width="100%"
                    onChange={(e) => { setPhone(e.target.value); setContactError(false); }}
                    error={contactError} 
                />
                <BasicInput
                    title="Link do Instagram"
                    required = {false}
                    placeholder="Insira o link aqui"
                    value={instagram}
                    $fontSize="1rem"
                    $width="100%"
                    onChange={(e) => { setInstagram(e.target.value); setContactError(false); }}
                    error={contactError}
                />
                <BasicInput
                    title="Link do Facebook"
                    required = {false}
                    placeholder="Insira o link aqui"
                    value={facebook}
                    $fontSize="1rem"
                    $width="100%"
                    onChange={(e) => { setFacebook(e.target.value); setContactError(false); }}
                    error={contactError}
                />
              </SignUpFormInputsContainer>
            )}

            {role === 'ong' && (
              <SignUpFormInputsContainer>
                <h2>Formulários</h2>
                
                {/* === FORM ADOÇÃO === */}
                <BasicInput
                    title="Formulario de Adoção"
                    required = {true}
                    placeholder="Insira o link aqui"
                    value={adoptionForm}
                    $fontSize="1rem"
                    $width="100%"
                    onChange={(e) => {
                        setAdoptionForm(e.target.value);
                        if(adoptionFormError) { setAdoptionFormError(false); setAdoptionFormErrorMessage(''); }
                    }}
                    error={adoptionFormError}
                    errorMessage={adoptionFormErrorMessage}
                />
                {/* Outros forms opcionais... */}
                <BasicInput
                    title="Formulario de Apadrinhamento (Opcional)"
                    required={false}
                    placeholder="Insira o link aqui"
                    value={sponsorshipForm}
                    $fontSize="1rem" $width="100%"
                    onChange={(e) => setSponsorshipForm(e.target.value)}
                />
                <BasicInput
                    title="Formulario de Lar Temporário (Opcional)"
                    required={false}
                    placeholder="Insira o link aqui"
                    value={temporaryHomeForm}
                    $fontSize="1rem" $width="100%"
                    onChange={(e) => setTemporaryHomeForm(e.target.value)}
                />
                <BasicInput
                    title="Formulario de Reivindicação (Opcional)"
                    required={false}
                    placeholder="Insira o link aqui"
                    value={claimForm}
                    $fontSize="1rem" $width="100%"
                    onChange={(e) => setClaimForm(e.target.value)}
                />
              </SignUpFormInputsContainer>
            )}
                        
            <SignUpFormLinksContainer>
              <PrimarySecondaryButton 
                  width="100%" 
                  buttonType="Primário" 
                  content="Criar Conta" 
                  onClick={handleSignUp} 
                  isDisabled={false} 
                  paddingH="5px" 
                  paddingV="10px"
              />

              <ActionText
                key={currentUserOptions[0]}
                width="100%"
                fontSize="1rem"
                textColor="#553525"
                onClick={(e) => {
                   e.preventDefault();
                   startTransition(() => navigate("/login"));
                }}
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