import styled, {css} from 'styled-components';

export const IndicatorContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px; /* Espaçamento entre as barras */
`;

export const IndicatorBar = styled.div<{$isActive:boolean}>`

  width: 12px;
  height: 12px;
  cursor: pointer;

  background-color: #ffffffff;
  border-radius: 999px;

  transition: all 0.2s ease-in-out;

  ${props =>
    props.$isActive &&
    css`
      background-color: #FF9944;
      width: 32px;
    `}
`;