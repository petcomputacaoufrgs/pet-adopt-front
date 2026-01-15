import React, { useState, useRef, useEffect } from "react";
import { AxiosError } from "axios";
import { ngoService, authService } from "../../services";
import BasicInput from "../BasicInput";
import PasswordInput from "../PasswordInput";
import PrimarySecondaryButton from "../PrimarySecondaryButton";
import SuccessToast from "../Toast";
import LargeInputField from "../LargeInput";
import { Container, ContentContainer, UpdateButton, TopBar, InputsContainer, ButtonGroup, ButtonWrapper } from "./styles";
import { useAuth } from "../../hooks/useAuth";
import CloseButton from "../CloseButton";


type Props = { ngoId: string; onClose?: () => void };

const ManageNGOInfoForm: React.FC<Props> = ({ ngoId, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [website, setWebsite] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [doc, setDoc] = useState('');
  const [adoptionForm, setAdoptionForm] = useState('');
  const [sponsorshipForm, setSponsorshipForm] = useState('');
  const [temporaryHomeForm, setTemporaryHomeForm] = useState('');
  const [claimForm, setClaimForm] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fullCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { user, isLoggedIn } = useAuth();

  // Buscar dados da ONG ao abrir o modal
  useEffect(() => {
    const fetchNgoData = async () => {
      try {
        const response = await ngoService.getById(ngoId);
        setName(response.data.name || '');
        setEmail(response.data.email || '');
        setDescription(response.data.description || '');
        setPhone(response.data.phone || '');
        setCity(response.data.city || '');
        setWebsite(response.data.website || '');
        setInstagram(response.data.instagram || '');
        setFacebook(response.data.facebook || '');
        setDoc(response.data.document || '');
        setAdoptionForm(response.data.adoptionForm || '');
        setSponsorshipForm(response.data.sponsorshipForm || '');
        setTemporaryHomeForm(response.data.temporaryHomeForm || '');
        setClaimForm(response.data.claimForm || '');
      } catch (err) {
        setErrorMessage('Erro ao carregar dados da ONG');
      }
    };

    fetchNgoData();
  }, [ngoId]);

  const resetToast = () => {
    setToastVisible(false);
    if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    if (fullCloseTimeoutRef.current) clearTimeout(fullCloseTimeoutRef.current);
    setShowToast(false);
  };

  const handleUpdate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage("");

    if (!name || !email || !instagram || !adoptionForm) {
      setErrorMessage('Preencha todos campos obrigatórios');
      return;
    }

    if (emailError) {
      setErrorMessage('Verifique os campos preenchidos');
      return;
    }

    try {
      await authService.updateNgo(ngoId, {
        name,
        email,
        description,
        phone,
        city,
        website,
        instagram,
        facebook,
        document: doc,
        adoptionForm,
        sponsorshipForm,
        temporaryHomeForm,
        claimForm,
      });

      resetToast();
      setShowToast(true);
      showTimeoutRef.current = setTimeout(() => setToastVisible(true), 50);
      hideTimeoutRef.current = setTimeout(() => setToastVisible(false), 3000);
      fullCloseTimeoutRef.current = setTimeout(() => {
        setShowToast(false);
      }, 3500);
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        setErrorMessage(err.response.data.message || 'Erro ao atualizar. Tente novamente.');
      } else {
        setErrorMessage('Erro de conexão. Tente novamente mais tarde.');
      }
    }
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


  return (
    <Container>
      {showToast && (
        <SuccessToast
          message="Dados atualizados!"
          description="Informações da ONG atualizadas com sucesso."
          onClose={() => { setToastVisible(false); setTimeout(() => setShowToast(false), 300); }}
          isVisible={toastVisible}
        />
      )}
      <ContentContainer>
        <TopBar>
          <h1>Editar Informações da ONG</h1>
          <CloseButton themeMode="dark" onClick={onClose} />
        </TopBar>

        {errorMessage && <div style={{ color: "red", marginBottom: "1rem" }}>{errorMessage}</div>}
          
        <InputsContainer>
          <h2>Informações da ONG</h2>
          <BasicInput
            title="Nome da ONG"
            required={true}
            placeholder="Insira o nome da ONG"
            value={name}
            $fontSize="1rem"
            $width="100%"
            onChange={(e) => setName(e.target.value)}
          />

          <BasicInput
            title="E-mail"
            required={true}
            placeholder="Insira o email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); verifyEmail(e.target.value); }}
            $fontSize="1rem"
            $width="100%"
            error={emailError}
            errorMessage={emailErrorMessage}
          />

          <BasicInput
            title="CPF/CNPJ"
            required={false}
            placeholder="Insira o CPF/CNPJ"
            value={doc}
            $fontSize="1rem"
            $width="100%"
            onChange={(e) => setDoc(e.target.value)}
          />

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
        </InputsContainer>

          <h2>Contato</h2>
          <InputsContainer>
          <BasicInput
            title="Número para Contato (Opcional)"
            required={false}
            placeholder="Insira o contato da ONG"
            value={phone}
            $fontSize="1rem"
            $width="100%"
            onChange={(e) => setPhone(e.target.value)}
          />

          <BasicInput
            title="Cidade (Opcional)"
            required={false}
            placeholder="Insira a cidade"
            value={city}
            $fontSize="1rem"
            $width="100%"
            onChange={(e) => setCity(e.target.value)}
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

          <BasicInput
            title="Link do Instagram"
            required={true}
            placeholder="Insira o link aqui"
            value={instagram}
            $fontSize="1rem"
            $width="100%"
            onChange={(e) => setInstagram(e.target.value)}
          />

          <BasicInput
            title="Link do Facebook (Opcional)"
            required={false}
            placeholder="Insira o link aqui"
            value={facebook}
            $fontSize="1rem"
            $width="100%"
            onChange={(e) => setFacebook(e.target.value)}
          />
        </InputsContainer>

        <InputsContainer>
          <h2>Formulários</h2>
          <BasicInput
            title="Formulário de Adoção"
            required={true}
            placeholder="Insira o link aqui"
            value={adoptionForm}
            $fontSize="1rem"
            $width="100%"
            onChange={(e) => setAdoptionForm(e.target.value)}
          />

          <BasicInput
            title="Formulário de Apadrinhamento (Opcional)"
            required={false}
            placeholder="Insira o link aqui"
            value={sponsorshipForm}
            $fontSize="1rem"
            $width="100%"
            onChange={(e) => setSponsorshipForm(e.target.value)}
          />

          <BasicInput
            title="Formulário de Lar Temporário (Opcional)"
            required={false}
            placeholder="Insira o link aqui"
            value={temporaryHomeForm}
            $fontSize="1rem"
            $width="100%"
            onChange={(e) => setTemporaryHomeForm(e.target.value)}
          />

          <BasicInput
            title="Formulário de Reivindicação (Opcional)"
            required={false}
            placeholder="Insira o link aqui"
            value={claimForm}
            $fontSize="1rem"
            $width="100%"
            onChange={(e) => setClaimForm(e.target.value)}
          />
        </InputsContainer>

        <div style={{ height: '1px', width: '100%', backgroundColor: 'rgba(188, 175, 169, 1)', margin: '1.5em 0' }} />
        <ButtonGroup>
          <ButtonWrapper>
            <PrimarySecondaryButton
              buttonType="Secundário"
                content="Cancelar"
                onClick={onClose}
                width="100px"
              /> 
            
            <UpdateButton>
              <PrimarySecondaryButton
              buttonType="Primário"
                content="Salvar Informações"
                onClick={handleUpdate}
                width="180px"
              /> 
            </UpdateButton>
          </ButtonWrapper>
        </ButtonGroup>
      </ContentContainer>
    </Container>
  );
};

export default ManageNGOInfoForm;