import styled from "styled-components";

export const PrimaryStyledLink = styled.a<{$disabled?: boolean;}>`
  font-family: 'Nunito Sans', sans-serif;
  font-style: normal;
  font-weight: 800; 
  text-decoration: none;
  color: ${(props) => (props.$disabled ? '#DEDEDE' : '#553525') };
  font-size: 28px !important;;
  padding: 0px 0px;
  gap: 10px;
  line-height: 28px;
  display: flex; 
  align-items: center; 
  justify-content: center;
  order: 2;
  flex-grow: 0;
  
  height: 36px;

  border-bottom: 2px solid transparent;
  transition: border-color 0.3s ease;

  
  &:hover {
    cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
    color: ${(props) => !props.$disabled && '#6A4E42'};
    border-bottom-color: ${(props) => (!props.$disabled && '#6A4E42') };
  }

  &:focus {
    outline: 2px solid #6A4E42;
    outline-offset: 2px;
  }

  &:active {
    color: ${(props) => !props.$disabled && '#3C2415'};
    border-bottom-color: ${(props) => (!props.$disabled && '#3C2415') };
  }

  svg {
    fill: currentColor; // para o ícone seguir a cor do texto
  }

   /* Telas menores que 768px */
  @media (max-width: 768px) {
    font-size: 14px !important;;
    height: 24px;
    gap: 8px;
  }


}`;

export const SecondaryStyledLink = styled.a<{$disabled?: boolean;}>`
  font-family: 'Nunito Sans', sans-serif;
  font-style: normal;
  font-weight: 800; 
  text-decoration: none;
  font-size: 18px !important;;
  gap: 10px;
  display: inline-flex; 
  align-items: center; 
  justify-content: center;
  order: 2;
  height: 24px;
  margin: 5px;
  border-bottom: 2px solid currentColor;
  padding-bottom: 2px;
  padding-top: 2px;
  transition: border-color 0.3s ease, color 0.3s ease;
  color:${(props) => (props.$disabled ? '#A29A96' : '#755B4D') };;

  &:hover {
    color: ${(props) => !props.$disabled && '#553525'};
    cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  }

  &:focus {
    outline: 2px solid #553525;
    outline-offset: 2px;
  }

  &:active {
    color: ${(props) => !props.$disabled && '#553525'};
  }

}`;

