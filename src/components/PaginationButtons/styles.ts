import styled from "styled-components";

export const PaginationContainer = styled.div<{ $containerHeight: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  height: ${(props) => props.$containerHeight};
  
`;

export const Ellipsis = styled.span`
  padding: 0 8px;
  color: #553525;
  font-family: "Nunito Sans", sans-serif;
`;

export const NumericPassPageButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

// Props para os botões numéricos
export const PaginationButton = styled.button<{
  $highlighted: boolean;
  $buttonWidth: string;
  $buttonHeight: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Nunito Sans", sans-serif;
  
  width: ${(props) => props.$buttonWidth};
  height: ${(props) => props.$buttonHeight};
  
  border-radius: 50%; /* Mantém redondo */
  border: none;
  
  box-shadow: 0px 1px 4px rgba(12, 12, 13, 0.10),
              0px 1px 4px rgba(12, 12, 13, 0.05);

  background-color: ${({ $highlighted }) => ($highlighted ? "#FF9944" : "#FFFFFF")};
  font-weight: 400;
  font-size: 16px;
  color: #553525;

  &:hover {
    cursor: pointer;
    background-color: ${({ $highlighted }) => ($highlighted ? "#FF9944" : "#e0e0e0")};
  }

  &:disabled {
    cursor: default;
  }
`;

// Botões de Anterior/Próximo (São maiores e tem texto)
export const PassPageButton = styled.button<{ $buttonHeight: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px; /* Espaço entre ícone e texto */
  padding: 0 16px; /* Espaço interno lateral */
  
  height: ${(props) => props.$buttonHeight};

  
  background-color: #FFFFFF;
  border: none;
  border-radius: 8px;
  
  box-shadow: 0px 1px 4px rgba(12, 12, 13, 0.10),
              0px 1px 4px rgba(12, 12, 13, 0.05);

  font-family: "Nunito Sans", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #553525;

  span {
    display: inline-block;
  }

  &:hover {
    cursor: pointer;
    background-color: #e0e0e0;
  }

  &:disabled {
    cursor: default;
    background-color: #DEDEDE;
    color: #A6A6A6;
    box-shadow: none;
    
    img {
        opacity: 0.5;
        filter: grayscale(100%);
    }
  }
`;