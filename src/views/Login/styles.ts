import styled from "styled-components";

export const Container = styled.div`
  font-family: 'Nunito Sans', sans-serif;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #FFF6E8
  `;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow: hidden;
`;

export const Image = styled.img` 
  object-fit: cover;
`;

export const LoginFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  color: #563526;
`;

export const LoginForm = styled.form`
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  width: 645px;
  height: 500px;
  gap: 32px;

  p,h1,h3{
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
  gap: 22px;

  h3{
    margin-bottom: 12px;
  }

  h3:nth-of-type(2) {
    margin-top: 32px; 
  }
`;

export const LoginFormLinksContainer = styled.div`
  display: flex;
  flex-direction: column;

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

export const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  marin-top: 12px;

  div{
    width: 100%;
    border: none;
    border-bottom: 1px solid #BCAFA9;
    margin: 0;
  }
`;