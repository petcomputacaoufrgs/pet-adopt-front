import { useState, useRef, useEffect } from "react";
import { userService } from "../../services";
import { AxiosError } from "axios";
import HorizontalLogo from "../../assets/HorizontalLogo.png"

import Header from "../../components/Header";
import Footer from "../HomePage/6Footer";
import BasicInput from "../../components/BasicInput";
import PasswordInput from "../../components/PasswordInput";
import PrimarySecondaryButton from "../../components/PrimarySecondaryButton";
import SuccessToast from "../../components/Toast";
import {
    Container,
    ContentContainer,
    UpdateButton
} from "./styles"
import { useAuth } from "../../hooks/useAuth";
import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import ConfirmModal from "../../components/ConfirmModal";
import { useToast } from "../../contexts/ToastContext";



const ManageInfo: React.FC = () => {
  
  const { user } = useRouteLoaderData("root") as { user: any };

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [role, setRole] = useState(user?.role || '');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(false);
  /*const [nameError, setNameError] = useState(false);*/



  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
  const { logout } = useAuth();

  const { showToast } = useToast();




  const handleUpdate = async (e: React.FormEvent) => {
    if(!user) return;
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (role ==='NGO_MEMBER' && (!name || !email)) {
      setError(true);
      setErrorMessage('Preencha todos campos obrigatórios');
      return;
    }

    if (emailError) {
      setError(true);
      setErrorMessage('Verifique os campos preenchidos');
      return;
    }

    const userId = user._id || user.id; // Tenta ambos os formatos de ID

    try {
      const newUser = await userService.update(userId, {
        name,
        email,
        role,
      });


      setSuccessMessage('Informações atualizadas com sucesso!');

      showToast({
        success: true,
        message: "Dados atualizados!",
        description: "Informações atualizadas com sucesso."
      })

      window.location.reload();

    } catch (err) {
      console.error(err);
      if (err instanceof AxiosError && err.response) {
        setErrorMessage(err.response.data.message || 'Erro no cadastro. Tente novamente.');

        showToast({
          success: false,
          message: "Erro ao atualizar dados",
          description: err.response.data.message || 'Erro no cadastro. Tente novamente.'
        })

      } else {
        setErrorMessage('Erro de conexão. Tente novamente mais tarde.');
        showToast({
          success: false,
          message: "Erro ao atualizar dados",
          description: 'Erro de conexão. Tente novamente mais tarde.'
        })
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


  const handleChangePassword = async () => {
    logout(false);
    window.location.href = '/forgotPassword';
  };




  function Divider() {
    return <div style={{ height: '1px', width: '100%', backgroundColor: 'rgba(188, 175, 169, 1)', margin: '1em 0' }} />;
  }


  return (
    <>   
      
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
                <h1>Gerencie suas informações pessoais</h1>
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
                placeholder="Seu email aqui"
                value={email}
                      onChange={(e) => {
                    setEmail(e.target.value);
                    verifyEmail(e.target.value);
                  } }
                $fontSize="1rem"
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

                <Divider />
                <UpdateButton><PrimarySecondaryButton buttonType="Primário" content="Salvar Informações" onClick={handleUpdate} paddingH="25px" paddingV="8px"/></UpdateButton>
            </ContentContainer>
              
            <ConfirmModal 
                isOpen={openChangePasswordModal} 
                title={"Tem certeza que deseja trocar sua senha?"} 
                message={"Você será deslogado e redirecionado para a página de troca de senha."} 
                onConfirm={handleChangePassword} onClose={() => setOpenChangePasswordModal(false)} />
                  
            </Container>
        <Footer />
    </>
  );
}
export default ManageInfo
