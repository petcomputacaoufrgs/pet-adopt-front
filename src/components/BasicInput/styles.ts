import styled from "styled-components";

export const StyledInput = styled.input<{ width: string, fontSize: string, paddingRight: string, readOnly: boolean, inputType: string  }>`
  font-family: 'Nunito Sans', sans-serif;
  width: ${({ width }) => width};
  font-size: ${({ fontSize }) => fontSize};
  box-sizing: border-box;
  border: ${({ inputType }) => (inputType == "Primário")? "1px solid #FFC99C;" : "1px solid #BCAFA9;"};  1px solid #FFAC66;
  color: #553525;
  background-color:${({ inputType }) => (inputType == "Primário")? "#FFF3DF" : "#FFFFFF"};
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: ${({ paddingRight }) => paddingRight};
  padding-left: 24px;
  border-radius: 100px;

  &:hover {
    cursor: ${({ readOnly }) => readOnly? "pointer" : "text"};
  } 

  &:focus {
    outline: none;
    border: ${({ inputType }) => (inputType == "Primário")? "1px solid #FF9944" : "1px solid #755B4D"};
  }

`;