import styled from "styled-components";
import { Link } from "react-router-dom";

export const CardContainer = styled.button<{ background_color: string }>`
  display: flex;
  align-items: center;

  padding: 1em; 
  gap: 16px;

  width: 100%;
  max-width: 267px; 
  max-height: 48px; 
  height: auto;

  background: ${(props) => props.background_color};
  border-radius: 40px;

  border: none;

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
  text-align: left;
  gap: 24px;
  width: 100%;
  padding-top: 2em; 
  padding-bottom: 2em;


  p {
    margin: 0;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 0.9em;
    line-height: 2;
    color: #553525;

  }
  
  h1 {
    margin: 0;
    font-family: 'Nunito Sans';
    font-weight: 800;
    font-size: 1.5em;
    line-height: 0;
    color: #553525;
  }

  h3 {
    margin: 0;
    font-family: 'Inter', sans-serif;
    font-weight: 800;
    font-size: 2em;
    line-height: 1.5;
    color: #553525;
  }

  h4 {
    margin: 2;
    font-family: 'Inter', sans-serif;
    font-weight: 800;
    font-size: 1.1em;
    line-height: 1.5;
    color: #553525;

  }
`;

export const InfoContainer = styled.div`

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 8px;
  width: 100%;
  max-width: 617px;
  max-height: 492px; 
  padding: 5em; 

  @media (max-width: 500px) {
    min-height: 750px;
  } 
`;

export const StyledLink = styled(Link)`

  text-decoration: none;
  color: inherit; 
  
`
