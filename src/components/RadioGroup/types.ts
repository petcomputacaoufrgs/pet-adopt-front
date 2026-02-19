

export interface RadioGroupProps {
  title: string;
  required: boolean;
  fontSize: string;
  name: string;
  options: any[];
  onChange?: (value: string) => void;
  toggleIndex: number;
  onSelectToggle: (index: number) => void;
  userFillOptionLabel?: string;
  customInputValue?: string;
  setCustomInputValue?: (value: string) => void;

}