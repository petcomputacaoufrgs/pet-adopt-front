import styled from "styled-components";

export const PrimaryButton = styled.button<{$width: string | undefined, $highlighted: boolean}>`
  font-family: "Nunito Sans", sans-serif;
  background-color: ${({ $highlighted }) => ($highlighted ? "#553525" : "#FF9944")};
  border-radius: 100px;
  border: ${({ $highlighted }) => ($highlighted ? "1px solid #553525" : "none")};
  font-weight: 800;
  font-size: 18px;
  color: ${({ $highlighted }) => ($highlighted ? "white" : "#553525")};
  padding: 10px 26px;

  display: flex;
  justify-content: center; 
  align-items: center;
  
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;

  width: ${(props) => (props.$width)? props.$width : "auto"};

 

  &:disabled {
    background-color: #DEDEDE;
    border: none;
    color: #A6A6A6
  }

  &:disabled:hover, &:disabled:active {
    background-color: #DEDEDE;
    color: #A6A6A6;
    border: none;
    transform: scale(1.0);
    cursor: default;
  }
  
  &:hover, &:active {
    background-color: #553525;
    color: white;
    transform: scale(1.05);
    cursor: pointer;

    path {
      fill: white;
      stroke: white;
    }

  }

  path {
    fill: ${({ $highlighted }) => ($highlighted ? "white" : "#553525")};
    stroke: ${({ $highlighted }) => ($highlighted ? "white" : "#553525")};
  }


  @media (max-width: 430px) {
    font-size: 16px;
  }
`

export const SecondaryButton = styled.button<{$width: string | undefined, $highlighted: boolean}>`
  background-color: ${({ $highlighted }) => ($highlighted ? "#553525" : "transparent")};
  border-radius: 100px;
  font-weight: 800;
  font-size: 18px;
  color: ${({ $highlighted }) => ($highlighted ? "white" : "#553525")};
  border: 1px solid #553525;
  padding: 12px 26px;

  display: flex;
  justify-content: center; 
  align-items: center;

  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;

  width: ${(props) => (props.$width)? props.$width : "auto"};
  


  &:disabled {
    border-color: #DEDEDE;
    color: #DEDEDE;
  }

  &:disabled:hover, &:disabled:active {
    background-color: transparent;
    color: #DEDEDE;
    border-color: #DEDEDE;
    transform: scale(1.0);
    cursor: default;
  }
  
  &:hover, &:active {
    background-color: #553525;
    color: white;
    transform: scale(1.05);
    cursor: pointer;

    path {
      fill: #553525;
      stroke: #553525;
    }

  }

  path {
    fill: ${({ $highlighted }) => ($highlighted ? "white" : "#553525")};
    stroke: ${({ $highlighted }) => ($highlighted ? "white" : "#553525")};
  }

  @media (max-width: 430px) {
    font-size: 16px;
    padding: 8px 26px;

  }

  
`