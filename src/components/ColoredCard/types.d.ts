export interface ICard {
    title: string;
    background_color?: string;
    image_url?: string;
    image_url_mobile?: string;

    background_image?: string;
    to: string;
    children: React.ReactNode;

  }