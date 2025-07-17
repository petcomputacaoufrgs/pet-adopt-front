export interface RadioOption {
  label: string;
  value: string;
  groupName: string;
  checked: boolean;
  onChange: (value : string) => void;
  fontSize: string;
  required?: boolean
}