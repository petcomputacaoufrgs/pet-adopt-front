export interface IDropdownButtonProps {
    content: string | ReactNode; // Conteúdo do botão. Pode ser um texto (string) ou um nodo React completo
    options: string[]; // Lista de strings indicando as opções possíveis
    
    onClick: (selected: string) => void; // Uma única função que recebe a opção selecionada e diz o que tem de ser feito
    
    indicator?: (showOptions: boolean) => React.ReactNode; // Indicador de que o dropDown está abaixado ou não. É uma função que recebe um valor booleano e retorna um nodo React. 
    // O valor booleano é o estado que indica se o DropDown está abaixado, e o nodo retornado é colocado ao lado da label no botão
    
    showOptionsOnHover?: boolean; // Se for false (padrão), o DropDown será mostrado com clique no botão. Se for true, ele será mostrado com hover
    buttonWidth?: string; // Tamanho do botão
    dropDownWidth?: string; // Tamanho do DropDown
    fontSize?: string; // Tamanho da fonte no botão e no DropDown
    buttonType?: string; // Tipo do botão (Primário = "Primário", Secundário = qualquer outra string)
    paddingH?: string; 
    paddingV?: string;
}