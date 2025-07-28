import { SuccessToastProps } from './types';
import {
  ToastContainer,
  TitleRow,
  Title,
  Description
} from './styles';
import CloseButton from '../CloseButton';

export default function SuccessToast({ message, description, onClose ,  isVisible}: SuccessToastProps) {
  return (
    <ToastContainer isVisible={isVisible}>
      <TitleRow>
        <Title>{message}</Title>
        <CloseButton themeMode="dark" onClick={onClose} />
      </TitleRow>
      {description && <Description>{description}</Description>}
    </ToastContainer>
  );
}
