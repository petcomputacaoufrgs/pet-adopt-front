export interface PasswordInputProps {
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