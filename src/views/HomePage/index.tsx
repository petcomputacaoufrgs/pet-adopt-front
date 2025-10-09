import Header from "../../components/Header";
import Banner from "./0Banner";
import Actions from "./1Actions";
import About from "./2About";
import ListAnimals from "./3ListAnimals";
import Dicas from "./4Dicas";
import Contact from "./5Contact";
import Footer from "./6Footer";

import logo from "../../assets/HorizontalLogo.png"
import { useEffect, useRef } from "react";

import AuthorizationToast from '../../components/AuthorizationToast';
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const HomeView = () => {
  
  const {isLoading, user, isLoggedIn} = useAuth();
  
  const location = useLocation();
  const scrollToId = location.state?.scrollTo;

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && scrollToId) {
      // tenta rodar o scroll após o browser pintar (garante DOM pronto)
      requestAnimationFrame(() => {
        const el = document.getElementById(scrollToId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
        // limpa o state substituindo a entrada atual
        navigate(location.pathname, { replace: true, state: {} });
      });
    }
  }, [isLoading, scrollToId, location.pathname, navigate]);

  if (isLoading) {
    return null; 
  }

  return (
    <>
      <AuthorizationToast />
      <Header color="#FFF6E8" Logo={logo} user={user} isLoggedIn={isLoggedIn} />
      <About />
      <ListAnimals />
      <Dicas />
      <Contact />
      <Footer />
    </>
  );
};


export default HomeView;


