import React, { useState } from "react";
import { AxiosError } from "axios";
import { useForm, Controller } from "react-hook-form";
import { isCPF, isCNPJ } from "validation-br";

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

// Limites e Helpers de Validação
import { MAX_NGO_NAME_LENGTH, MAX_NGO_DESCRIPTION_LENGTH, MAX_PHONE_LENGTH, MAX_CITY_LENGTH, MAX_SOCIAL_LINK_LENGTH, MAX_FORM_LINK_LENGTH, MAX_EMAIL_LENGTH } from "../../constants/formsFieldsLimits";
import { getEmailRules, getTextRules } from "../../services/helpers/validationRules";

import type { User } from "../../types/user";

interface NGOInitialData {
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

// NGOData é o tipo que a gente usa no formulário
// A única diferença aqui é que todos os campos são obrigatórios para o react-hook-form
type NGOData = Required<NGOInitialData>;

type Props = { 
  initialData: NGOInitialData;
  user: User;
  onClose?: () => void 
};

const ManageNGOInfoForm: React.FC<Props> = ({ initialData, user, onClose }) => {
  const { logout } = useAuth();
  const { showToast } = useToast();
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. CONFIGURAÇÃO DO REACT-HOOK-FORM
  const { control, handleSubmit, setError, formState: { errors } } = useForm<NGOData>({
    defaultValues: {
      _id: initialData._id,
      name: initialData.name || '',
      email: initialData.email || '', // E-mail é apenas para leitura aqui
      description: initialData.description || '',
      phone: initialData.phone || '',
      city: initialData.city || '',
      state: initialData.state || '',
      website: initialData.website || '',
      instagram: initialData.instagram || '',
      facebook: initialData.facebook || '',
      doc: initialData.doc || '',
      adoptionForm: initialData.adoptionForm || '',
      sponsorshipForm: initialData.sponsorshipForm || '',
      temporaryHomeForm: initialData.temporaryHomeForm || '',
      claimForm: initialData.claimForm || '',
    }
  });

  // HANDLERS
  const handleChangePassword = async () => {
    logout(false);
    window.location.href = '/forgotPassword';
  };

  const onSubmit = async (data: NGOData) => {
    setErrorMessage("");

    // Validação Manual do Grupo de Contato
    if (!data.phone && !data.instagram && !data.facebook) {
      setError("phone", { type: "manual", message: "Preencha ao menos um contato (Telefone, Instagram ou Facebook)" });
      setErrorMessage('Verifique os campos destacados e tente novamente.');
      showToast({ success: false, message: "Erro de Validação", description: "Preencha os contatos obrigatórios." });
      return;
    }

    try {
      setIsSubmitting(true);

      data.state = data.state?.toUpperCase(); // Garante que o estado seja salvo em maiúsculo
      
      // Salva os dados da ONG
      await ngoService.update(initialData._id, data);
    
      // Atualiza os dados refletidos no User vinculado (Nome)
      await userService.update(user._id, {
        name: data.name,
        email: initialData.email, // Email não muda
      });

      showToast({ success: true, message: "Dados atualizados!", description: "Informações da ONG atualizadas com sucesso." });
      if(onClose) onClose();

    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        setErrorMessage(err.response.data.message || 'Erro ao atualizar.');
        showToast({ success: false, message: "Erro ao atualizar ONG", description: err.response.data.message || 'Tente novamente mais tarde.' });
      } else {
        setErrorMessage('Erro de conexão. Tente novamente mais tarde.');
        showToast({ success: false, message: "Erro de conexão", description: "Tente novamente mais tarde." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler caso o hook-form barre o submit antes mesmo de chegar na função onSubmit
  const onInvalidSubmit = () => {
    setErrorMessage('Verifique os campos destacados e tente novamente.');
    showToast({ success: false, message: "Erro de Validação", description: "Preencha os campos obrigatórios corretamente." });
  };


  const validStates = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

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
          
        {/* Usamos a tag form para envolver tudo e o handleSubmit processar */}
        <form onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}>
          
          {/* INFORMAÇÕES GERAIS */}
          <InputsContainer>
            <h2>Informações da ONG</h2>
            
            <Controller
              name="name"
              control={control}
              rules={getTextRules("Nome da ONG", MAX_NGO_NAME_LENGTH, true)}
              render={({ field, fieldState }) => (
                <BasicInput {...field} title="Nome da ONG" required placeholder="Insira o nome da ONG" $width="100%" $fontSize="16px" error={!!fieldState.error} errorMessage={fieldState.error?.message} maxLength={MAX_NGO_NAME_LENGTH} />
              )}
            />

            <Controller
              name="email"
              control={control}
              rules = { getEmailRules(MAX_EMAIL_LENGTH) }
              render={({ field }) => (
                <BasicInput {...field} title="E-mail" required placeholder="Insira o email" $width="100%" $fontSize="16px" disabled={true} />
              )}
            />

            <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "15px" }}>
              <PrimarySecondaryButton
                  buttonType="Secundário"
                  content="Trocar Senha"
                  paddingV="8px"
                  paddingH="25px"
                  onClick={(e : React.MouseEvent<HTMLButtonElement>) => { e.preventDefault(); setOpenChangePasswordModal(true); }} 
              />
            </div>

            <Controller
              name="doc"
              control={control}
              rules={{ 
                required: "CPF/CNPJ é obrigatório",
                validate: (value) => isCPF(value || '') || isCNPJ(value || '') || "Documento inválido"
              }}
              render={({ field, fieldState }) => (
                <BasicInput {...field} title="CPF/CNPJ" required placeholder="Insira o CPF/CNPJ" $width="100%" $fontSize="16px" error={!!fieldState.error} errorMessage={fieldState.error?.message} />
              )}
            />

            <Controller
              name="description"
              control={control}
              rules={getTextRules("Descrição", MAX_NGO_DESCRIPTION_LENGTH, false)}
              render={({ field, fieldState }) => (
                <LargeInputField {...field} title="Descrição (Opcional)" required={false} placeholder="Escreva uma breve descrição aqui" $width="100%" $fontSize="16px" $inputType="Primário" error={!!fieldState.error} errorMessage={fieldState.error?.message} maxLength={MAX_NGO_DESCRIPTION_LENGTH} visible={false} isDisabled={false}/>
              )}
            />
          </InputsContainer>

          {/* CONTATO */}
          <InputsContainer>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
               <h2>Contato <span style={{color: "#F17D6E"}}>*</span></h2>
               {errors.phone?.type === 'manual' && (
                  <span style={{ color: '#FF3B30', fontSize: '0.9rem', fontWeight: 'bold' }}>
                     Preencha ao menos um dos campos abaixo
                  </span>
               )}
            </div>

            <Controller
              name="phone"
              control={control}
              rules={getTextRules("Telefone", MAX_PHONE_LENGTH, false)}
              render={({ field, fieldState }) => (
                <BasicInput {...field} title="Número para Contato (Opcional)" required={false} placeholder="Insira o contato da ONG" $width="100%" $fontSize="16px" error={!!fieldState.error || errors.phone?.type === 'manual'} />
              )}
            />

            <Controller
              name="instagram"
              control={control}
              rules={getTextRules("Instagram", MAX_SOCIAL_LINK_LENGTH, false)}
              render={({ field, fieldState }) => (
                <BasicInput {...field} title="Link do Instagram (Opcional)" required={false} placeholder="Insira o link aqui" $width="100%" $fontSize="16px" error={!!fieldState.error || errors.phone?.type === 'manual'} />
              )}
            />

            <Controller
              name="facebook"
              control={control}
              rules={getTextRules("Facebook", MAX_SOCIAL_LINK_LENGTH, false)}
              render={({ field, fieldState }) => (
                <BasicInput {...field} title="Link do Facebook (Opcional)" required={false} placeholder="Insira o link aqui" $width="100%" $fontSize="16px" error={!!fieldState.error || errors.phone?.type === 'manual'} />
              )}
            />

            <Controller
              name="city"
              control={control}
              rules={getTextRules("Cidade", MAX_CITY_LENGTH, false)}
              render={({ field, fieldState }) => (
                <BasicInput {...field} title="Cidade (Opcional)" required={false} placeholder="Insira a cidade" $width="100%" $fontSize="16px" error={!!fieldState.error} errorMessage={fieldState.error?.message} maxLength={MAX_CITY_LENGTH} />
              )}
            />

            <Controller
              name="state"
              control={control}
              rules={{ required: "Estado é obrigatório",
                    validate: (value) => {
                    return validStates.includes(value) || "Estado inválido";
                    }        
               }}
              render={({ field, fieldState }) => (
                <SearchBar
                  query={field.value || ''}
                  setQuery={field.onChange}
                  title="Estado"
                  required={true}
                  placeholder="Selecione o estado"
                  fontSize="16px"
                  width="100%"
                  error={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                  options={["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]}
                />
              )}
            />

            <Controller
              name="website"
              control={control}
              rules={getTextRules("Link do Website", MAX_FORM_LINK_LENGTH, false)}
              render={({ field, fieldState }) => (
                <BasicInput {...field} title="Link do WebSite (Opcional)" required={false} placeholder="Insira o link aqui" $width="100%" $fontSize="16px" error={!!fieldState.error} errorMessage={fieldState.error?.message} />
              )}
            />
          </InputsContainer>

          {/* FORMULÁRIOS */}
          <InputsContainer>
            <h2>Formulários</h2>
            
            <Controller
              name="adoptionForm"
              control={control}
              rules={getTextRules("Formulário de Adoção", MAX_FORM_LINK_LENGTH, true)}
              render={({ field, fieldState }) => (
                <BasicInput {...field} title="Formulário de Adoção" required placeholder="Insira o link aqui" $width="100%" $fontSize="16px" error={!!fieldState.error} errorMessage={fieldState.error?.message} />
              )}
            />

            <Controller
              name="sponsorshipForm"
              control={control}
              rules={getTextRules("Formulário de Apadrinhamento", MAX_FORM_LINK_LENGTH, false)}
              render={({ field, fieldState }) => (
                <BasicInput {...field} title="Formulário de Apadrinhamento (Opcional)" required={false} placeholder="Insira o link aqui" $width="100%" $fontSize="16px" error={!!fieldState.error} errorMessage={fieldState.error?.message} />
              )}
            />

            <Controller
              name="temporaryHomeForm"
              control={control}
              rules={getTextRules("Formulário de Lar Temporário", MAX_FORM_LINK_LENGTH, false)}
              render={({ field, fieldState }) => (
                <BasicInput {...field} title="Formulário de Lar Temporário (Opcional)" required={false} placeholder="Insira o link aqui" $width="100%" $fontSize="16px" error={!!fieldState.error} errorMessage={fieldState.error?.message} />
              )}
            />

            <Controller
              name="claimForm"
              control={control}
              rules={getTextRules("Formulário de Reivindicação", MAX_FORM_LINK_LENGTH, false)}
              render={({ field, fieldState }) => (
                <BasicInput {...field} title="Formulário de Reivindicação (Opcional)" required={false} placeholder="Insira o link aqui" $width="100%" $fontSize="16px" error={!!fieldState.error} errorMessage={fieldState.error?.message} />
              )}
            />
          </InputsContainer>
          
          {/* BOTOES */}
          <ButtonGroup>
            <ButtonWrapper>
              <PrimarySecondaryButton
                  buttonType="Secundário"
                  content="Cancelar"
                  onClick={(e : React.MouseEvent<HTMLButtonElement>) => { e.preventDefault(); if(onClose) onClose(); }}
                  paddingV="8px"
                  paddingH="25px"
                  isDisabled={isSubmitting}
                /> 
              
              <UpdateButton>
                <PrimarySecondaryButton
                  buttonType="Primário"
                  content={isSubmitting ? "Salvando..." : "Salvar Informações"}
                  onClick={handleSubmit(onSubmit, onInvalidSubmit)}
                  paddingV="8px"
                  paddingH="25px"
                  isDisabled={isSubmitting}
                /> 
              </UpdateButton>
            </ButtonWrapper>
          </ButtonGroup>

        </form>
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