export interface ILink {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLParagraphElement>) => void;
  width?: string;
  hasArrowSvg?: boolean;
  underlineOnHover?: boolean;
  fontSize: string;
  textColor: string;
}