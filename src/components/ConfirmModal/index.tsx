import React from 'react';
import {
  Backdrop,
  ModalWrapper,
  Title,
  Message,
  ButtonGroup,
  ButtonWrapper,
  TopBar
} from './styles';
import { ConfirmModalProps } from './types';
import CloseButton from '../CloseButton';
import PrimarySecondaryButton from '../PrimarySecondaryButton';
const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <>
      <Backdrop onClick={onClose} />
      <ModalWrapper>
        <TopBar>
         <CloseButton themeMode="dark" onClick={onClose} />
        </TopBar>
        <Title>{title}</Title>
        <Message>{message}</Message>
     <ButtonGroup>
        <ButtonWrapper>
            <PrimarySecondaryButton
            buttonType="Secundário"
            content={cancelLabel}
            onClick={onClose}
            paddingV='8px'
            $flex
            />
        </ButtonWrapper>
        <ButtonWrapper>
            <PrimarySecondaryButton
            buttonType="Primário"
            content={confirmLabel}
            onClick={onConfirm}
            paddingV='8px'
            $flex
            />
        </ButtonWrapper>
        </ButtonGroup>

      </ModalWrapper>
    </>
  );
};

export default ConfirmModal;
