import styled from "styled-components";

export const SignUpContainer = styled.div`
  font-family: "Nunito Sans", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  overflow: auto;
  background-color: #fff6e8;
`;

export const SignUpForm = styled.form`
  background: #ffffff;
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

export const RoleToggleContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 0.5rem 0;
  border-radius: 4px;
  overflow: hidden;
`;

export const RoleToggleButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 0.8rem;
  background-color: ${props => props.active ? '#f17d6e' : '#f5f5f5'};
  color: ${props => props.active ? 'white' : '#333'};
  border: 1px solid #ccc;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:first-child {
    border-radius: 4px 0 0 4px;
  }

  &:last-child {
    border-radius: 0 4px 4px 0;
  }

  &:hover {
    background-color: ${props => props.active ? '#e06657' : '#e9e9e9'};
  }
`;

export const FormTitle = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
`;