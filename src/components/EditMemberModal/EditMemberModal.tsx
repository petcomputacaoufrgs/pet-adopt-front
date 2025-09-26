import { useState, useRef, useEffect } from "react";
import axios from "axios";
import HorizontalLogo from "../../assets/HorizontalLogo.png"

import Header from "../Header";
import Footer from "../../views/HomePage/6Footer";
import BasicInput from "../BasicInput";
import PasswordInput from "../PasswordInput";
import PrimarySecondaryButton from "../PrimarySecondaryButton";
import Toast from "../Toast";
import { User } from "../../types/user";
import CloseButton from "../CloseButton";

import {
    Container,
    ContentContainer,
    UpdateButton,
    ButtonWrapper,
    TopBar
} from "./styles"


interface EditMemberModalProps {
  member: User;
  onClose: () => void;
  onSave: (updatedMember: User) => void;
}


const EditMemberModal: React.FC<EditMemberModalProps> = ({ member, onClose, onSave }) => {
  
  const [role, setRole] = useState('membro');
  const [name, setName] = useState(member.name);
  const [email, setEmail] = useState(member.email);
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(false);
  /*const [nameError, setNameError] = useState(false);*/



  const handleSave = () => {
    onSave({ ...member, name, email });
    onClose();
  };

  useEffect(() => {
    setName(member.name);
    setEmail(member.email);
  }, [member]);

  //Mensagem de Sucesso
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fullCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [toastType, setToastType] = useState<"aprovar" | "recusar" | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);


      // Fecha toast com animação
  const resetToast = () => {
    setToastVisible(false);

    if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    if (fullCloseTimeoutRef.current) clearTimeout(fullCloseTimeoutRef.current);

    setShowToast(false);
    setToastType(null);
  };



  const handleUpdate = async (e: React.FormEvent) => {

    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (role ==='membro' && (!name || !email)) {
      setError(true);
      setErrorMessage('Preencha todos campos obrigatórios');
      return;
    }

    try {
      await axios.post('http://localhost:3002/api/v1/auth/manageInfo', {
        name,
        email,
        role,
      });

      setSuccessMessage('Informações atualizadas com sucesso!');
      resetToast();
      setShowToast(true);
      showTimeoutRef.current = setTimeout(() => setToastVisible(true), 50);
      hideTimeoutRef.current = setTimeout(() => setToastVisible(false), 3000);
      fullCloseTimeoutRef.current = setTimeout(() => {
        setShowToast(false);
        setToastType(null);
      }, 3500);
      
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err) && err.response) {
        setErrorMessage(err.response.data.message || 'Erro no cadastro. Tente novamente.');
      } else {
        setErrorMessage('Erro de conexão. Tente novamente mais tarde.');
      }
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
  const headerOptions = [
      "Gerenciar Animais", 
      "Cadastrar Pet", 
      "Gerenciar Ongs", 
      "Validar Ongs",
    ];

  const handleHeaderAction = (selected: string) => {
    // Ação a ser definida
  };

  function Divider() {
    return <div style={{ height: '1px', width: '100%', backgroundColor: 'rgba(188, 175, 169, 1)', margin: '1em 0' }} />;
  }


  return (
    <>
        <Header 
            options={headerOptions} 
            optionsToAction={handleHeaderAction} 
            color="#FFF6E8"
            Logo={HorizontalLogo}
        />      
        
         {showToast && (
          <Toast
            message= "Dados atualizados!"
            description= "Informações atualizadas com sucesso."
            onClose={() => {
              setToastVisible(false);
              setTimeout(() => setShowToast(false), 300);
            }}
            isVisible={toastVisible}
          />
        )}


            <Container onSubmit={handleUpdate}>
                <ContentContainer>
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
                    <TopBar>
                      <h1>Editar informações de {member.name}</h1>
                      <CloseButton themeMode="dark" onClick={onClose} />
                    </TopBar>
                    <BasicInput
                        title= "Nome"
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
                    <Divider />
                    <ButtonWrapper>
                      <PrimarySecondaryButton /*type="submit"*/ buttonType="Secondário" paddingH="25px" paddingV="10px" content="Cancelar" onClick={onClose} />
                     <UpdateButton><PrimarySecondaryButton /*type="submit"*/ buttonType="Primário" paddingH="20px" paddingV="10px" content="Salvar Informações" onClick={handleUpdate} /></UpdateButton>    
                    </ButtonWrapper>
                  </ContentContainer>
            </Container>
        <Footer />
    </>
  );
}
export default EditMemberModal

