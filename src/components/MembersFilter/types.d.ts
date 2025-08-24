export interface IMembersFilter {
  ngoMembers: string[],
  name: string;
  setName: (value: string) => void;
  hasBorder?: boolean;
}