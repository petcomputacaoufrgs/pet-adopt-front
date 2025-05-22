import React from "react";
import { StyledInput } from "./styles"
import { Eye, EyeOff, CircleAlert} from "lucide-react";
import { error } from "console";
import { on } from "events";


interface LargeInputProps {
  title: string; // Título do input
  required: boolean; // Se é um atributo obrigatório. Se for true, coloca um asterisco no título indicando a obrigatoriedade
  visible: boolean; // Se for true, a senha vai ser mostrada. Se for false, a senha vai ser escondida
  isDisabled: boolean; // Se for true, o input vai ser desabilitado. Se for false, o input vai estar habilitado
  $fontSize: string; // Tamanho da fonte do input
  placeholder: string; // Placeholder do input
  $width: string; // Comprimento do input
  value: string; // Estado que vai guardar o valor atual do input
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // Função que controla o que vai acontecer quando ocorrer uma mudança no input. É obrigatória
  onClick?: () => void; // Função que controla o que vai acontecer quando o input for clicado. Não é obrigatória
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void,
  $paddingRight?: string; // Espaço vazio à direita deixado pelo inpuit. O padrão é o mesmo que o espaço deixado à esquerda (24px). Pode ser ajustado caso se adicione algo à direita (um botão de revelar senha, por exemplo)
  $readOnly?: boolean; // Indica se o input é apenas para leitura. Se for true, o usuário não pode digitar nada nele
  $inputType?: string; // Indica o tipo do input. Atualmente tem dois tipos: "Primário" - o input com fundo mais laranja, e qualquer outra string indica o tipo secundário, com fundo branco
  error?: boolean;
  errorMessage?: string;
  children?: React.ReactNode; // children é o atributo especial do React quie vai conter tudo o que for declarado entre as tags de abrir e fechar do componente: <LargeInput ...>{algo}</LargeInput> 
  // Pra colocar qualquer coisa ao lado do input. Um botão para abaixar/subir o dropdown, um botão para revelar/esconder senha, por exemplo
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

  const [visible, setVisible] = React.useState(false);

  function switch_visibility() {
   setVisible(!visible);
  }

  return (
    isDisabled ? ( // Se o input estiver desabilitado, renderiza o input disabled
     <>
       {title && (
        <label
          style={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: $fontSize,
            fontWeight: 700,
            color: '#553525',
            marginBottom: '6px',
            opacity: 0.5,
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
          alignItems: 'left',
          flexDirection: 'column',
          opacity: 0.5,
        }}
      >

        <StyledInput
          disabled = {true}
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

        <div style={{
          fontFamily: 'Nunito Sans, sans-serif',
          fontSize: `calc(${$fontSize} - 2px)`,
          color: '#553525',
          textAlign: 'right',
          opacity: 0.5,
        }}>

          <p>Máximo de 272 caracteres.</p>

        </div>

      </div>

      </>
    ) 
    
    : // Se o input não estiver desabilitado, renderiza o input normalmente
    
    (

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
          alignItems: 'left',
          flexDirection: 'column',
        }}
      >

        <StyledInput
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

        <div style={{
          fontFamily: 'Nunito Sans, sans-serif',
          fontSize: `calc(${$fontSize} - 2px)`,
          color: '#553525',
          textAlign: 'right',
        }}>

          <p>Máximo de 272 caracteres.</p>

        </div>

      </div>

    

      {error && errorMessage && (
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "8px"}}>
          
          <CircleAlert color="#FF3B30" size={`calc(${$fontSize} - 2px)`} />
          
          <span style={{
            color: '#FF3B30',
            fontSize: `calc(${$fontSize} - 2px)`,
            fontWeight: 500,
            fontFamily: 'Nunito Sans, sans-serif'
          }}>
            {errorMessage}
          </span>
          
          </div>
        )}
      </>

    )
  );
}

export default function LargeInput()
{
  const [texto, settexto] = React.useState(''); 

  return(
    <LargeInputField
        title="Lorem ipsum" 
        required = {true} 
        visible = {false}
        isDisabled = {false}
        $fontSize="16px" 
        placeholder="Lorem Ipsum" 
        $width="735px" 
        value={texto}
        onChange={(e) => {settexto(e.target.value)}}
    />);
}

