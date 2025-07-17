export interface ILink {
  children: React.ReactNode;
  onClick: (e: React.MouseEventHandler<HTMLParagraphElement, MouseEvent>) => void;
  width?: string;
  hasArrowSvg?: boolean;
  underlineOnHover?: boolean;
  fontSize: string;
  textColor: string;
}