export interface GalleryModalProps {
  isOpen: boolean;
  image: string;
  onClose: () => void;
  totalItems: number;
  activeIndex: number;
  onIndicatorClick?: (index: number) => void;
}