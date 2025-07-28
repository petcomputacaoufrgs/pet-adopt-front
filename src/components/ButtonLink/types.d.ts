export type LinkType = "primary" | "secondary"

export interface ILink {
  children: React.ReactNode;
  href: string;
  link_type: LinkType;
  disabled?: boolean;
  fontsize?: string;
}