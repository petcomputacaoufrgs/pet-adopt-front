import styled from "styled-components";

export const StyledRadioButton = styled.input`
appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #ccc;
  border: 1px solid #A39289;
  background-color: #FFF6E8;

  margin: 0;
  
  display: grid;
  place-content: center;


  &:hover, &:focus {
    border: 2px solid #FF9944;
  }

  &:checked {
    border: 2px solid #FF9944;
  }

  &:before {
    content: "";
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #FF9944;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em var(--form-control-color);
  }

  &:checked:before {
    transform: scale(1);
  }
`;