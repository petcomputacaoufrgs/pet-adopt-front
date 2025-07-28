import styled, { css } from 'styled-components';

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
`;

export const Image = styled.img` 
  object-fit: cover;
`;

export const SignUpFormContainer = styled.div  <{role: string}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: #563526;

  ${props => 
  props.role === 'ong' && 
  css`
    height: 100%;
    align-items: flex-start;
    overflow-y: scroll;
    scrollbar-width: none;
    &::-webkit-scrollbar {
    display: none;
    }
  `}
`;

export const SignUpForm = styled.form <{role: string}>`
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  width: 645px;
  height: 500px;
  gap: 32px;
  justify-content: center;

  p,h1,h3{
    margin: 0;
  }

  ${props => 
  props.role === 'ong' && 
  css`
    justify-content: flex-start;
    margin-top: 69px;
  `}
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