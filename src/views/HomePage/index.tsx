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
import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const HomeView = () => {
  
  const {isLoading} = useAuth();
  
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  if (isLoading) {
    console.log("Loading...");
    return null; 
  }

  return (
    <>
      <AuthorizationToast />
      <Header color="#FFF6E8" Logo={logo} />
      <About />
      <ListAnimals />
      <Dicas />
      <Contact />
      <Footer />
    </>
  );
};


export default HomeView;


