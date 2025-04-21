import styled from "styled-components";
import { ToggleButtonProps } from "./types";



export const ToggleContainer = styled.div`
  display: flex;
  background: rgba(255, 241, 215, 1);
  border-radius: 999px;
  padding:  0.2em 0.2em;
  width: fit-content;
  margin: 12px auto;
`;

export const ToggleButton = styled.div<ToggleButtonProps>`
  padding:  0.5em 1em;
  margin:  0.2em 0.2em;
  border-radius: 999px;
  font-weight: bold;
  cursor: ${(props) => (props.disabledButton ? "not-allowed" : "pointer")};
  transition: all 0.3s;
  user-select: none;

  ${(props) => {
    if (props.selected==="ngo") {
      if(props.buttonType==="ngo"){
        return `
          background-color: #FF9944;
          color: #582c0e;
        `;
      }else{

        if(props.disabledButton){
          return `
            background-color: transparent;
            color: #99867c;
          `;
        }
        else{
          return `
            background-color: transparent;
            color: #582c0e;
          `;
        }
      }
    }else{
      if(props.buttonType==="member"){
        return `
          background-color: #FF9944;
          color: #582c0e;
        `;
      }else{

        if(props.disabledButton){
          return `
            background-color: transparent;
            color: #99867c;
          `;
        }
        else{
          return `
            background-color: transparent;
            color: #582c0e;
          `;
        }
      }
    }
  }}

`;
