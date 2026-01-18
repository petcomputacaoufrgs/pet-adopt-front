import styled from "styled-components";

// -------------------------------------------------------------
// Container Principal
// -------------------------------------------------------------
export const Container = styled.div`
  font-family: 'Nunito Sans', sans-serif;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #FFF6E8
  
`;

// -------------------------------------------------------------
// Contêiner de ForgotPassword
// -------------------------------------------------------------
export const ForgotPasswordContainer = styled.div`
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

// -------------------------------------------------------------
// Contêiner do Formulário de ForgotPassword
// -------------------------------------------------------------
export const ForgotPasswordFormContainer = styled.div`
  display: flex;
  height: 100%;
  color: #563526;

  margin: auto;

  box-sizing: border-box;
  padding-bottom: 130px;

  overflow-y: scroll;

  scrollbar-width: none;
  &::-webkit-scrollbar {
  display: none;
  }

  @media (max-width: 1199px){
    width: 100%;
  }
`;

export const ForgotPasswordForm = styled.form`
  border-radius: 8px;
  height: 500px;
  width: 645px; /* Usando px para um tamanho fixo, mas considere % para responsividade */
  gap: 32px;

  padding: 40px;

  margin: auto;

  display: flex;
  flex-direction: column;

  p,
  h1,
  h3 {
    margin: 0;
  }

  @media (max-width: 1199px){
      margin: auto;
      
  }

  @media (max-width: 680px){
    width: 500px;
  }

  @media (max-width: 560px){
    width: 90%;
  }


`;

export const ForgotPasswordFormTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ForgotPasswordFormInputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;

  h3 {
    margin-bottom: 12px;
  }

  h3:nth-of-type(2) {
    margin-top: 32px;
  }
`;

export const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.8em; /* Usando em para tamanho de padding em relação à fonte */
  width: 100%;

  font-size: 1em; /* Usando em para tamanho de fonte */
`;

export const ForgotPasswordFormLinksContainer = styled.div`
  display: flex;
  flex-direction: column;

  p {
    align-self: center;
  }

  p:nth-of-type(1) {
    margin-top: 16px;
    margin-bottom: 12px;
  }

  p:nth-of-type(2) {
    margin-top: 12px;
  }
`;

export const TextContainer = styled.div`
  gap: 8px;
  margin-top: 12px; /* Mantido em px conforme sua regra para margens de elementos 'netos' */

  display: flex;
  flex-direction: row;
  align-items: center;

  div {
    border: none;
    border-bottom: 1px solid #bcafa9;
    margin: 0;
    width: 100%;
  }
`;