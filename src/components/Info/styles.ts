import styled from "styled-components";

export const InfoContent = styled.div <{position:string}>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.position};
  justify-content: center;
  text-align: ${(props) => props.position};
  gap: 24px;
  width: 100%;
  padding-top: 2em; 
  padding-bottom: 2em;


  p {
    margin: 0;
    font-weight: 400;
    font-size: clamp(0.8rem, 1vw, 1.1em); /* Responsivo */
    line-height: 2;
    color: #553525;

  }
  
  h1 {
    margin: 0;
    font-weight: 800;
    font-size: clamp(1.2rem, 3vw, 1.5em); /* Responsivo */
    line-height: 0;
    color: #553525;
  }

  h3 {
    margin: 0;
    font-weight: 800;
    font-size: clamp(1.5rem, 4vw, 2em); /* Responsivo */
    line-height: 1.5;
    color: #553525;
  }
    
`;

export const InfoContainer = styled.div <{position:string}>`
  font-family: 'Nunito Sans', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.position};
  justify-content: center;
  width: 100%;
  max-width: 617px;
  max-height: 492px; 
  padding: 7em; 

  @media (max-width: 1200px) {
    padding: 3em
  } 
  
  @media (max-height: 700px) {
    padding: 3em
  } 
`;
