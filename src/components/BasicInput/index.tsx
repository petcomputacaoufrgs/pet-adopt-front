import { StyledInput } from "./styles"

interface BasicInputProps {
  title: string; // Título do input
  required: boolean; // Se é um atributo obrigatório. Se for true, coloca um asterisco no título indicando a obrigatoriedade
  fontSize: string; // Tamanho da fonte do input
  placeholder: string; // Placeholder do input
  width: string; // Comprimento do input
  value: string; // Estado que vai guardar o valor atual do input
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Função que controla o que vai acontecer quando ocorrer uma mudança no input. É obrigatória
  onClick?: () => void; // Função que controla o que vai acontecer quando o input for clicado. Não é obrigatória
  paddingRight?: string; // Espaço vazio à direita deixado pelo inpuit. O padrão é o mesmo que o espaço deixado à esquerda (24px). Pode ser ajustado caso se adicione algo à direita (um botão de revelar senha, por exemplo)
  readOnly?: boolean; // Indica se o input é apenas para leitura. Se for true, o usuário não pode digitar nada nele
  inputType?: string; // Indica o tipo do input. Atualmente tem dois tipos: "Primário" - o input com fundo mais laranja, e qualquer outra string indica o tipo secundário, com fundo branco
  children?: React.ReactNode; // children é o atributo especial do React quie vai conter tudo o que for declarado entre as tags de abrir e fechar do componente: <BasicInput ...>{algo}</BasicInput> 
  // Pra colocar qualquer coisa ao lado do input. Um botão para abaixar/subir o dropdown, um botão para revelar/esconder senha, por exemplo
}

export default function BasicInput({
  title,
  required,
  fontSize,
  placeholder,
  width,
  value,
  onChange,
  onClick,
  paddingRight = "24px",
  readOnly = false,
  inputType = "Primário",
  children,
}: BasicInputProps) {
  return (
    <>
      {title && (
        <label
          style={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: fontSize,
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
          width: width,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <StyledInput
          readOnly={readOnly}
          width={width}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          fontSize={fontSize}
          onClick={onClick}
          paddingRight={paddingRight}
          inputType={inputType}
        />

        {children}
      </div>
    </>
  );
}
