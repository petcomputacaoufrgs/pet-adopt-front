import { CloseButtonStyled } from './styles';
import { CloseButtonProps } from './types';
import { ReactComponent as Close } from '../../assets/close.svg';

export default function CloseButton({ themeMode, disabled, onClick }: CloseButtonProps) {
  return (
    <CloseButtonStyled
      type='button'
      themeMode={themeMode}
      disabled={disabled}
      onClick={onClick}
      aria-label="Fechar"
    >
        <Close width={16} height={16}/>
    </CloseButtonStyled>
  );
}
