export interface ICard {
    title: string;
    backgroundColor?: string;
    imageUrl?: string;
    imageUrlMobile?: string;
    backgroundImage?: string;
    to: string;
    children: React.ReactNode;
  }