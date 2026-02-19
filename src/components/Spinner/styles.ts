import styled, { keyframes } from 'styled-components';

// animação de rotação
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Interfaces para as props de estilo
interface ContainerProps {
  $fullScreen: boolean;
}

interface SpinnerElementProps {
  $size: string;
  $color: string;
}

// Container que centraliza o spinner na tela
export const SpinnerContainer = styled.div<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  // Se for fullScreen, ocupa toda a altura da janela. Senão, ocupa 100% do pai.
  height: ${(props) => (props.$fullScreen ? '100vh' : '100%')};
  background-color: ${(props) => (props.$fullScreen ? '#ffffff' : 'transparent')}; // Fundo branco se for tela cheia
  z-index: 9999; // Garante que fique por cima de tudo se for tela cheia
`;

// círculo giratório em si
export const SpinnerElement = styled.div<SpinnerElementProps>`
  border: 4px solid rgba(0, 0, 0, 0.1); // A "trilha" cinza clara do spinner
  width: ${(props) => props.$size};
  height: ${(props) => props.$size};
  border-radius: 50%; // Deixa redondo
  border-left-color: ${(props) => props.$color}; // A cor principal que gira
  
  animation: ${spin} 1s linear infinite; // Aplica a animação definida acima
`;