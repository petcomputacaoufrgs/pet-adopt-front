import styled from "styled-components";

export const StyledInput = styled.input<{ width: string, fontSize: string }>`
  font-family: 'Nunito Sans', sans-serif;
  width: ${({ width }) => width};
  font-size: ${({ fontSize }) => fontSize};
  box-sizing: border-box;
  border: 1px solid #FFAC66;
  color: #553525;
  background-color: #FFF3DF;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 56px;
  padding-left: 24px;
  border-radius: 100px;

`;