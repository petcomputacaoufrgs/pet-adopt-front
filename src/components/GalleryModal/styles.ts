import styled, {css} from 'styled-components';
import { StyledCloseButtonProps } from '../CloseButton/types';

export const GalleryContainer = styled.div `
    width: 49.1666667vw; // 944px em vw utilizando 1920px como base
    min-width: 450px;
    height: 40vw; // 768px em vw utilizando 1920px como base
    min-height: 350px;

    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;
`

export const NavigatorContainer = styled.div `
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    gap: 02.5vw; // 48px em vw utilizando 1920px como base
`

export const NavigatorButton = styled.div `
    
    width: 02.6041667vw; // 50px em vw utilizando 1920px como base
    min-width: 25px;
    height: 02.6041667vw; // 50px em vw utilizando 1920px como base
    min-height: 25px;

    display: flex;

    justify-content: center;
    align-items:center;

    cursor: pointer;

    background-color: #ffffffff;
    border-radius: 999px;

    &:hover{
        background-color: #FF9944;
        transform: scale(0.95);
    }

`

export const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 12px;
  padding: 24px;
  z-index: 1000;
  max-width: 944px;
  width: 90%;
  background-color: transparent;
  color: rgba(86, 53, 38, 1);
  text-align: center;
  justify-content: center;
  align-items: center;

  display: flex;              
  flex-direction: column;    
  justify-content: center;
  align-items: center;
`;

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export const TopBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const BottomBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  padding-top: 28px;
`;

export const Image = styled.img`
  width: 38.9583333vw; // 748px em vw utilizando 1920px como base
  min-width: 350px;
  height: 40vw; // 768px em vw utilizando 1920px como base
  min-height: 350px;
  object-fit: cover;
  border-radius: 12px;
`;

export const CloseButtonStyled = styled.button<StyledCloseButtonProps>`
  width: 02.1875vw; // 42px em vw utilizando 1920px como base
  min-width: 25px;
  height: 02.1875vw; // 42px em vw utilizando 1920px como base
  min-height: 25px;
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