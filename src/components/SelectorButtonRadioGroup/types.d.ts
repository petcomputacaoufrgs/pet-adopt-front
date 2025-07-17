export interface Option {
  label: string;
  value: string;
  backgroundImage: string;
  overlayImage?: string;
  backgroundColor: string;
}

export interface SelectorRadioGroupProps {
  options: Option[];
  selectedValue: number;
  setSelectedValue: (selectedValues: number) => void;
  width: string;
  height: string;
  overlayImageWidth?: string;
  overlayImageHeight?: string;
  overlayImageTop?: string;
  overlayImageLeft?: string;
}