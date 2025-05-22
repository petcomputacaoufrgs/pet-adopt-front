import React from "react";
import { StyledInput } from "./styles"
import { Eye, EyeOff, CircleAlert} from "lucide-react";
import { error } from "console";
import { on } from "events";


interface PasswordInputProps {
  title: string; // Título do input
  required: boolean; // Se é um atributo obrigatório. Se for true, coloca um asterisco no título indicando a obrigatoriedade
  visible: boolean; // Se for true, a senha vai ser mostrada. Se for false, a senha vai ser escondida
  isDisabled: boolean; // Se for true, o input vai ser desabilitado. Se for false, o input vai estar habilitado
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

function PasswordInputField({
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
}: PasswordInputProps) {

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
            opacity: 0.3
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
          disabled = {true}
          $readOnly={false}
          $width={$width}
          type={void 0}
          value={void 0}
          onChange={void 0}
          placeholder={placeholder}
          $fontSize={$fontSize}
          onClick={void 0}
          onKeyDown={void 0}
          $paddingRight={$paddingRight}
          $inputType={$inputType}
          $error={error}
          style={{ opacity: 0.3, cursor: 'not-allowed' }} // Adiciona opacidade e cursor de não permitido
        />

        <div style={{
          position: 'absolute',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
          opacity: 0.3
        }}>
            <Eye color="#A39289" size={20}/>
        </div>


        {children}
      </div>
    </>) 
    
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
          alignItems: 'center',
        }}
      >

        <StyledInput
          $readOnly={$readOnly}
          $width={$width}
          type={visible ? 'text' : 'password'}
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

          {visible ? (
            <EyeOff color="#A39289" size={20} onClick={switch_visibility}/>
          ) : (
            <Eye color="#A39289" size={20} onClick={switch_visibility}/>
          )}         

        </div>


        {children}
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

function PasswordInput()
{
  const [senha, setSenha] = React.useState(''); 
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  function verificarSenhaFraca(senha: string) {
    if(senha.trim() === '') return setError(false), setErrorMessage;
    if (senha.length < 6) return setError(true), setErrorMessage("A senha deve ter pelo menos 6 caracteres");
    if (!/[A-Z]/.test(senha)) return setError(true), setErrorMessage("A senha deve ter pelo menos uma letra maiúscula");
    if (!/[0-9]/.test(senha)) return setError(true), setErrorMessage("A senha deve ter pelo menos um número");
    if (!/[!@#$%^&*]/.test(senha)) return setError (true), setErrorMessage("A senha deve ter pelo menos um caractere especial");
    return setError(false), setErrorMessage("");
  }

  return(
    <PasswordInputField
        title="Lorem ipsum" 
        required = {true} 
        visible = {false}
        isDisabled = {false}
        $fontSize="16px" 
        placeholder="Insira sua senha aqui" 
        $width="735px" 
        value={senha}
        onChange={(e) => {setSenha(e.target.value); verificarSenhaFraca(e.target.value)}}
        error={error}
        errorMessage={errorMessage} 
    />);
}

export default PasswordInput;