import styled from "styled-components";
import label from "../../../assets/Label.png";
import label_mobile from "../../../assets/Label_mobile.png";

export const InfoText = styled.p`
    font-family: 'Nunito Sans';
    font-weight: 800;
    font-size: 3em;
    color: #553525;
    text-align: start;

    @media (max-width: 768px) {
      font-size: 2.2em;
  }
`

export const LabelImage = styled.img`

  /* Exibe a imagem padrão (desktop) por padrão */
  content: url(${label});

  /* Media Query para telas pequenas (máximo 768px) */
  @media (max-width: 428px) {
    content: url(${label_mobile});
  }
`;



export const ActionsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    overflow: auto;
    gap: 12vh;

    overflow: auto;
    @media (max-width: 1500px) {
      gap: 2vh;
  } 

`;

export const CardsDiv = styled.div`
    display: flex;
    gap: 1rem;
    width: 80%;
    
    justify-content: center;
  
    @media (max-width: 1500px) {
      padding: 20px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
`

export const InfoDiv = styled.div`
    display : flex;
    width: 80%;
    align-items: center;
    gap: 7vw;

    @media (max-width: 1064px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1vh;
  }
`