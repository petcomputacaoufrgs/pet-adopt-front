export type LinkType = "primary" | "secondary"

export interface ILink {
  children: React.ReactNode;
  to: string;
  link_type: LinkType;
}