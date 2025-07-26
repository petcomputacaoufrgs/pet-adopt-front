export interface RadioOption {
  label: string;
  value: string;
  groupName: string;
  checked: boolean;
  onChange?: (value : string) => void;
  onSelectToggle: (index: number) => void;
  fontSize: string;
  required?: boolean;
  userFillOption?: boolean;
  index: number;
  userFillInputWidth?: string;
}