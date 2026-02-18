export interface ToastProps {
  message: string;
  description?: string;
  onClose: () => void;
  isVisible: boolean;
  type?: 'success' | 'error';
}