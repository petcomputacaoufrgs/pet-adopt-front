import styled from "styled-components";


export const GridContainer = styled.div`
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 100vw;
  min-height: 442px;
  background-color: #FFF6E8;
  gap: 0px;

  p {
    margin: 0;
    font-family: 'Nunito Sans';
    font-weight: 400;
    font-size: clamp(0.8rem, 1vw, 0.7rem); /* Responsivo */
    line-height: 2;
    color: #553525;
  }
`;

export const FooterGrid = styled.div`
  display: flex;
  justify-content: center;
  grid-area: footer;
  background-color: #FFF6E8;
  gap:140px;
  padding-top: 4em;
  min-height: 340px;
  width: 100%;
  
  @media (max-width: 1200px) {
      flex-direction: column;
      gap:30px;
      margin-bottom:40px;
    } 
`;

export const FooterDiv1 = styled.div`
  background-color:  rgba(0, 0, 0, 0); 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 30px;
  width: 12vw;
  
  p {
    margin: 0;
    font-family: 'Nunito Sans';
    font-weight: 400;
    font-size: clamp(0.8rem, 1vw, 0.7rem); /* Responsivo */
    line-height: 2;
    color: #553525;
  }

 @media (max-width: 1200px) {
    justify-content: center;
    align-items: center;
    width:100%;
    text-align: center;
    p{
      width:50%;
    }
  } 

`;

export const FooterDiv2 = styled.div`
  background-color:  rgba(0, 0, 0, 0);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 20px;

  p {
    margin: 0;
    font-family: 'Nunito Sans';
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

 @media (max-width: 1200px) {
    justify-content: center;
    align-items: center;
    width:100%;
    gap:10px;
  } 

`;

export const FooterDiv3 = styled.div`
  background-color:  rgba(0, 0, 0, 0); 
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 20px;

  p {
    margin: 0;
    font-family: 'Nunito Sans';
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

 @media (max-width: 1200px) {
    justify-content: center;
    align-items: center;
    width:100%;
    gap:10px;
  } 

`;

export const FooterDiv4 = styled.div`
  background-color: rgba(0, 0, 0, 0); 
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;

  p {
    margin: 0;
    font-family: 'Nunito Sans';
    font-weight: 800;
    font-size: clamp(0.8rem, 1vw, 0.7rem); /* Responsivo */
    line-height: 2;
    color: #553525;
  }

  @media (max-width: 1200px) {
    justify-content: center;
    align-items: center;
    width:100%;
    gap:10px;
  } 
 
`;

export const SocialIconsDiv = styled.div`
  display: flex;
  gap: 15px;
  width:100%;
  
  @media (max-width: 1200px) {
    justify-content: center;
    align-items: center;
    width:100%;
    gap:10px;
  } 
`

export const Image3 = styled.img`
  width: auto;
  height: 5vw;

  @media (max-width: 1200px) {
      height: 10vw;
  } 
`;

export const Direitos = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #c0a28d;
  width: 80%;
  padding-top: 10px;

  p {
    margin: 0;
    font-family: 'Nunito Sans';
    font-weight: 500;
    font-size: clamp(0.7rem, 1vw, 0.7rem); 
    line-height: 2;
    color: #553525;
  }
    
  @media (max-width: 1200px) {
    flex-direction: column;
    justify-content: center;
    align-items: center; 
    margin-bottom:20px; 
  } 

`;