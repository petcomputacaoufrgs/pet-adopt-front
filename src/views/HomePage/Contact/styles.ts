import styled from "styled-components";


export const GridContainer = styled.div`
  display: grid;
  grid-template-areas:
    "header"
    "footer";
  grid-template-columns: 1fr;
  grid-template-rows: 64vh 56vh;
  height: 120vh;

  @media (max-width: 1300px) {
    heigth: 100%;
    grid-template-rows: 64vh 1fr;
  } 
`;

export const Image1Div = styled.header`
  grid-area: header;
  background-color: #FF9944;
  display: flex;
  overflow: hidden;
`;

export const Image2Div = styled.header`
  grid-area: header;
  background-color: rgba(0, 0, 0, 0)  
  display: flex;
  overflow: hidden;

`;

export const CardDiv = styled.header`
  grid-area: header;
  background-color: rgba(0, 0, 0, 0)  
  display: flex;
  width: 100%;
  heigth: 100%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

// export const Footer = styled.footer`
//   grid-area: footer;
//   background-color: #FFF6E8;
//   display: grid;
//   overflow: hidden;
//   grid-template-areas:
//     "div1 div2 div3 div4";
//   grid-template-columns: 25vw 25vw 25vw 25vw;
//   grid-template-rows: 1fr;
//   height: 100%;
//   width: 100wh;
  
//   @media (max-width: 768px) { /* Quando a largura da tela for menor que 768px */
//     grid-template-areas:
//       "div1"
//       "div2"
//       "div3"
//       "div4"; /* Agora os itens são empilhados como colunas */
//     grid-template-columns: 100%; /* Cada item ocupa 100% da largura */
//     grid-template-rows: auto; /* A altura se ajusta automaticamente */
//   }
// `;

export const Footer = styled.div`
  display: flex;
  background-color: #FFF6E8;
 
  @media (max-width: 1300px) {
    flex-direction: column;
    heigth: 100%;
    width: 100%;
  } 
`;

export const FooterDiv1 = styled.div`
  background-color:  rgba(0, 0, 0, 0); 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-left: 7em;
  padding-right: 4em;
  padding-top: 4em;
  gap: 30px;
  width: 25%;

  p {
    margin: 0;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: clamp(0.8rem, 1vw, 0.7rem); /* Responsivo */
    line-height: 2;
    color: #553525;

  }

  @media (max-width: 1300px) {
    padding-left: 1em;
    padding-right: 1em;
    align-items: center;
    justify-content: center;
    heigth:100%;
    width: 100%
    gap: 15px;
  } 
  
  @media (max-height: 700px) {
    padding-left: 1em;
    padding-right: 1em;

    gap: 15px;
  } 


`;

export const FooterDiv2 = styled.div`
  background-color:  rgba(0, 0, 0, 0);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-left: 7em;
  padding-right: 4em;
  padding-top: 4em;
  gap: 20px;
  width: 25%; 

  p {
    margin: 0;
    font-family: 'Inter', sans-serif;
    font-weight: 800;
    font-size: clamp(0.8rem, 1vw, 0.7rem); /* Responsivo */
    line-height: 2;
    color: #553525;
    transition: color 0.1s ease; 

    &:hover {
    cursor: pointer;
    color: #8b6a50; 
  }

  @media (max-width: 1300px) {
    padding-left: 1em;
    padding-right: 1em;
    align-items: center;
    justify-content: center;
    heigth:100%;
    width: 100%
    gap: 10px;
  } 
  
  @media (max-height: 700px) {
    padding-left: 1em;
    padding-right: 1em;
    align-items: center;
    justify-content: center;
    heigth:100%;
    width: 100%
    gap: 10px;
  } 
`;

export const FooterDiv3 = styled.div`
  background-color:  rgba(0, 0, 0, 0); 
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: hidden;
  padding-left: 4em;
  padding-right: 0em;
  padding-top: 4em;
  gap: 20px;
  width: 25%;

  p {
    margin: 0;
    font-family: 'Inter', sans-serif;
    font-weight: 800;
    font-size: clamp(0.8rem, 1vw, 0.7rem); 
    line-height: 2;
    color: #553525;
  
    transition: color 0.1s ease; 

    &:hover {
    cursor: pointer;
    color: #8b6a50; 
  }

  }
    @media (max-width: 1300px) {
    padding-left: 1em;
    padding-right: 1em;
    align-items: center;
    justify-content: center;
    heigth:100%;
    width: 100%
    gap: 10px;
  } 
  
  @media (max-height: 700px) {
    padding-left: 1em;
    padding-right: 1em;
    gap: 10px;
  } 
`;

export const FooterDiv4 = styled.div`
  background-color: rgba(0, 0, 0, 0); 
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: hidden;
  padding-left: 4em;
  padding-right: 7em;
  padding-top: 4em; 
  gap: 10px;
  width: 25%; 

  p {
    margin: 0;
    font-family: 'Inter', sans-serif;
    font-weight: 800;
    font-size: clamp(0.8rem, 1vw, 0.7rem); /* Responsivo */
    line-height: 2;
    color: #553525;
  }

  @media (max-width: 1300px) {
    padding-left: 1em;
    padding-right: 1em;
    align-items: center;
    justify-content: center;
    heigth:100%;
    width: 100%
    gap: 5px;
  } 
  
  @media (max-height: 700px) {
    padding-left: 1em;
    padding-right: 1em;
    gap: 10px;
  } 
 
`;

export const SocialIconsDiv = styled.div`
  display: flex;
  gap: 15px
`

export const Image1 = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Image2 = styled.img`
  width: 100%;
  height: 100%; 
  object-fit: cover;
  object-position: left;
`;

export const Image3 = styled.img`
  width: auto;
  height: 18%;
`;