export interface RadioGroupProps {
  title: string;
  required: boolean;
  fontSize: string;
  name: string;
  options: Option[];
  onChange?: (value: string) => void;
  toggleIndex: number;
  onSelectToggle: (index: number) => void;
  userFillOptionLabel?: string;

}