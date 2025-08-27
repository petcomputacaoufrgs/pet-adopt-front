import { ReactNode, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  // 1. Hook que fornece informações de autenticação
  const { user, isLoading, isLoggedIn, hasRole } = useAuth();

  // 2. Executa quando dados de autenticação mudam
  useEffect(() => {
    if (isLoading) return;                    // Aguarda carregamento terminar
    
    if (!isLoggedIn) {                        // Não logado
      localStorage.setItem('authError', 'Você precisa estar logado...');
      window.location.href = '/login';
      return;
    }
    
    if (!hasRole(allowedRoles)) {             // Sem permissão
      localStorage.setItem('authorizationError', 'Você não tem permissão...');
      window.location.href = '/';
      return;
    }
  }, [isLoading, isLoggedIn, hasRole, allowedRoles]);

  // 3. Renderiza o componente protegido
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Carregando...
      </div>
    );
  }

  // Se não estiver logado ou sem permissão, não renderiza
  if (!isLoggedIn || !hasRole(allowedRoles)) {
    return null;
  }

  // Renderiza o componente protegido
  return <>{children}</>;
};

export default ProtectedRoute;