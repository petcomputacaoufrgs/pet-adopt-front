import styled from "styled-components";


// Componente estilizado usando styled-components
export const DropDownContainer = styled.div<{ $width: string, $optionHeight: string, $maxHeight: string, $fontSize: string }>`
  display: flex;
  flex-direction: column;
  width: ${({ $width }) => $width};
  border: none;
  border-radius: 0.5rem;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* shadow-sm */
  
  max-height: ${({ $maxHeight }) => $maxHeight};

  overflow: hidden;

  
  button {
    all: unset;
    width: ${({ $width }) => $width};
    height: ${({ $optionHeight }) => $optionHeight};
    cursor: pointer;
    padding: 8px 16px;
    font-family: "Nunito Sans", sans-serif;
    font-size: ${({ $fontSize }) => $fontSize};
    font-weight: 800;
    color: #553525;
    text-align: left;

    
    transition: background-color 0.3s ease;

    box-sizing: border-box;
    white-space: normal;
    word-wrap: break-word;

    
    &:hover {
      background-color: #FF9944;
    }
  }

  hr {
    width: ${({ $width }) => $width};
    border: none;
    border-top: 1px solid #DEDEDE;
    margin: 0;

  }
`;