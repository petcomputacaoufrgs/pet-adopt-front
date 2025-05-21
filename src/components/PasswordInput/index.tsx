import { StyledInput } from "./styles"
import { Eye } from "lucide-react";


interface PasswordInputProps {
  title: string; // Título do input
  required: boolean; // Se é um atributo obrigatório. Se for true, coloca um asterisco no título indicando a obrigatoriedade
  $fontSize: string; // Tamanho da fonte do input
  placeholder: string; // Placeholder do input
  $width: string; // Comprimento do input
  value: string; // Estado que vai guardar o valor atual do input
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Função que controla o que vai acontecer quando ocorrer uma mudança no input. É obrigatória
  onClick?: () => void; // Função que controla o que vai acontecer quando o input for clicado. Não é obrigatória
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
  $paddingRight?: string; // Espaço vazio à direita deixado pelo inpuit. O padrão é o mesmo que o espaço deixado à esquerda (24px). Pode ser ajustado caso se adicione algo à direita (um botão de revelar senha, por exemplo)
  $readOnly?: boolean; // Indica se o input é apenas para leitura. Se for true, o usuário não pode digitar nada nele
  $inputType?: string; // Indica o tipo do input. Atualmente tem dois tipos: "Primário" - o input com fundo mais laranja, e qualquer outra string indica o tipo secundário, com fundo branco
  error?: boolean;
  errorMessage?: string;
  children?: React.ReactNode; // children é o atributo especial do React quie vai conter tudo o que for declarado entre as tags de abrir e fechar do componente: <PasswordInput ...>{algo}</PasswordInput> 
  // Pra colocar qualquer coisa ao lado do input. Um botão para abaixar/subir o dropdown, um botão para revelar/esconder senha, por exemplo
}

export default function PasswordInput({
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
}: PasswordInputProps) {
  return (
    <>
      {title && (
        <label
          style={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: $fontSize,
            fontWeight: 700,
            color: '#553525',
            marginBottom: '6px',
          }}
        >
          {title}
          {required && <span style={{ color: '#F17D6E' }}> *</span>}
        </label>
      )}

      <div
        style={{
          width: $width,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <StyledInput
          $readOnly={$readOnly}
          $width={$width}
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

        <div style={{
          position: 'absolute',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
        }}>
          <Eye size={20}/> 

        </div>


        {children}
      </div>


      {error && errorMessage && (
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "8px"}}>
          
          <svg width={`${parseFloat($fontSize) - 6}px`} height={`${parseFloat($fontSize) - 5}px`} viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.63159 3C6.96159 3 7.23159 3.27 7.23159 3.6V6C7.23159 6.33 6.96159 6.6 6.63159 6.6C6.30159 6.6 6.03159 6.33 6.03159 6V3.6C6.03159 3.27 6.30159 3 6.63159 3ZM6.62559 0C3.31359 0 0.631592 2.688 0.631592 6C0.631592 9.312 3.31359 12 6.62559 12C9.94359 12 12.6316 9.312 12.6316 6C12.6316 2.688 9.94359 0 6.62559 0ZM6.63159 10.8C3.97959 10.8 1.83159 8.652 1.83159 6C1.83159 3.348 3.97959 1.2 6.63159 1.2C9.28359 1.2 11.4316 3.348 11.4316 6C11.4316 8.652 9.28359 10.8 6.63159 10.8ZM7.23159 9H6.03159V7.8H7.23159V9Z" fill="#FF3B30"/>
          </svg>
          
          <span style={{
            color: '#FF3B30',
            fontSize: `calc(${$fontSize} - 6px)`,
            fontWeight: 500,
            fontFamily: 'Nunito Sans, sans-serif'
          }}>
            {errorMessage}
          </span>
          
          </div>
        )}

    </>
  );
}
