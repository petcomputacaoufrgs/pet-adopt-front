export interface SuccessToastProps {
  message: string;
  description?: string;
  onClose: () => void;
  isVisible: boolean;
}
