import React from "react";
import { StyledInput, Label, Container, InfoText, ErrorContainer, ErrorMessage } from "./styles";
import { CircleAlert } from "lucide-react";

interface LargeInputProps {
  title: string; // Título do input
  required: boolean; // Se é obrigatório (mostra asterisco)
  visible: boolean; // Se a senha vai ser mostrada (não usado aqui, mas mantido)
  isDisabled: boolean; // Se o input vai estar desabilitado
  $fontSize: string; // Tamanho da fonte do input
  placeholder: string; // Placeholder do input
  $width: string; // Largura do input
  value: string; // Valor atual do input
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // Função para mudança do valor
  onClick?: () => void; // Função para clique (opcional)
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void; // Função para tecla pressionada (opcional)
  $paddingRight?: string; // Espaço à direita do input (padrão 24px)
  $readOnly?: boolean; // Se é somente leitura
  $inputType?: string; // Tipo do input ("Primário" ou outro)
  error?: boolean; // Indica erro
  errorMessage?: string; // Mensagem de erro
  children?: React.ReactNode; // Elementos extras ao lado do input
}

function LargeInputField({
  title,
  required,
  $fontSize,
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
  isDisabled,
}: LargeInputProps) {
  
  // Renderiza o label, com asterisco se obrigatório
  const renderLabel = () => (
    title && (
      <Label
        $fontSize={$fontSize}
        isDisabled={isDisabled}
      >
        {title}
        {required && <span style={{ color: "#F17D6E" }}> *</span>}
      </Label>
    )
  );

  return (
    <>
      {renderLabel()}
      <Container $width={$width} isDisabled={isDisabled}>
        <StyledInput
          disabled={isDisabled}
          $readOnly={$readOnly}
          $width={$width}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          $fontSize={$fontSize}
          onClick={onClick}
          onKeyDown={onKeyDown}
          $paddingRight={$paddingRight}
          $inputType={$inputType}
          $error={error}
          maxLength={272}
        />
        {children}
        <InfoText $fontSize={$fontSize}>Máximo de 272 caracteres.</InfoText>
      </Container>

      {/* Exibe mensagem de erro se houver */}
      {error && errorMessage && (
        <ErrorContainer>
          <CircleAlert color="#FF3B30" size={`calc(${$fontSize} - 2px)`} />
          <ErrorMessage $fontSize={$fontSize}>
            {errorMessage}
          </ErrorMessage>
        </ErrorContainer>
      )}
    </>
  );
}

export default LargeInputField;
