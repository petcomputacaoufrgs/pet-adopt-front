export interface IMembersFilter {
  members: string[],
  name: string;
  setName: (value: string) => void;
  hasBorder?: boolean;
}