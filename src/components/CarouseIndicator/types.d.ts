
export interface CarouselIndicatorProps {
  totalItems: number;
  activeIndex: number;
  onIndicatorClick?: (index: number) => void;
}