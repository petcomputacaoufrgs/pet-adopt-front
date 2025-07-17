import React from "react";
import { CircleAlert } from "lucide-react"; // Assumindo que CircleAlert é importado corretamente de lucide-react

import { Container, ErrorContainer, ErrorMessage, InfoText, Label, StyledInput } from "./styles";
import { LargeInputProps } from "./types"; // Importando LargeInputProps de um arquivo types separado, conforme indicado

const LargeInputField: React.FC<LargeInputProps> = ({
  title,
  required,
  $fontSize: fontSize, // Renomeado para camelCase e mantido o prefixo $ para styled-components
  placeholder,
  $width: inputWidth, // Renomeado para camelCase
  value,
  onChange,
  onClick,
  onKeyDown,
  $paddingRight: paddingRight = "24px", // Renomeado para camelCase e mantido o prefixo $ para styled-components
  $readOnly: readOnly = false, // Renomeado para camelCase e mantido o prefixo $ para styled-components
  $inputType: inputType = "Primário", // Renomeado para camelCase e mantido o prefixo $ para styled-components
  error: hasError = false, // Renomeado para camelCase
  errorMessage: errorText, // Renomeado para camelCase
  children,
  isDisabled,
}) => {
  // Renderiza o label, com asterisco se obrigatório
  const renderLabel = () =>
    title && (
      <Label $fontSize={fontSize} isDisabled={isDisabled}>
        {title}
        {required && <span style={{ color: "#F17D6E" }}> *</span>}
      </Label>
    );

  return (
    <>
      {renderLabel()}
      <Container $width={inputWidth} isDisabled={isDisabled}>
        <StyledInput
          disabled={isDisabled}
          $readOnly={readOnly}
          $width={inputWidth}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          $fontSize={fontSize}
          onClick={onClick}
          onKeyDown={onKeyDown}
          $paddingRight={paddingRight}
          $inputType={inputType}
          $error={hasError}
          maxLength={272}
        />
        {children}
        <InfoText $fontSize={fontSize}>Máximo de 272 caracteres.</InfoText>
      </Container>

      {/* Exibe mensagem de erro se houver */}
      {hasError && errorText && (
        <ErrorContainer>
          <CircleAlert color="#FF3B30" size={`calc(${fontSize} - 2px)`} />
          <ErrorMessage $fontSize={fontSize}>{errorText}</ErrorMessage>
        </ErrorContainer>
      )}
    </>
  );
};

export default LargeInputField;