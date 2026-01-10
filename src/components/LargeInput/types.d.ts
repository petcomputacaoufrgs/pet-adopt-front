export interface LargeInputProps {
  title: string; // Título do input
  required: boolean; // Se é obrigatório (mostra asterisco)
  visible: boolean; // Se a senha vai ser mostrada (não usado aqui, mas mantido)
  isDisabled: boolean; // Se o input vai estar desabilitado
  $fontSize: string; // Tamanho da fonte do input
  placeholder: string; // Placeholder do input
  $width: string; // Largura do input
  $height?: string; // Altura do input
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
  maxLength?: number; // Máximo de caracteres permitidos
}