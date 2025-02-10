import styled from "styled-components";
import { Link } from "react-router-dom";

export const CardContainer = styled.button<{ background_color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;  
  padding: 0.7em;

  width: 5vh;
  height: 5vh;
  aspect-ratio: 1 / 1;

  background: ${(props) => props.background_color};
  border-radius: 50%;

  border: none;

  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.2); 
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

export const Image = styled.img <{width: string}>`
  
  width: ${(props) => props.width};
  height: auto;


`