import styled from "styled-components";

export const InfoContent = styled.div <{$position:string}>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.$position};
  justify-content: center;
  text-align: ${(props) => props.$position};
  width: 100%;
  margin-bottom: 35px;


  p {
    margin: 0;
    font-weight: 400;
    font-size: clamp(0.8rem, 1vw, 1.1em); /* Responsivo */
    line-height: 2;
    color: #553525;

  }
  
  h1 {
    font-family: 'Source Serif 4', sans-serif;
    margin: 0;
    font-weight: 800;
    font-size: clamp(1.2rem, 3vw, 32); 
    line-height: 1.2;
    color: #553525;
    margin-bottom: 12px;
  }

  h3 {
    margin: 0;
    font-weight: 800;
    font-size: clamp(1.5rem, 4vw, 2em);
    line-height: 1.5;
    color: #553525;
    margin-bottom: 24px;
  }
    
`;

export const InfoContainer = styled.div<{$position: string}>`
  font-family: 'Nunito Sans', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.$position};
  justify-content: center;

  width: 100%;

  box-sizing: border-box;

  @media (max-width: 1200px) {
    padding: 3em;
  }

  @media (max-width: 768px) {
    padding: 2em 1em;
    max-width: 100%; /* para evitar corte lateral */
  }

  @media (max-height: 700px) {
    padding: 3em;
  }
`;

