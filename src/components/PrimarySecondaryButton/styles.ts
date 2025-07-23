import styled from "styled-components";

// --- Base Button Styles ---
const BaseButton = styled.button<{$width?: string;}>`
  font-family: "Nunito Sans", sans-serif;
  font-weight: 800;
  font-size: 18px;
  border-radius: 100px;
  padding: 10px; 

  display: flex;
  justify-content: center;
  align-items: center;

  width: ${(props) => props.$width || "auto"};
  max-height: 48px;
  min-height: 48px;

  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;

  &:disabled {
    background-color: #DEDEDE;
    border: none;
    color: #A6A6A6;
    cursor: default;
    transform: scale(1.0); 
  }

  &:disabled:hover,
  &:disabled:active {
    background-color: #DEDEDE;
    color: #A6A6A6;
    border: none;
    transform: scale(1.0);
    cursor: default;
  }

  &:hover,
  &:active {
    cursor: pointer;
    transform: scale(1.05);
  }

  @media (max-width: 430px) {
    font-size: 16px;
  }
`;

// --- Primary Button ---
export const PrimaryButton = styled(BaseButton)<{$highlighted: boolean}>`
  background-color: ${({ $highlighted }) => ($highlighted ? "#553525" : "#FF9944")};
  border: ${({ $highlighted }) => ($highlighted ? "1px solid #553525" : "none")};
  color: ${({ $highlighted }) => ($highlighted ? "white" : "#553525")};

  &:hover,
  &:active {
    background-color: #553525;
    color: white;
  }

  path {
    fill: ${({ $highlighted }) => ($highlighted ? "white" : "#553525")};
    stroke: ${({ $highlighted }) => ($highlighted ? "white" : "#553525")};
  }

  &:hover path,
  &:active path {
    fill: white;
    stroke: white;
  }
`;

// --- Secondary Button ---
export const SecondaryButton = styled(BaseButton)<{$highlighted: boolean}>`
  background-color: ${({ $highlighted }) => ($highlighted ? "#553525" : "transparent")};
  border: 1px solid #553525;
  color: ${({ $highlighted }) => ($highlighted ? "white" : "#553525")};

  &:disabled {
    border-color: #DEDEDE; 
    color: #DEDEDE;
  }

  &:disabled:hover,
  &:disabled:active {
    background-color: transparent; 
    border-color: #DEDEDE;
    color: #DEDEDE;
  }

  &:hover,
  &:active {
    background-color: #553525;
    color: white;
  }

  path {
    fill: ${({ $highlighted }) => ($highlighted ? "white" : "#553525")};
    stroke: ${({ $highlighted }) => ($highlighted ? "white" : "#553525")};
  }

  &:hover path,
  &:active path {
    fill: white; 
    stroke: white;
  }

  @media (max-width: 430px) {
    padding: 8px 26px;
  }
`;