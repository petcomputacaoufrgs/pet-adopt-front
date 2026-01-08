export interface ISearchBar{
    options : string[]; // Opções que aparecerão no DropDown
    width: string; // Comprimento tanto do input quanto do DropDown
    fontSize: string; // Tamanho da fonte tanto no input quanto nas opções do DropDown
    titleFontSize?: string; // Tamanho da fonte do título do input. Se não for definido, o padrão é o mesmo que o tamanho da fonte do input
    placeholder: string; // Placeholder do input
    title: string; // Título que vai antes do input
    required: boolean; // Se o input é obrigatório. Se for, coloca um asterisco "*" no título
    query: string;
    setQuery: (query: string) => void;
    inputType?: string; // Tipo do input. Atualmete são dois: "Primário", com fundo mais laranja, e qualquer outra string indica o tipo secundário, com fundo branco
    error?: boolean; // eventualmente vamos ter que ver como será feita a validação deste erro. Por enquanto o erro tá só sendo propagado entre componentes e está estático.
    errorMessage?: string;
    readOnly?: boolean; // Se o input é apenas para leitura. Se for true, o usuário não pode digitar nada dele
    resetOption?: string; // Se definida, o usuário pode clicar na opção com o valor passado para limpar o input
    numOptionsShowed?: number; // Quantas opções devem ser mostradas no DropDown. Se não for definido, o padrão é 5
    verticalPadding?: string; // Espaçamento vertical interno do input, ou seja, padding-top e padding-bottom
    gapFromTitle?: string; // Espaçamento entre o título e o input
}