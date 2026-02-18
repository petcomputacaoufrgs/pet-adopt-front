export interface ISignUpToggle{
    selected: string; // 'ong' ou 'membro'
    onSelect: (value: string) => void; // Função para alterar o estado selecionado
}