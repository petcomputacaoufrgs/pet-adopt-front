import styled from "styled-components";

// -------------------------------------------------------------
// Container Principal
// -------------------------------------------------------------
export const Container = styled.div`
  background-color: #fff6e8;
  height: 100vh;

  font-family: "Nunito Sans", sans-serif;

  display: flex;
  flex-direction: column;
`;

// -------------------------------------------------------------
// Contêiner de Login
// -------------------------------------------------------------
export const LoginContainer = styled.div`
  overflow: hidden;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Image = styled.img`
  object-fit: cover;
`;

// -------------------------------------------------------------
// Contêiner do Formulário de Login
// -------------------------------------------------------------
export const LoginFormContainer = styled.div`
  color: #563526;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginForm = styled.form`
  border-radius: 8px;
  height: 500px;
  width: 645px; /* Usando px para um tamanho fixo, mas considere % para responsividade */
  gap: 32px;

  display: flex;
  flex-direction: column;

  p,
  h1,
  h3 {
    margin: 0;
  }
`;

export const LoginFormTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const LoginFormInputsContainer = styled.div`
  display: flex;
  flex-direction: column;

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

export const LoginFormLinksContainer = styled.div`
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