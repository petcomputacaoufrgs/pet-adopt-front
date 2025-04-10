import styled from "styled-components";
import { Link } from "react-router-dom";



export const CardContainer = styled.button<{ background_color: string, background_image: string}>`
  font-family: 'Nunito Sans', sans-serif;
  display: flex;
  align-items: flex-end;

  width: 100%;
  height: 100%;

  gap: 16px;
  background: ${(props) => `url(${props.background_image}) ${props.background_color}`};
      
  border-radius: 20px;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 

  padding: 1vw;
  border: none;

  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.03); 
    cursor: pointer; 
  } 

`;

export const CardInfo = styled.div<{text_color: string}>`
  display: flex;

  align-items: center;

  justify-content: space-between;

  text-align: left;
  gap: 8px;
  width: 100%;
  padding: 1em; 

  p {
    margin: 0;
    font-weight: 400;
    font-size: 1.5em;
    line-height: 1.5;
    color: ${(props) => `${props.text_color}`}
    


  }

  h3 {
    margin: 0;
    width: 50%;
    font-weight: 800;
    font-size: 2vw;
    line-height: 1.5;
    color: ${(props) => `${props.text_color}`}
  }

    @media (max-width: 768px) {
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      p {
        font-size: 16px;
      }

      h3 {
        font-size: 18px;
      }
    }

`;

export const StyledLink = styled(Link)<{ width: string, height_desktop: string, height_mobile: string}>`
  font-family: 'Nunito Sans', sans-serif;
  display: flex; 
  text-decoration: none;
  width: ${(props) => `${props.width}`};
  height: ${(props) => `${props.height_desktop}`};
  justify-content: center;


  @media (max-width: 768px) {
    width: 100%;
    height: ${(props) => `${props.height_mobile}`};
  }

`

export const ButtonDiv = styled.div`
    width: 50vw;
`

