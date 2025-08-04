import styled, { css } from 'styled-components';

export const ToggleContainer = styled.div`

  background-color: #FFF1D7;
  border-radius: 999px; // Um valor alto para garantir bordas perfeitamente redondas
  padding: 0.3rem; // Espaçamento interno
  width: 100%; // O contêiner se ajusta ao tamanho dos botões

  display: flex;
  justify-content: center;

`;

export const ToggleButton = styled.button  <{$isActive:boolean}>`

  /* Estilos do botão INATIVO */
  background-color: transparent;
  color: #99867C; // Cor do texto inativo

  width: 100%; // O botão ocupa todo o espaço do contêiner
  border: none;
  border-radius: 999px;
  padding: 1rem;

  font-size: 1rem;
  font-weight: 600;

  cursor: pointer;
  transition: 0.3s ease-in-out;

  /* Se a prop "isActive" for true, aplica os estilos de ATIVO */
  ${props =>
    props.$isActive &&
    css`
      background-color: #FF9944; // Laranja principal
      color: #553525; // Texto branco
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    `}
`;