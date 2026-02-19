import React, { useState } from "react";
import { AxiosError } from "axios";
import { ngoService, userService } from "../../services";
import BasicInput from "../BasicInput";
import PrimarySecondaryButton from "../PrimarySecondaryButton";
import LargeInputField from "../LargeInput";
import { Container, ContentContainer, UpdateButton, TopBar, InputsContainer, ButtonGroup, ButtonWrapper } from "./styles";
import CloseButton from "../CloseButton";
import SearchBar from "../SearchBar";
import { useAuth } from "../../hooks/useAuth";
import ConfirmModal from "../ConfirmModal";
import { useToast } from "../../contexts/ToastContext";

// Importação da biblioteca de validação (igual ao SignUp)
import { isCPF, isCNPJ } from "validation-br";
import type { User } from "../../types/user";

export interface NGOData {
  _id: string;
  name: string;
  email: string;
  description?: string;
  phone?: string;
  city?: string;
  state?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  doc?: string;
  adoptionForm?: string;
  sponsorshipForm?: string;
  temporaryHomeForm?: string;
  claimForm?: string;
}

type Props = { 
  initialData: NGOData;
  user: User;
  onClose?: () => void 
};

const ManageNGOInfoForm: React.FC<Props> = ({ initialData, user, onClose }) => {
  const { logout } = useAuth();
  const { showToast } = useToast();
  
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);

  // DADOS DO FORMULÁRIO
  const [name, setName] = useState(initialData.name || '');
  const [email, setEmail] = useState(initialData.email || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [phone, setPhone] = useState(initialData.phone || '');
  const [city, setCity] = useState(initialData.city || '');
  const [state, setState] = useState(initialData.state || '');
  const [website, setWebsite] = useState(initialData.website || '');
  const [instagram, setInstagram] = useState(initialData.instagram || '');
  const [facebook, setFacebook] = useState(initialData.facebook || '');
  const [doc, setDoc] = useState(initialData.doc || '');
  
  const [adoptionForm, setAdoptionForm] = useState(initialData.adoptionForm || '');
  const [sponsorshipForm, setSponsorshipForm] = useState(initialData.sponsorshipForm || '');
  const [temporaryHomeForm, setTemporaryHomeForm] = useState(initialData.temporaryHomeForm || '');
  const [claimForm, setClaimForm] = useState(initialData.claimForm || '');

  // ESTADOS DE ERRO
  const [errorMessage, setErrorMessage] = useState(''); // Erro geral do form

  // Validação Inline
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const [docError, setDocError] = useState(false);
  const [docErrorMessage, setDocErrorMessage] = useState('');

  const [stateError, setStateError] = useState(false);

  const [adoptionFormError, setAdoptionFormError] = useState(false);
  const [adoptionFormErrorMessage, setAdoptionFormErrorMessage] = useState('');

  // Erro de grupo (pelo menos um contato)
  const [contactError, setContactError] = useState(false);


  // LÓGICA DE VALIDAÇÃO (Replicada do SignUp)
  const validateForm = () => {
    let isValid = true;

    // Nome
    if (!name.trim()) {
      setNameError(true);
      setNameErrorMessage('Nome é obrigatório');
      isValid = false;
    }

    // Email (apenas checa se está vazio ou se verifyEmail já pegou erro)
    if (!email.trim()) {
      setEmailError(true);
      setEmailErrorMessage('E-mail é obrigatório');
      isValid = false;
    } else if (emailError) {
      isValid = false;
    }

    // Documento (CPF ou CNPJ)
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
      isValid = false;
    }

    // Formulário de Adoção (Obrigatório)
    if (!adoptionForm.trim()) {
      setAdoptionFormError(true);
      setAdoptionFormErrorMessage('Link do formulário de adoção é obrigatório');
      isValid = false;
    }

    // Grupo de Contato (Pelo menos um)
    if (!phone.trim() && !instagram.trim() && !facebook.trim()) {
      setContactError(true);
      isValid = false;
    } else {
      setContactError(false);
    }

    return isValid;
  };

  const verifyEmail = (em: string) => {
    if (em.trim() === '') {
      setEmailError(false);
      setEmailErrorMessage('');
      return;
    }
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(em)) {
      setEmailError(true);
      setEmailErrorMessage('Digite um endereço de e-mail válido');
      return;
    }
    setEmailError(false);
    setEmailErrorMessage('');
  };

  // HANDLERS

  const handleChangePassword = async () => {
    logout(false);
    window.location.href = '/forgotPassword';
  };

  const handleUpdate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage("");

    const isValid = validateForm();

    if (!isValid) {
      setErrorMessage('Verifique os campos destacados e tente novamente.');
      showToast({
        success: false,
        message: "Erro de Validação",
        description: "Preencha os campos obrigatórios corretamente."
      });
      return;
    }

    try {
      await ngoService.update(initialData._id, {
        name,
        email: initialData.email,
        description,
        phone,
        city,
        state,
        website,
        instagram,
        facebook,
        doc,
        adoptionForm,
        sponsorshipForm,
        temporaryHomeForm,
        claimForm,
      });
    
      console.log("Tentando atualizar user: ", user?._id);
      await userService.update(user._id, {
        name,
        email: initialData.email,
      });

      showToast({
        success: true,
        message: "Dados atualizados!",
        description: "Informações da ONG atualizadas com sucesso."
      });

      if(onClose)
        onClose();

    } catch (err) {


      if (err instanceof AxiosError && err.response) {
        setErrorMessage(err.response.data.message || 'Erro ao atualizar.');
        showToast({
          success: false,
          message: "Erro ao atualizar ONG",
          description: err.response.data.message || 'Tente novamente mais tarde.'
        });

      } else {
        setErrorMessage('Erro de conexão. Tente novamente mais tarde.');
        showToast({
          success: false,
          message: "Erro de conexão",
          description: "Tente novamente mais tarde."
        });
      }
    }
  };

  return (
    <>
    <Container>
      <ContentContainer>
        <TopBar>
          <h1>Editar Informações da ONG</h1>
          <div style={{ transform: "scale(1.5)", display: "flex" }}>
             <CloseButton themeMode="dark" onClick={onClose} />
          </div>
        </TopBar>

        {errorMessage && <div style={{ color: "red", marginBottom: "16px", fontWeight: "bold" }}>{errorMessage}</div>}
          
        {/* INFORMAÇÕES GERAIS */}
        <InputsContainer>
          <h2>Informações da ONG</h2>
          
          <BasicInput
            title="Nome da ONG"
            required={true}
            placeholder="Insira o nome da ONG"
            value={name}
            $fontSize="16px"
            $width="100%"
            onChange={(e) => {
               setName(e.target.value);
               if(nameError) { setNameError(false); setNameErrorMessage(''); }
            }}
            error={nameError}
            errorMessage={nameErrorMessage}
          />

          <BasicInput
            title="E-mail"
            required={true}
            placeholder="Insira o email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); verifyEmail(e.target.value); }}
            $fontSize="16px"
            $width="100%"
            error={emailError}
            errorMessage={emailErrorMessage}
            disabled={true}
          />

          <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "15px" }}>
            <PrimarySecondaryButton
                buttonType="Secundário"
                content="Trocar Senha"
                paddingV="8px"
                paddingH="25px"
                onClick={(e : React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  setOpenChangePasswordModal(true)}
                } 
            />
          </div>

          <BasicInput
            title="CPF/CNPJ"
            required={true}
            placeholder="Insira o CPF/CNPJ"
            value={doc}
            $fontSize="16px"
            $width="100%"
            onChange={(e) => {
                setDoc(e.target.value);
                if(docError) { setDocError(false); setDocErrorMessage(''); }
            }}
            error={docError}
            errorMessage={docErrorMessage}
          />

          <LargeInputField
            title="Descrição (Opcional)"
            required={false}
            $fontSize="16px"
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
        </InputsContainer>

        {/* CONTATO */}
        <InputsContainer>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
             <h2>Contato <span style={{color: "#F17D6E"}}>*</span></h2>
             {/* Mensagem de erro do grupo de contato */}
             {contactError && (
                <span style={{ color: '#FF3B30', fontSize: '0.9rem' }}>
                   Preencha ao menos um dos campos abaixo
                </span>
             )}
          </div>

          <BasicInput
            title="Número para Contato (Opcional)"
            required={false}
            placeholder="Insira o contato da ONG"
            value={phone}
            $fontSize="16px"
            $width="100%"
            onChange={(e) => { setPhone(e.target.value); setContactError(false); }}
            error={contactError}
          />

          <BasicInput
            title="Link do Instagram"
            required={false}
            placeholder="Insira o link aqui"
            value={instagram}
            $fontSize="16px"
            $width="100%"
            onChange={(e) => { setInstagram(e.target.value); setContactError(false); }}
            error={contactError}
          />

          <BasicInput
            title="Link do Facebook (Opcional)"
            required={false}
            placeholder="Insira o link aqui"
            value={facebook}
            $fontSize="16px"
            $width="100%"
            onChange={(e) => { setFacebook(e.target.value); setContactError(false); }}
            error={contactError}
          />

          <BasicInput
            title="Cidade (Opcional)"
            required={false}
            placeholder="Insira a cidade"
            value={city}
            $fontSize="16px"
            $width="100%"
            onChange={(e) => setCity(e.target.value)}
          />

            <SearchBar
                title="Estado"
                required={true}
                placeholder="Selecione o estado"
                query={state}
                setQuery={(selectedState: string) => {
                    setState(selectedState);
                    if(selectedState) setStateError(false);
                }}
                fontSize="16px"
                width="100%"
                error={stateError}
                errorMessage="Estado é obrigatório"
                options={["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]}
            />

          <BasicInput
            title="Link do WebSite (Opcional)"
            required={false}
            placeholder="Insira o link aqui"
            value={website}
            $fontSize="16px"
            $width="100%"
            onChange={(e) => setWebsite(e.target.value)}
          />
        </InputsContainer>

        {/* FORMULÁRIOS */}
        <InputsContainer>
          <h2>Formulários</h2>
          <BasicInput
            title="Formulário de Adoção"
            required={true}
            placeholder="Insira o link aqui"
            value={adoptionForm}
            $fontSize="16px"
            $width="100%"
            onChange={(e) => {
                setAdoptionForm(e.target.value);
                if(adoptionFormError) { setAdoptionFormError(false); setAdoptionFormErrorMessage(''); }
            }}
            error={adoptionFormError}
            errorMessage={adoptionFormErrorMessage}
          />

          <BasicInput
            title="Formulário de Apadrinhamento (Opcional)"
            required={false}
            placeholder="Insira o link aqui"
            value={sponsorshipForm}
            $fontSize="16px"
            $width="100%"
            onChange={(e) => setSponsorshipForm(e.target.value)}
          />

          <BasicInput
            title="Formulário de Lar Temporário (Opcional)"
            required={false}
            placeholder="Insira o link aqui"
            value={temporaryHomeForm}
            $fontSize="16px"
            $width="100%"
            onChange={(e) => setTemporaryHomeForm(e.target.value)}
          />

          <BasicInput
            title="Formulário de Reivindicação (Opcional)"
            required={false}
            placeholder="Insira o link aqui"
            value={claimForm}
            $fontSize="16px"
            $width="100%"
            onChange={(e) => setClaimForm(e.target.value)}
          />
        </InputsContainer>
        
        <ButtonGroup>
          <ButtonWrapper>
            <PrimarySecondaryButton
              buttonType="Secundário"
                content="Cancelar"
                onClick={onClose}
                paddingV="8px"
                paddingH="25px"
              /> 
            
            <UpdateButton>
              <PrimarySecondaryButton
              buttonType="Primário"
                content="Salvar Informações"
                onClick={handleUpdate}
                paddingV="8px"
                paddingH="25px"
              /> 
            </UpdateButton>
          </ButtonWrapper>
        </ButtonGroup>

      </ContentContainer>
    </Container>

    <ConfirmModal 
        isOpen={openChangePasswordModal} 
        title={"Tem certeza que deseja trocar sua senha?"} 
        message={"Você será deslogado e redirecionado para a página de troca de senha."} 
        onConfirm={handleChangePassword} onClose={() => setOpenChangePasswordModal(false)} />

    </>
  );
};

export default ManageNGOInfoForm;