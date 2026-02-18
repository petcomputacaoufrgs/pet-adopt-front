import About from "./2About";
import ListAnimals from "./3ListAnimals";
import Dicas from "./4Dicas";
import Contact from "./5Contact";
import Footer from "./6Footer";

import { useEffect, useTransition } from "react";

import AuthorizationToast from '../../components/AuthorizationToast';
import { useLocation, useNavigate } from "react-router-dom";

const HomeView = () => {
  
  
  const location = useLocation();
  const scrollToId = location.state?.scrollTo;

  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const handleNavigation = (to: string, options?: { state?: any, replace?: boolean }) => {
    startTransition(() => {
      navigate(to, options);
    });
  };

  useEffect(() => {
    if (scrollToId) {
      // tenta rodar o scroll após o browser pintar (garante DOM pronto)
      requestAnimationFrame(() => {
        const el = document.getElementById(scrollToId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
        // limpa o state substituindo a entrada atual
        handleNavigation(location.pathname, { replace: true, state: {} });
      });
    }
  }, [scrollToId, location.pathname, handleNavigation]);


  return (
    <>
      <AuthorizationToast />
      <About />
      <ListAnimals />
      <Dicas />
      <Contact />
      <Footer />
    </>
  );
};


export default HomeView;


