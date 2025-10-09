export interface IMembersFilter {
  members: string[],
  name: string;
  setName: (value: string) => void;
  hasBorder?: boolean;
  onSearch?: (filters: { name: string}) => void;
  onClearFilters?: () => void;
}