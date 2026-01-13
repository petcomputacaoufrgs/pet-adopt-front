import styled from "styled-components";

export const StyledInput = styled.input<{
  $width: string;
  $fontSize: string;
  $paddingRight: string;
  $paddingVertical: string;
  $readOnly: boolean;
  $inputType: string;
  $error: boolean;
  $disabled?: boolean;
}>`
  font-family: 'Nunito Sans', sans-serif;
  width: ${({ $width }) => $width};
  font-size: ${({ $fontSize }) => $fontSize};
  box-sizing: border-box;
  padding-top: ${({ $paddingVertical }) => $paddingVertical};
  padding-bottom: ${({ $paddingVertical }) => $paddingVertical};
  padding-right: ${({ $paddingRight }) => $paddingRight};
  padding-left: 24px;
  border-radius: 100px;

  background-color: ${({ $inputType, $disabled }) => {
    if ($disabled) return "#EBEBE4"; // Cor cinza padrão de disabled
    return $inputType === "Primário" ? "#FFF3DF" : "#FFFFFF";
  }};

  border: ${({ $error, $inputType, $disabled }) => {
    if ($disabled) return "1px solid #D1D1D1";
    if ($error) return "1px solid #FF3B30";
    return $inputType === "Primário" ? "1px solid #FFC99C" : "1px solid #BCAFA9";
  }};

  color: ${({ $disabled }) => ($disabled ? "#A0A0A0" : "#553525")};

  // Cursor e interação
  &:hover {
    cursor: ${({ $readOnly, $disabled }) => {
      if ($disabled) return "not-allowed";
      if ($readOnly) return "pointer"; // Modo Seleção
      return "text"; // Modo Busca/Texto
    }};
  }

  &:focus {
    outline: none;
    // Se estiver disabled, não muda a borda no foco
    border: ${({ $error, $inputType, $disabled }) => {
      if ($disabled) return "1px solid #D1D1D1";
      return $error ? "1px solid #FF3B30" : $inputType === "Primário" ? "1px solid #FF9944" : "1px solid #755B4D";
    }};
  }

  // Remove cor de fundo do autofill se necessário, ou ajusta opacidade
  &:disabled {
    opacity: 1; /* Garante que a cor de fundo definida acima funcione no iOS/Safari */
  }
`;

export const Label = styled.label<{ $fontSize: string }>`
  font-family: 'Nunito Sans', sans-serif;
  font-size: ${({ $fontSize }) => $fontSize};
  font-weight: 700;
  color: #553525;
  display: block;
`;

export const RequiredAsterisk = styled.span`
  color: #F17D6E;
`;

export const Container = styled.div<{ $width: string }>`
  width: ${({ $width }) => $width};
  position: relative;
  display: flex;
  align-items: center;
`;

export const ErrorMessageContainer = styled.div<{ $fontSize: string }>`
  display: flex;
  align-items: center;
  gap: 6px;

  & > span {
    color: #FF3B30;
    font-size: calc(${({ $fontSize }) => $fontSize} - 0.125em);
    font-weight: 500;
    font-family: 'Nunito Sans', sans-serif;
  }

  svg {
    width: calc(${({ $fontSize }) => $fontSize} - 0.125em);
    height: calc(${({ $fontSize }) => $fontSize} - 0.125em);
  }
`;
