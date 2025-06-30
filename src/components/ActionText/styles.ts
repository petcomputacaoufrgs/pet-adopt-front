import styled from "styled-components";

export const TextWithAction = styled.button<{ $width: string, $fontSize: string, $textColor: string, $underlineOnHover: boolean }>`
  width: ${(props) => `${props.$width}`};
  font-family: 'Nunito Sans', sans-serif;
  font-style: normal;
  font-weight: 800; 
  color: ${(props) => `${props.$textColor}`};
  font-size: ${(props) => `${props.$fontSize}`};
  padding: 0px 0px;
  gap: 10px;
  display: flex; 
  align-items: center; 
  justify-content: center;
  background: none;
  border: none;
  

  &:hover {
  cursor: pointer;
  text-decoration: ${(props) => (props.$underlineOnHover ? "underline" : "none")};
  }
}`;