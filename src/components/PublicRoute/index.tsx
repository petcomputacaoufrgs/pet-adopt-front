import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import { ReactNode } from "react";

export default function PublicRoute({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAuth();

  const checkAuthError = () => {
    if (isLoggedIn) {
        return (<Navigate to="/" replace />);
    }
    else 
        return children;
    }

  return (<> {checkAuthError()} </>);
}