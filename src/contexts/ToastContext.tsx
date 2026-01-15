import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';
import Toast from '../components/Toast'; 

interface ToastOptions {
  success: boolean;
  message: string; 
  description: string;
}

interface ToastContextData {
  showToast: (options: ToastOptions) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  // Estados visuais
  const [isShow, setIsShow] = useState(false);      // Montado no DOM
  const [isVisible, setIsVisible] = useState(false); // Opacidade/Animação
  const [isSuccess, setIsSuccess] = useState(true);
  const [message, setMessage] = useState('');
  const [description, setDescription] = useState('');

  // Refs para gerenciar os timeouts
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fullCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Limpa qualquer toast pendente antes de abrir um novo
  const resetToastTimers = () => {
    if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    if (fullCloseTimeoutRef.current) clearTimeout(fullCloseTimeoutRef.current);
  };

  const showToast = ({ success, message, description }: ToastOptions) => {
    resetToastTimers();

    // Configura o estado inicial
    setIsSuccess(success);
    setMessage(message);
    setDescription(description);
    setIsShow(true);
    

    // 1. Inicia a animação de entrada (fade in / slide in)
    showTimeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    // 2. Agenda a saída (fade out)
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    // 3. Desmonta do DOM totalmente
    fullCloseTimeoutRef.current = setTimeout(() => {
      setIsShow(false);
    }, 3500);
  };

  const hideToast = () => {
    setIsVisible(false);
    fullCloseTimeoutRef.current = setTimeout(() => {
      setIsShow(false);
    }, 500); // Tempo para terminar animação de saída manual
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}

      {isShow && (
        <div 
           style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}
        >
           <Toast 
              message={message}
              description={description}
              type={isSuccess ? "success" : "error"}
              isVisible={isVisible}
              onClose={hideToast}
           />
        </div>
      )}
    </ToastContext.Provider>
  );
};

// Hook
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast deve ser usado dentro de um ToastProvider');
  }
  return context;
};