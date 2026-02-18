export interface ICard {
  title: string;
  subtitle: string;
  buttonTitle: string;
  backgroundColor: string;
  to: string;
  position: string;
  children: React.ReactNode;
}