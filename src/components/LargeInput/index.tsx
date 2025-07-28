import React from "react";
import { CircleAlert } from "lucide-react"; // Assumindo que CircleAlert é importado corretamente de lucide-react

import { Container, ErrorContainer, ErrorMessage, InfoText, Label, RequiredAsterisk, StyledInput} from "./styles";
import { LargeInputProps } from "./types"; // Importando LargeInputProps de um arquivo types separado, conforme indicado

const LargeInputField: React.FC<LargeInputProps> = ({
  title,
  required,
  $fontSize: fontSize, 
  placeholder,
  $width: inputWidth, 
  value,
  onChange,
  onClick,
  onKeyDown,
  $paddingRight: paddingRight = "24px", 
  $readOnly: readOnly = false, 
  $inputType: inputType = "Primário", 
  error: hasError = false, 
  errorMessage: errorText, 
  children,
  isDisabled,
}) => { const renderLabel = () =>
    title && (
      <Label $fontSize={fontSize} isDisabled={isDisabled}>
        {title}
        {required && <span style={{ color: "#F17D6E" }}> *</span>}
      </Label>
    );
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {title && (
        <Label $fontSize={fontSize} isDisabled={isDisabled}>
          {title}
          {required && <RequiredAsterisk> *</RequiredAsterisk>}
        </Label>
      )}      

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

      {hasError && errorText && (
        <ErrorContainer>
          <CircleAlert color="#FF3B30" size={`calc(${fontSize} - 2px)`} />
          <ErrorMessage $fontSize={fontSize}>{errorText}</ErrorMessage>
        </ErrorContainer>
      )}
    </div>
  );
};

export default LargeInputField;