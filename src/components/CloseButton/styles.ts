import styled from 'styled-components';
import { StyledCloseButtonProps } from './types';
export const CloseButtonStyled = styled.button<StyledCloseButtonProps>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: transparent;
  border: none;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

    color: ${({ themeMode }) =>
    themeMode === 'light' ? '#fff' : 'rgba(85, 53, 37, 1)'};

  ${({ disabled }) =>
    disabled &&
    `
      opacity: 0.3;
      cursor: not-allowed;
    `}

  &:hover,
  &:focus {
    background-color: ${({ themeMode }) =>
      themeMode === 'light' ? 'rgba(255, 255, 255, 1)' : 'rgba(85, 53, 37, 1)'};
    color: ${({ themeMode }) =>
      themeMode === 'light' ? 'rgba(85, 53, 37, 1)' : 'rgba(255, 255, 255, 1)'};
  }

  &:active {
    transform: scale(0.95);
  }



`;
