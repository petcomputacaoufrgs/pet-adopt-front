export interface INGOsFilter {
  ngos: string[];
  selectedState: string;
  setSelectedState: (state: string) => void;
  city: string;
  setCity: (city: string) => void;
  name: string;
  setName: (name: string) => void;
  hasBorder?: boolean;
  onSearch?: (filters: { name: string; city: string; state: string }) => void;
  onClearFilters?: () => void;
}