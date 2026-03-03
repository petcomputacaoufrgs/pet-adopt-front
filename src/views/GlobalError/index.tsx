import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";
import PrimarySecondaryButton from "../../components/PrimarySecondaryButton";
// import { Container, Textos } from "./styles";

export default function GlobalError() {
  const error = useRouteError();
  const navigate = useNavigate();

  let title = "Ops! Algo deu errado.";
  let message = "Ocorreu um erro inesperado no sistema. Tente novamente mais tarde.";

  // Se for um erro que nós mesmos "lançamos" (ex: 404 Not Found)
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "Página não encontrada";
      message = "O conteúdo que você tentou acessar não existe ou foi removido.";
    } else if (error.status === 500) {
      title = "Erro no Servidor";
      message = "Nosso servidor tropeçou nos fios. Estamos trabalhando nisso!";
    }
  } else if (error instanceof Error) {
    // Se for um erro de código que quebrou o React
    message = error.message;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '100px 20px' }}>
      <h1 style={{ color: '#FF3B30' }}>{title}</h1>
      <p style={{ color: '#553525', marginBottom: '30px' }}>{message}</p>
      
      <PrimarySecondaryButton 
        buttonType="Primário"
        content="Voltar para a Home"
        onClick={() => navigate('/')}
        paddingH="20px"
        paddingV="12px"
      />
    </div>
  );
}