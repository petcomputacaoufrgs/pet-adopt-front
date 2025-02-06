import styled from "styled-components";
import { Link } from "react-router-dom";

export const CardContainer = styled.button<{ background_color: string }>`
  display: flex;
  align-items: center;

  padding: 2em; 
  gap: 16px;

  width: 100%;
  max-width: 800px;
  height: auto;

  background: ${(props) => props.background_color};
  border-radius: 20px;

  border: none;

  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.03); 
    cursor: pointer; 
  } 

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 1em; 
  }
`;

export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  text-align: left;
  gap: 8px;
  width: 100%;
  max-width: 450px;
  padding: 1em; 

  p {
    margin: 0;
    font-family: 'Nunito Sans';
    font-weight: 400;
    font-size: 1.5em;
    line-height: 1.5;
    color: #553525;

  }

  h3 {
    margin: 0;
    font-family: 'Nunito Sans';
    font-weight: 800;
    font-size: 2em;
    line-height: 1.5;
    color: #553525;
  }
`;


export const Image = styled.img`
  width: 100%;
  max-width: 150px; 
  height: auto; 
  margin-left: 16px;


`;


export const StyledLink = styled(Link)`
  display: flex; 
  text-decoration: none;
  width: 100%;
  justify-content: center;

`