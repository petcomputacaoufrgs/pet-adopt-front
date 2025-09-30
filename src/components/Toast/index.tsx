import { ToastProps } from './types';
import {
  ToastContainer,
  TitleRow,
  Title,
  Description
} from './styles';
import CloseButton from '../CloseButton';

export default function Toast({ 
  message, 
  description, 
  onClose, 
  isVisible, 
  type = 'success' 
}: ToastProps) {
  return (
    <ToastContainer isVisible={isVisible} toastType={type}>
      <TitleRow>
        <Title>{message}</Title>
        <CloseButton themeMode="dark" onClick={onClose} />
      </TitleRow>
      {description && <Description>{description}</Description>}
    </ToastContainer>
  );
}