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

  /**
   * Caminho ou URL da imagem usada como logo.
   */
  Logo: string;

  user: User | null;
  isLoggedIn: boolean;


}

export type Role = 'ADMIN' | 'NGO_ADMIN' | 'NGO_MEMBER' | 'REGULAR';

export type HeaderOptions = {
  accountOptions: string[];
  navigationOptions: string[];
}