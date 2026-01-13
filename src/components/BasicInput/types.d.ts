export interface BasicInputProps {
  title: string;
  required: boolean;
  $fontSize: string;
  $titleFontSize?: string;
  $gapFromTitle?: string;
  placeholder: string;
  $width: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  $paddingRight?: string;
  $paddingVertical?: string;
  $readOnly?: boolean;
  $inputType?: "Primário" | "Secundário" | string; // Adjusted to reflect the actual usage
  error?: boolean;
  errorMessage?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}