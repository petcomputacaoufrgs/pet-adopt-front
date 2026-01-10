import styled from 'styled-components';

export const Container = styled.div`
  font-family: 'Nunito Sans', sans-serif;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #FFF6E8
  `;

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow: hidden;
  height: 100%;
    
  @media (max-width: 1199px){
    justify-content: center;

  }

`;

export const Image = styled.img` 
  object-fit: cover;
`;


export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: #FFF6E8;
  padding: 32px;
  border-radius: 20px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  gap: 16px;

  h2 {
    font-family: 'Nunito Sans', sans-serif;
    color: #553525;
    margin-bottom: 8px;
  }

  p {
    font-family: 'Nunito Sans', sans-serif;
    color: rgb(85, 53, 37);
    line-height: 1.5;
    margin-bottom: 16px;
  }
`;

export const SignUpFormContainer = styled.div  <{role: string}>`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  height: 100%;
  color: #563526;

  align-items: flex-start;
  overflow-y: scroll;

  scrollbar-width: none;
  &::-webkit-scrollbar {
  display: none;
  }

  @media (max-width: 1199px){
    width: 100%;
  }
  
`;

export const SignUpForm = styled.form <{role: string}>`
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  width: 645px;
  height: 500px;
  gap: 32px;

  p,h1,h3{
    margin: 0;
  }

  justify-content: flex-start;
  margin-top: 69px;

  @media (max-width: 680px){
    width: 500px;
  }

  @media (max-width: 560px){
    width: 90%;
  }
  
`;

export const SignUpFormTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SignUpFormInputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  
  h3{
    margin-bottom: 12px;
  }

  h3:nth-of-type(2) {
    margin-top: 32px; 
  }

  h2{
      margin-bottom: 12px;
  }
`;

export const SignUpFormLinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  p{
    align-self: center;
  }

  p:nth-of-type(1){
    margin-top: 16px;
    margin-bottom: 12px;
  }

  p:nth-of-type(2){
    margin-top: 12px;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;