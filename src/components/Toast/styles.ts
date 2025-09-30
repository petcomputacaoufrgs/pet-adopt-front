import styled from 'styled-components';

interface ToastContainerProps {
  isVisible: boolean;
  toastType: 'success' | 'error';
}

export const ToastContainer = styled.div<ToastContainerProps>`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 16px 20px;
  max-width: 400px;
  min-width: 300px;
  z-index: 1000;
  transform: translateX(${props => props.isVisible ? '0' : '100%'});
  opacity: ${props => props.isVisible ? '1' : '0'};
  transition: all 0.3s ease-in-out;
  
  /* Barra lateral colorida */
  border-left: 4px solid ${props => 
    props.toastType === 'success' 
      ? '#10B981'
      : '#EF4444'
  };
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
