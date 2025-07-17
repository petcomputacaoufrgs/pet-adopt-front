export interface RadioGroupProps {
  title: string;
  required: boolean;
  fontSize: string;
  name: string;
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
}