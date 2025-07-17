import React from "react";

import {
  Container,
  ErrorMessageContainer,
  Label,
  RequiredAsterisk,
  StyledInput,
} from "./styles";

import { BasicInputProps } from "./types";

function BasicInput({
  title,
  required,
  $fontSize,
  $titleFontSize = $fontSize,
  placeholder,
  $width,
  value,
  onChange,
  onClick,
  onKeyDown,
  $paddingRight = "24px",
  $readOnly = false,
  $inputType = "Primário",
  error = false,
  errorMessage,
  children,
}: BasicInputProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {title && (
        <Label $fontSize={$fontSize}>
          {title}
          {required && <RequiredAsterisk> *</RequiredAsterisk>}
        </Label>
      )}

      <Container $width={$width}>
        <StyledInput
          id={title}
          readOnly={$readOnly}
          $readOnly={$readOnly}
          $width={"100%"}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          $fontSize={$fontSize}
          onClick={onClick}
          onKeyDown={onKeyDown}
          $paddingRight={$paddingRight}
          $inputType={$inputType}
          $error={error}
        />

        {children}
      </Container>

      {error && errorMessage && (
        <ErrorMessageContainer $fontSize={$fontSize}>
          <svg
            viewBox="0 0 13 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M6.63159 3C6.96159 3 7.23159 3.27 7.23159 3.6V6C7.23159 6.33 6.96159 6.6 6.63159 6.6C6.30159 6.6 6.03159 6.33 6.03159 6V3.6C6.03159 3.27 6.30159 3 6.63159 3ZM6.62559 0C3.31359 0 0.631592 2.688 0.631592 6C0.631592 9.312 3.31359 12 6.62559 12C9.94359 12 12.6316 9.312 12.6316 6C12.6316 2.688 9.94359 0 6.62559 0ZM6.63159 10.8C3.97959 10.8 1.83159 8.652 1.83159 6C1.83159 3.348 3.97959 1.2 6.63159 1.2C9.28359 1.2 11.4316 3.348 11.4316 6C11.4316 8.652 9.28359 10.8 6.63159 10.8ZM7.23159 9H6.03159V7.8H7.23159V9Z"
              fill="#FF3B30"
            />
          </svg>
          <span>{errorMessage}</span>
        </ErrorMessageContainer>
      )}
    </div>
  );
}

export default BasicInput;