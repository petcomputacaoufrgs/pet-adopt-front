import { SpinnerContainer, SpinnerElement } from './styles';

interface SpinnerProps {
  /** Se verdadeiro, ocupa 100vh e centraliza na tela (Padrão: true) */
  fullScreen?: boolean;
  /** Tamanho do spinner em px ou rem (Padrão: '50px') */
  size?: string;
  /** Cor principal do spinner (Padrão: '#F17D6E') */
  color?: string;
}

const Spinner = ({ 
  fullScreen = true, 
  size = '50px', 
  color = '#F17D6E'
}: SpinnerProps) => {
  
  const spinner = <SpinnerElement $size={size} $color={color} />;

  // Se não for fullScreen, retorna só a bolinha
  if (!fullScreen) {
    return spinner;
  }

  // Se for fullScreen, envolve no container que centraliza na tela
  return (
    <SpinnerContainer $fullScreen={true}>
      {spinner}
    </SpinnerContainer>
  );
};

export default Spinner;