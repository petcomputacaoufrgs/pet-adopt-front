import { useNavigate } from "react-router-dom";
import PrimarySecondaryButton from "../../components/PrimarySecondaryButton";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '100px 20px' }}>
      
      <h1 style={{ fontSize: '4rem', color: '#553525' }}>404</h1>
      <h2 style={{ color: '#FF3B30' }}>Ops! Página não encontrada.</h2>
      <p style={{ marginBottom: '40px', color: '#553525' }}>
        Parece que alguém cavou um buraco fundo demais e se perdeu!
      </p>

      <PrimarySecondaryButton 
        buttonType="Primário"
        content="Voltar para a Página Inicial"
        onClick={() => navigate('/')}
        paddingH="20px"
        paddingV="12px"
      />
    </div>
  );
}