import { Stringifier } from "styled-components/dist/types";

export interface ICard {
  title: string;
  subtitle: string;
  buttonTitle: string;
  background_color: string;
  to: string;
  position: string;
  children: React.ReactNode;
}