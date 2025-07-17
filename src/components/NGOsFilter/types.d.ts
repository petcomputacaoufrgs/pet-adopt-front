export interface INGOsFilter {
  ngos: string[],
  selectedState: string;
  setSelectedState: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  name: string;
  setName: (value: string) => void;
  hasBorder?: boolean;
}