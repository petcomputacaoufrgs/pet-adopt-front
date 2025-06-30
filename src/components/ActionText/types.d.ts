export interface ILink {
  children: React.ReactNode;
  onClick: (e: React.MouseEventHandler<HTMLParagraphElement, MouseEvent>) => void;
  width?: string;
  has_arrow_svg?: boolean;
  underline_on_hover?: boolean;
  font_size: string;
  text_color: string;
}