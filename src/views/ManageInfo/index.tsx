import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouteLoaderData, useFetcher } from "react-router-dom"; // <--- Adicionado useFetcher
import { useToast } from "../../contexts/ToastContext";

import Footer from "../HomePage/6Footer";
import BasicInput from "../../components/BasicInput";
import PrimarySecondaryButton from "../../components/PrimarySecondaryButton";
import ConfirmModal from "../../components/ConfirmModal";
import {
    Container,
    ContentContainer,
    UpdateButton
} from "./styles"

const ManageInfo: React.FC = () => {
  const { user } = useRouteLoaderData("root") as { user: any };
  const { logout } = useAuth();
  const { showToast } = useToast();
  
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state !== "idle";

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);

  // Efeito para lidar com a resposta do backend
  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data) {
      if (fetcher.data.success) {
        showToast({
          success: true,
          message: "Dados atualizados!",
          description: "Informações atualizadas com sucesso."
        });

       fetcher.reset();

      } else if (fetcher.data.error) {
        showToast({
          success: false,
          message: "Erro ao atualizar dados",
          description: fetcher.data.error
        });

       fetcher.reset();
      }
    }
  }, [fetcher.state, fetcher.data]);


  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (user.role === 'NGO_MEMBER' && (!name || !email)) {
      showToast({ success: false, message: "Atenção", description: "Preencha todos os campos obrigatórios." });
      return;
    }

    if (emailError) {
      showToast({ success: false, message: "Atenção", description: "Verifique os campos preenchidos." });
      return;
    }

    // Dispara a requisição para a Action da rota
    const payload = {
      intent: "update",
      id: user._id || user.id,
      name,
      email: user.email 
    };

    fetcher.submit(payload, { method: "post", encType: "application/json" });

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
    window.location.href = '/forgotPassword'; // Ou navigate('/forgotPassword')
  };

  function Divider() {
    return <div style={{ height: '1px', width: '100%', backgroundColor: 'rgba(188, 175, 169, 1)', margin: '1em 0' }} />;
  }

  return (
    <>   
      <Container as="form" onSubmit={handleUpdate}>
        <ContentContainer>
          
          {/* Mostra erro local se a Action retornar falha */}
          {fetcher.data?.error && (
            <div style={{ color: "red", fontWeight: "bold", marginBottom: "1rem" }}>
              {fetcher.data.error}
            </div>
          )}

          <h1>Gerencie suas informações pessoais</h1>
          
          <BasicInput
            title= "Nome"
            required={true} 
            placeholder="Insira seu nome aqui"
            value={name}
            $fontSize="1rem"
            $width="100%"
            onChange={(e) => setName(e.target.value)}
          />

          <BasicInput
            title="E-mail"
            required={true} 
            placeholder="Seu email aqui"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              verifyEmail(e.target.value);
            }}
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
                  setOpenChangePasswordModal(true)
                }} 
            />
          </div>

          <Divider />
          <UpdateButton>
            <PrimarySecondaryButton 
              buttonType="Primário" 
              content={isSubmitting ? "Salvando..." : "Salvar Informações"} 
              onClick={handleUpdate} 
              paddingH="25px" 
              paddingV="8px"
              isDisabled={isSubmitting} // Bloqueia spam de cliques
            />
          </UpdateButton>
        </ContentContainer>
          
        <ConfirmModal 
            isOpen={openChangePasswordModal} 
            title={"Tem certeza que deseja trocar sua senha?"} 
            message={"Você será deslogado e redirecionado para a página de troca de senha."} 
            onConfirm={handleChangePassword} onClose={() => setOpenChangePasswordModal(false)} 
        />
            
      </Container>
      <Footer />
    </>
  );
}

export default ManageInfo;