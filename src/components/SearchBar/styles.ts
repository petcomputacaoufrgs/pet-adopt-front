import styled, { css } from 'styled-components';

interface ContainerProps {
  width: string;
}

// Adicionamos a prop opcional maxHeight
interface DropDownWrapperProps {
  width: string;
  $maxHeight?: string; 
}

export const Container = styled.div<ContainerProps>`
  width: ${({ width }) => width};
  position: relative;
`;

export const ToggleButton = styled.button`
  position: absolute;
  right: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #553525;
  padding: 0 16px 0 10px;
  display: flex;
  align-items: center;
`;

export const DropDownWrapper = styled.div<DropDownWrapperProps>`
  position: relative;
  width: ${({ width }) => width};
  
  & > div {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    
    // Lógica do Scroll
    ${({ $maxHeight }) => $maxHeight && css`
      max-height: ${$maxHeight};
      overflow-y: auto;
      overflow-x: hidden;
      
      // Estilização da scrollbar
      &::-webkit-scrollbar {
        width: 6px;
      }
      &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
      }
      &::-webkit-scrollbar-thumb {
        background: #D4C3BC;
        border-radius: 4px;
      }
    `}
  }
`;