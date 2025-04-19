import styled from "styled-components";

export const StyledLink = styled.p<{ $fontSize: string, $textColor: string }>`
  font-family: 'Nunito Sans', sans-serif;
  font-style: normal;
  font-weight: 800; 
  text-decoration: none;
  color: ${(props) => `${props.$textColor}`};
  font-size: ${(props) => `${props.$fontSize}`};
  padding: 0px 0px;
  gap: 10px;
  line-height: 28px;
  display: flex; 
  align-items: center; 
  justify-content: center;
  order: 2;
  flex-grow: 0;
  
  height: 40px;

}`;