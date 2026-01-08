import styled from "styled-components";

interface LabelProps {
  $fontSize: string;
  isDisabled: boolean;
}

export const Label = styled.label<LabelProps>`
  font-family: 'Nunito Sans', sans-serif;
  font-size: ${({ $fontSize }) => $fontSize};
  font-weight: 700;
  color: #553525;
  opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
`;

export const RequiredAsterisk = styled.span`
  color: #F17D6E;
`;

interface ContainerProps {
  $width: string;
  isDisabled: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: ${({ $width }) => $width};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
`;

interface StyledInputProps {
  $readOnly?: boolean;
  $width: string;
  $height?: string;
  $fontSize: string;
  $paddingRight: string;
  $inputType: string;
  $error?: boolean;
}

export const StyledInput = styled.textarea<StyledInputProps>`
  width: ${({ $width }) => $width};
  font-size: ${({ $fontSize }) => $fontSize};
  box-sizing: border-box;
  height: ${({ $height }) => $height || "104px"};
  padding-top: 8px;
  padding-right: ${({ $paddingRight }) => $paddingRight};
  padding-left: 24px;
  border-radius: 12px;
  border: ${({ $error, $inputType }) =>
    $error ? "1px solid #FF3B30" : $inputType === "Primário" ? "1px solid #FFC99C" : "1px solid #BCAFA9"};
  color: #553525;
  background-color: ${({ $inputType }) => ($inputType === "Primário" ? "#FFF3DF" : "#FFFFFF")};  resize: none;
  outline: none;
  font-family: 'Nunito Sans', sans-serif;
  color: #553525;
  ${({ $readOnly }) => $readOnly && 'pointer-events: none;'}
`;

interface InfoTextProps {
  $fontSize: string;
}

export const InfoText = styled.div<InfoTextProps>`
  font-family: 'Nunito Sans', sans-serif;
  font-size: calc(${({ $fontSize }) => $fontSize} - 2px);
  color: #553525;
  text-align: right;
  margin-top: 4px;
`;

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
`;

export const ErrorMessage = styled.span<InfoTextProps>`
  color: #FF3B30;
  font-size: calc(${({ $fontSize }) => $fontSize} - 2px);
  font-weight: 500;
  font-family: 'Nunito Sans', sans-serif;
`;
