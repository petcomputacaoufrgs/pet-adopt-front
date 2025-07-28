import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: 999;
`;

export const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 12px;
  padding: 24px;
  z-index: 1000;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 246, 232, 1);
  color: rgba(86, 53, 38, 1);
  text-align: center;
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Title = styled.h2`
  margin-top: 0;
`;

export const Message = styled.p`
  margin: 16px 0;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
  width: 100%;
`;

export const ButtonWrapper = styled.div`
  flex: 1;
`;


