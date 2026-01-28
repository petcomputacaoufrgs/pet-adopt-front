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



const ManageInfo: React.FC = () => {
  
  const { isLoading, user, isLoggedIn} = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
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
  /*const [nameError, setNameError] = useState(false);*/


 
      
  useEffect(() => {
    if (!user) return;

    setName(user.name || '');
    setEmail(user.email || '');
    setRole(user.role || '');
  }, [user]);



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
    if(!user) return;
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (role ==='NGO_MEMBER' && (!name || !email || !password || !confirmPassword)) {
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
      await userService.update(user?.id, {
        name,
        email,
        password,
        confirmPassword,
        role,
      });
      user.name = name;
      user.email = email;
      
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
      if (err instanceof AxiosError && err.response) {
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


  function Divider() {
    return <div style={{ height: '1px', width: '100%', backgroundColor: 'rgba(188, 175, 169, 1)', margin: '1em 0' }} />;
  }



  if(isLoading)
    return null;

  return (
    <>   
        
         {showToast && (
          <SuccessToast
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
                $readOnly={role ==="admin3"?false:true}
              />
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
                <Divider />
                <UpdateButton><PrimarySecondaryButton /*type="submit"*/ buttonType="Primário" content="Salvar Informações" onClick={handleUpdate} /></UpdateButton>
            </ContentContainer>
              
            </Container>
        <Footer />
    </>
  );
}
export default ManageInfo