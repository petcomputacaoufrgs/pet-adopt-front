export interface IDropdownButtonProps {
    label: string; // Texto no botão
    options: string[]; // Lista de strings indicando as opções possíveis
    
    onClick: any; // Ou uma única função que toma o evento de clique ou uma lista de funções que tomam o evento de clique. Se for uma função única, cada opção do dropDown, ao ser clicada, executará essa função. 
    // Se for uma lista de funções, faz um mapeamento por índice das opções para a função. A lista de funções deve ter o mesmo comprimento da lista de opções
    
    indicator?: (showOptions: boolean) => React.ReactNode; // Indicador de que o dropDown está abaixado ou não. É uma função que recebe um valor booleano e retorna um nodo React. 
    // O valor booleano é o estado que indica se o DropDown está abaixado, e o nodo retornado é colocado ao lado da label no botão
    
    showOptionsOnHover?: boolean; // Se for false (padrão), o DropDown será mostrado com clique no botão. Se for true, ele será mostrado com hover
    buttonWidth?: string; // Tamanho do botão
    dropDownWidth?: string; // Tamanho do DropDown
    fontSize?: string; // Tamanho da fonte no botão e no DropDown
    buttonType?: string; // Tipo do botão (Primário = "Primário", Secundário = qualquer outra string)
  }