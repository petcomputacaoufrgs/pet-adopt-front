export interface SelectorButtonProps {
  label: string;
  active: boolean;
  clicked: boolean;
  setActive: () => void;
  width: string;
  height: string;
  backgroundImage: string;
  backgroundColor: string;

  overlayImage?: string;
  overlayImageWidth?: string;
  overlayImageHeight?: string;
  overlayImageTop?: string;
  overlayImageLeft?: string;
}