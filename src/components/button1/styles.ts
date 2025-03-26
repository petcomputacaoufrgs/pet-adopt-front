import styled from "styled-components";
import { Link } from "react-router-dom";

export const CardContainer = styled.button<{ background_color: string, border: string}>`
  display: flex;
  align-items: center;

  padding-left: 2.5em; 
  padding-right: 2.5em;

  width: 100%;
  max-width: 267px; 
  max-height: 48px; 
  height: auto;

  background: ${(props) => props.background_color};
  border-radius: 40px;

  border: ${(props) => props.border};

  transition: transform 0.1s ease;

  &:hover {
    transform: scale(1.04); 
    cursor: pointer; 
  } 
`;

export const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  text-align: center;
  gap: 24px;
  width: 100%;
  padding-top: 2em; 
  padding-bottom: 2em;

  h4 {
    margin: 2;
    font-family: 'Nunito Sans';
    font-weight: 800;
    font-size: 1.1em;
    line-height: 1.5;
    color: #553525;

  }
`;

export const StyledLink = styled(Link)`

  text-decoration: none;
  color: inherit; 
  
`