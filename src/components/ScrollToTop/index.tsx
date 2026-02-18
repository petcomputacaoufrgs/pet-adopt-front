import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Rola para o topo instantaneamente

    if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
    }

    
    if (!hash) {
          window.scrollTo(0, 0);
    }
    
  }, [pathname]);

  return null;
}