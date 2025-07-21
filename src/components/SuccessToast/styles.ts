import styled from 'styled-components';

export const ToastContainer = styled.div<{ isVisible: boolean }>`

  position: fixed; /* <-- fixa na tela */
  top: 110px;
  right: 60px;
  z-index: 2000;


  background-color: #fff7ed;
  border-radius: 8px;
  padding: 16px 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-left: 6px solid #22c55e;
  max-width: 400px;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  gap: 4px;

  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.isVisible ? '0' : '-10px')});
  transition: opacity 0.4s ease, transform 0.4s ease;
`;

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end; 
`;

export const Title = styled.div`
  font-weight: bold;
  color: #422006;
`;

export const Description = styled.div`
  color: #78350f;
  font-size: 14px;
`;
