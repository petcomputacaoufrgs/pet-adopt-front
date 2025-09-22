import { useEffect, useState } from 'react';
import { getAuthorizationError } from '../../services';
import Toast from '../Toast';

const AuthorizationToast: React.FC = () => {
  const [authError, setAuthError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    const error = getAuthorizationError();
    if (error) {
      setAuthError(error);
      setShowToast(true);
      
      // Mostrar toast
      setTimeout(() => setToastVisible(true), 100);
      
      // Auto-hide após 5 segundos
      setTimeout(() => {
        setToastVisible(false);
        setTimeout(() => {
          setShowToast(false);
          setAuthError(null);
        }, 300);
      }, 5000);
    }
  }, []);

  if (!showToast || !authError) return null;

  return (
    <Toast
      type="error"
      message="Acesso Negado"
      description={authError}
      onClose={() => {
        setToastVisible(false);
        setTimeout(() => {
          setShowToast(false);
          setAuthError(null);
        }, 300);
      }}
      isVisible={toastVisible}
    />
  );
};

export default AuthorizationToast;