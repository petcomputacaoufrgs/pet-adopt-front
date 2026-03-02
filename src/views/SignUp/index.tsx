import { useState, useEffect } from "react";
import { useLoaderData, useNavigate, useFetcher } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { isCPF, isCNPJ } from "validation-br";

// Componentes Visuais
import { Container, SignUpContainer, SignUpFormContainer, SignUpForm, SignUpFormTextContainer, SignUpFormInputsContainer, SignUpFormLinksContainer, ModalOverlay, ModalContent } from "./styles";
import PrimarySecondaryButton from "../../components/PrimarySecondaryButton";
import BasicInput from "../../components/BasicInput";
import PasswordInput from "../../components/PasswordInput";
import ActionText from "../../components/ActionText";
import SearchBar from "../../components/SearchBar";
import SignUpToggle from "../../components/SignUpToggle";
import LargeInputField from "../../components/LargeInput";
import LoginDog from "../../assets/LoginDog.png";

// Limites e Helpers
import { MAX_EMAIL_LENGTH, MAX_FORM_LINK_LENGTH, MAX_MEMBER_NAME_LENGTH, MAX_NGO_NAME_LENGTH, MAX_PASSWORD_LENGTH, MAX_PHONE_LENGTH, MAX_SOCIAL_LINK_LENGTH } from "../../constants/formsFieldsLimits";
import { getTextRules, getEmailRules } from "../../services/helpers/validationRules";
import { validatePassword } from "../../services/helpers/passwordValidation";

const SignUp: React.FC = () => {
  // 1. DADOS DO LOADER
  const ngoOptions = useLoaderData() as { id: string; label: string }[];
  
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state !== "idle";

  // 2. CONFIGURAÇÃO DO REACT-HOOK-FORM
  const { control, handleSubmit, watch, setError, formState: { errors } } = useForm({
    defaultValues: { role: 'membro', name: '', email: '', password: '', confirmPassword: '', ngoSearchText: '', doc: '', description: '', phone: '', city: '', state: '', website: '', instagram: '', facebook: '', adoptionForm: '', sponsorshipForm: '', temporaryHomeForm: '', claimForm: '' }
  });

  const role = watch("role"); // Observa se é membro ou ong
  const password = watch("password"); // Necessário para comparar a confirmação da senha

  // 3. ESTADOS DO MODAL (Mantivemos pois é de UI)
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error'>('success');
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const openModal = (type: 'success' | 'error', title: string, message: string) => {
    setModalType(type); setModalTitle(title); setModalMessage(message); setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    if (modalType === 'success') navigate('/');
  };

  // 4. EFEITO DO FETCHER (Escuta a resposta do backend)
  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data) {
      if (fetcher.data.success) {
        console.log("Sucesso recebido do backend:", fetcher.data.message);
        openModal('success', role === 'membro' ? 'Cadastro Realizado!' : 'Solicitação Enviada!', fetcher.data.message);
      } else if (fetcher.data.error) {
        console.log("Erro recebido do backend:", fetcher.data.error);
        openModal('error', 'Algo deu errado', fetcher.data.error);
      }
    }
  }, [fetcher.state, fetcher.data, role]);

  // 5. SUBMIT
  const onSubmit = (data: any) => {

    // Validação Manual do Grupo de Contato (se for ONG)
    if (role === 'ong' && !data.phone && !data.instagram && !data.facebook) {
      setError("phone", { type: "manual", message: "Preencha ao menos um contato (Telefone, Instagram ou Facebook)" });
      setError("instagram", { type: "manual", message: "Preencha ao menos um contato (Telefone, Instagram ou Facebook)" });
      setError("facebook", { type: "manual", message: "Preencha ao menos um contato (Telefone, Instagram ou Facebook)" });
      openModal('error', 'Atenção', 'Preencha ao menos um contato (Telefone, Instagram ou Facebook)');
      return;
    }

    // Pega o ID da ONG pelo texto do SearchBar
    const selectedNgo = ngoOptions.find(ngo => ngo.label === data.ngoSearchText);
    if (role === 'membro' && !selectedNgo) {
      setError("ngoSearchText", { type: "manual", message: "Selecione uma ONG válida da lista" });
      openModal('error', 'Atenção', 'Selecione uma ONG válida da lista');
      return;
    }

    // Dispara para a Action
    const payload = { intent: role === "membro" ? "signup_member" : "signup_ngo", ngoId: selectedNgo?.id, ...data };
    fetcher.submit(payload, { method: "post", encType: "application/json", action: "/signup" });
  };


  const onInvalidSubmit = (errors: any) => {
    console.log("Erros pegos pelo react-hook-form:", errors); // Útil para você debugar!
    openModal('error', 'Atenção', 'Verifique os erros nos campos destacados e tente novamente.');
  };




    const [windowSize, setWindowSize] = useState(window.innerWidth);
  useEffect(() => {
      const handleResize = () => setWindowSize(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
  }, []);



  const validStates = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];



  return (
    <Container>

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


      <SignUpContainer>

        {/* IMAGEM DO CACHORRO NO LADO ESQUERDO DA TELA */}
        {windowSize >= 1200 &&
          <div style={{maxWidth: "732.95px", backgroundImage: `url(${LoginDog})`, width: "43%", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover"}}></div>
        } 

        {/* FORMULÁRIO DE CADASTRO */}
        <SignUpFormContainer role={role}>
          <SignUpForm onSubmit={handleSubmit(onSubmit)} role={role}>
            
            <Controller name="role" control={control} render={({ field }) => (
                <SignUpToggle selected={field.value} onSelect={field.onChange} />
            )} />

            <SignUpFormTextContainer>
              <h1>Cadastro de {role === 'membro' ? 'Membro' : 'ONG'} </h1>
            </SignUpFormTextContainer>
            
            <SignUpFormInputsContainer>
              {role === 'ong' && <h2>Informações da ONG</h2>}

              <Controller
                name="name"
                control={control}
                rules={getTextRules(role === 'ong' ? 'Nome da ONG' : 'Nome', role === 'ong' ? MAX_NGO_NAME_LENGTH : MAX_MEMBER_NAME_LENGTH)}
                render={({ field, fieldState }) => (
                  <BasicInput 
                    {...field} 
                    title={role === 'ong' ? 'Nome da ONG' : 'Nome'} 
                    required 
                    placeholder="Insira seu nome aqui" 
                    $width="100%" error={!!fieldState.error} 
                    errorMessage={fieldState.error?.message} 
                    $fontSize="1rem"/>
                )}
              />

              <Controller
                name="email"
                control={control}
                rules={getEmailRules(MAX_EMAIL_LENGTH)}
                render={({ field, fieldState }) => (
                  <BasicInput 
                    {...field} 
                    title="E-mail" 
                    required 
                    placeholder="Insira seu email" 
                    $width="100%" 
                    error={!!fieldState.error} 
                    errorMessage={fieldState.error?.message}
                    $fontSize="1rem"/>
                )}
              />

              {role === 'ong' && (
                <Controller
                  name="doc"
                  control={control}
                  rules={{ 
                    required: "CPF/CNPJ é obrigatório",
                    validate: (value) => isCPF(value) || isCNPJ(value) || "Documento inválido"
                  }}
                  render={({ field, fieldState }) => (
                    <BasicInput 
                    {...field} 
                    title="CPF/CNPJ" 
                    required 
                    placeholder="Insira seu documento" 
                    $width="100%" 
                    error={!!fieldState.error} 
                    errorMessage={fieldState.error?.message}
                    $fontSize="1rem"/>
                  )}
                />
              )}

              <Controller
                name="password"
                control={control}
                rules={{ 
                  required: "Senha é obrigatória",
                  maxLength: { value: MAX_PASSWORD_LENGTH, message: `A senha deve ter no máximo ${MAX_PASSWORD_LENGTH} caracteres` },
                  validate: (value) => {
                    const result = validatePassword(value);
                    return result.isValid || result.errorMessage;
                  }
                }}
                render={({ field, fieldState }) => (
                  <PasswordInput 
                  {...field} 
                  title="Senha" 
                  required 
                  placeholder="Sua senha" 
                  $width="100%" 
                  error={!!fieldState.error} 
                  errorMessage={fieldState.error?.message} 
                  visible={false} 
                  $fontSize="1rem" 
                  isDisabled = {isSubmitting}/>
                )}
              />

              <Controller
                name="confirmPassword"
                control={control}
                rules={{ 
                  required: "Confirmação obrigatória",
                  validate: (value) => value === password || "As senhas não conferem"
                }}
                render={({ field, fieldState }) => (
                  <PasswordInput 
                  {...field} 
                  title="Confirmar Senha" 
                  required 
                  placeholder="Confirme sua senha" 
                  $width="100%" 
                  error={!!fieldState.error} 
                  errorMessage={fieldState.error?.message} 
                  visible={false}
                  $fontSize="1rem" 
                  isDisabled = {isSubmitting}/>
                )}
              />


              {role === 'ong' && (
                <>
                <Controller
                  name="description"
                  control={control}
                  rules={getTextRules("Descrição", 1000, false)}
                  render={({ field, fieldState }) => (
                    <LargeInputField
                        {...field}
                        title="Descrição (Opcional)"
                        required={false}
                        $fontSize="1rem"
                        placeholder="Escreva uma breve descrição aqui"
                        $width="100%"
                        visible={false}
                        isDisabled={false}
                        $inputType="Primário"
                        maxLength={1000}
                        error = {!!fieldState.error}
                        errorMessage={fieldState.error?.message}
                    />
                    )}
                />

                
                <Controller
                  name="city"
                  control={control}
                  rules={getTextRules("Cidade", 100, false)}
                  render={({ field, fieldState }) => (
                    <BasicInput
                      {...field}
                      title="Cidade (Opcional)"
                      required={false}
                      placeholder="Insira a cidade da sua ONG aqui"
                      value={field.value}
                      error={!!fieldState.error}
                      errorMessage={fieldState.error?.message}
                      $fontSize="1rem"
                      $width="100%"
                    />
                  )}
                />


                <Controller 
                    name="state"
                    control={control}
                    rules={{ 
                      validate: (value) => {
                        if (!value) return true; // Campo opcional
                        return validStates.includes(value) || "Estado inválido";
                      }
                    }}
                    render={({ field, fieldState }) => (
                        <SearchBar
                        title="Estado"
                        required
                        placeholder="Insira o estado sede da ONG aqui"
                        query={field.value}
                        setQuery={field.onChange}
                        options={validStates}
                        resetOption="Qualquer"
                        width="100%"
                        fontSize="16px"
                        listMaxHeight="200px"
                        error={!!fieldState.error}
                        errorMessage={fieldState.error?.message}
                        />
                    )}
                />


                <Controller
                  name="website"
                  control={control}
                  rules={getTextRules("Link do Website", 255, false)}
                  render={({ field }) => (
                    <BasicInput
                      {...field }
                      title="Link do WebSite (Opcional)"
                      required={false}
                      placeholder="Insira o link aqui"
                    $fontSize="1rem"
                    $width="100%"
                  />
                    )}
                />
                </>
              )}



              {role === 'membro' && (
                <Controller
                  name="ngoSearchText"
                  control={control}
                  rules={{ required: "Selecione uma ONG" }}
                  render={({ field, fieldState }) => (
                    <SearchBar 
                      {...field} 
                      query={field.value} 
                      setQuery={field.onChange} 
                      options={ngoOptions.map(n => n.label)} 
                      title="Selecione sua ONG" 
                      required 
                      resetOption="Limpar Seleção" 
                      width="100%" 
                      listMaxHeight="200px" 
                      error={!!fieldState.error} 
                      errorMessage={fieldState.error?.message} 
                      placeholder="Encontre e selecione sua ONG aqui" 
                      fontSize="1rem"
                    />
                  )}
                />
              )}

            </SignUpFormInputsContainer>

            {role === 'ong' && (
              <SignUpFormInputsContainer>
                <div>
                  <h2>Contato <span style={{color: "#F17D6E"}}>*</span></h2>
                  <p style={{ 
                      // Verifica se o erro manual do grupo de contatos foi disparado
                      color: (errors.phone?.type === 'manual' && errors.instagram?.type === 'manual' && errors.facebook?.type === 'manual') ? '#FF3B30' : 'inherit', 
                      fontWeight: errors.phone?.type === 'manual' ? 'bold' : 'normal' 
                  }}>
                    {(errors.phone?.type === 'manual' && errors.instagram?.type === 'manual' && errors.facebook?.type === 'manual') 
                      ? "ERRO: Preencha ao menos um campo abaixo" 
                      : "Preencha ao menos um dos campos abaixo"}
                  </p>
                </div>

                <Controller
                  name="phone"
                  control={control}
                  rules={getTextRules("Telefone", MAX_PHONE_LENGTH, false)}
                  render={({ field, fieldState }) => (
                    <BasicInput 
                      {...field} 
                      title="Número para Contato" 
                      required={false} 
                      placeholder="Insira o contato aqui" 
                      $width="100%" 
                      $fontSize="1rem" 
                      error={(!!fieldState.error && fieldState.error?.type !== 'manual') || (errors.phone?.type === 'manual' && errors.instagram?.type === 'manual' && errors.facebook?.type === 'manual')} // Fica vermelho se der erro na validação ou na regra de grupo
                      errorMessage={fieldState.error?.type !== 'manual' ? fieldState.error?.message : undefined}
                    />
                  )}
                />

                <Controller
                  name="instagram"
                  control={control}
                  rules={getTextRules("Instagram", MAX_SOCIAL_LINK_LENGTH, false)}
                  render={({ field, fieldState }) => (
                    <BasicInput 
                      {...field} 
                      title="Link do Instagram" 
                      required={false} 
                      placeholder="Insira o link aqui" 
                      $width="100%" 
                      $fontSize="1rem" 
                      error={(!!fieldState.error && fieldState.error?.type !== 'manual') || (errors.instagram?.type === 'manual' && errors.phone?.type === 'manual' && errors.facebook?.type === 'manual')} // Fica vermelho se der erro na validação ou se for o erro manual do grupo e o telefone não tiver sido o campo que causou o erro
                      errorMessage={fieldState.error?.type !== 'manual' ? fieldState.error?.message : undefined}

                    />
                  )}
                />

                <Controller
                  name="facebook"
                  control={control}
                  rules={getTextRules("Facebook", MAX_SOCIAL_LINK_LENGTH, false)}
                  render={({ field, fieldState }) => (
                    <BasicInput 
                      {...field} 
                      title="Link do Facebook" 
                      required={false} 
                      placeholder="Insira o link aqui" 
                      $width="100%" 
                      $fontSize="1rem" 
                      error={(!!fieldState.error && fieldState.error?.type !== 'manual') || (errors.facebook?.type === 'manual' && errors.phone?.type === 'manual' && errors.instagram?.type === 'manual')} // Fica vermelho se der erro na validação ou se for o erro manual do grupo e o telefone não tiver sido o campo que causou o erro
                      errorMessage={fieldState.error?.type !== 'manual' ? fieldState.error?.message : undefined}
                    />
                  )}
                />
              </SignUpFormInputsContainer>
            )}

            {role === 'ong' && (
              <SignUpFormInputsContainer>
                <h2>Formulários</h2>
                
                <Controller
                  name="adoptionForm"
                  control={control}
                  rules={getTextRules("Formulário de Adoção", MAX_FORM_LINK_LENGTH, true)} // True = Obrigatório!
                  render={({ field, fieldState }) => (
                    <BasicInput 
                      {...field} 
                      title="Formulario de Adoção" 
                      required={true} 
                      placeholder="Insira o link aqui" 
                      $width="100%" 
                      $fontSize="1rem" 
                      error={!!fieldState.error} 
                      errorMessage={fieldState.error?.message} 
                    />
                  )}
                />

                <Controller
                  name="sponsorshipForm"
                  control={control}
                  rules={getTextRules("Formulário de Apadrinhamento", MAX_FORM_LINK_LENGTH, false)}
                  render={({ field, fieldState }) => (
                    <BasicInput 
                      {...field} 
                      title="Formulario de Apadrinhamento (Opcional)" 
                      required={false} 
                      placeholder="Insira o link aqui" 
                      $width="100%" 
                      $fontSize="1rem" 
                      error={!!fieldState.error} 
                      errorMessage={fieldState.error?.message} 
                    />
                  )}
                />

                <Controller
                  name="temporaryHomeForm"
                  control={control}
                  rules={getTextRules("Formulário de Lar Temporário", MAX_FORM_LINK_LENGTH, false)}
                  render={({ field, fieldState }) => (
                    <BasicInput 
                      {...field} 
                      title="Formulario de Lar Temporário (Opcional)" 
                      required={false} 
                      placeholder="Insira o link aqui" 
                      $width="100%" 
                      $fontSize="1rem" 
                      error={!!fieldState.error} 
                      errorMessage={fieldState.error?.message} 
                    />
                  )}
                />

                <Controller
                  name="claimForm"
                  control={control}
                  rules={getTextRules("Formulário de Reivindicação", MAX_FORM_LINK_LENGTH, false)}
                  render={({ field, fieldState }) => (
                    <BasicInput 
                      {...field} 
                      title="Formulario de Reivindicação (Opcional)" 
                      required={false} 
                      placeholder="Insira o link aqui" 
                      $width="100%" 
                      $fontSize="1rem" 
                      error={!!fieldState.error} 
                      errorMessage={fieldState.error?.message} 
                    />
                  )}
                />
              </SignUpFormInputsContainer>
            )}


            
            <SignUpFormLinksContainer>
              <PrimarySecondaryButton 
                  width="100%" buttonType="Primário" content={isSubmitting ? "Enviando..." : "Criar Conta"} onClick={handleSubmit(onSubmit, onInvalidSubmit)} isDisabled={isSubmitting} paddingH="5px" paddingV="10px"
              />
              <ActionText width="100%" fontSize="1rem" textColor="#553525" onClick={(e) => { e.preventDefault(); navigate("/login"); }}>
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