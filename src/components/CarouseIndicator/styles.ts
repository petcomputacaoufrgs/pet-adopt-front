import styled, {css} from 'styled-components';

export const IndicatorContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 00.4166667vw; // 8px em vw utilizando 1920px como base
`;

export const IndicatorBar = styled.div<{$isActive:boolean}>`

  width: 00.625vw; /* 12px em vw utilizando 1920px como base */
  min-width: 9px;
  height: 00.625vw; /* 12px em vw utilizando 1920px como base */
  min-height: 9px;
  cursor: pointer;

  background-color: #ffffffff;
  border-radius: 999px;

  transition: all 0.2s ease-in-out;

  ${props =>
    props.$isActive &&
    css`
      background-color: #FF9944;
      width: 01.6666667vw; // 32px em vw utilizando 1920px como base
      min-width: 24px;
    `}
`;