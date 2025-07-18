import styled from "styled-components";

export const Container = styled.div`
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

export const LoginForm = styled.form`
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  margin-top: 1rem;
  background-color: #f17d6e;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #e06657;
  }
`;