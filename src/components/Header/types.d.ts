type User = {
  name: string;
  userOptions: string[];
  userOptionsToActions: (selected: string) => void;
};

export interface IHeader {
  /**
   * Cor de fundo do cabeçalho principal.
   * Pode ser utilizada para combinar com o tema da página.
   */
  color: string;

  /**
   * Objeto contendo informações sobre o usuário logado.
   * Se não fornecido, o componente assume que o usuário está deslogado.
   */
  user?: User;

  /**
   * Caminho ou URL da imagem usada como logo.
   */
  Logo: string;

  /**
   * Lista de opções de navegação exibidas no cabeçalho (ex: "Spbre nós", "Fale Conosco", "Adotar", "Doar", etc).
   */
  options: string[];

  /**
   * Função chamada ao clicar em qualquer uma das opções de navegação.
   * Recebe o texto da opção selecionada como argumento. Tipicamente, a função deve tratar de cada caso possível para as opções passadas
   */
  optionsToAction: (selected: string) => void;
}