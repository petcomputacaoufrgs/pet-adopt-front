import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'NGO_ADMIN' | 'NGO_MEMBER' | 'REGULAR';
  ngoId: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
}

export const useAuth = (): AuthState & {
  hasRole: (requiredRoles: string[]) => boolean;
  logout: () => void;
} => {
  // 1. ESTADO LOCAL
  const [user, setUser] = useState<User | null>(null);        // Dados do usuário
  const [isLoading, setIsLoading] = useState(true);           // Status de carregamento

  // 2. INICIALIZAÇÃO (só executa uma vez)
  useEffect(() => {
    const checkAuth = () => {
      try {
        const userString = localStorage.getItem('user');
        if (userString) {
          const userData = JSON.parse(userString);
          setUser(userData);
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // 3. VERIFICAÇÃO DE PERMISSÕES
  const hasRole = (requiredRoles: string[]): boolean => {
    // Não logado = sem permissão
    if (!user) return false;
    // requiredRoles 'ALL' permite qualquer conta aprovada
    if (requiredRoles.includes('ALL') && 
    ( user.role === 'NGO_ADMIN' || 
      user.role === 'NGO_MEMBER' || 
      user.role === 'ADMIN'))
        return true;        
    // Verifica role específico
    return requiredRoles.includes(user.role);             
  };

  // 4. LOGOUT
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    setUser(null);                          // Limpa dados locais
    window.location.href = '/login';        // Redireciona
  };

  // 5. RETORNA INTERFACE COMPLETA
  return {
    user,                       // Dados do usuário
    isLoading,                  // Status de carregamento
    isLoggedIn: user !== null,  // Computed: está logado?
    hasRole,                    // Função: tem permissão?
    logout                      // Função: sair
  };
};