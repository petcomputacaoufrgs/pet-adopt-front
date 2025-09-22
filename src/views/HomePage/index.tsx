import Header from "../../components/Header";
import Banner from "./0Banner";
import Actions from "./1Actions";
import About from "./2About";
import ListAnimals from "./3ListAnimals";
import Dicas from "./4Dicas";
import Contact from "./5Contact";
import Footer from "./6Footer";

import logo from "../../assets/HorizontalLogo.png"
import { useRef } from "react";

import AuthorizationToast from '../../components/AuthorizationToast';

const HomeView = () => {
  
  const headerOptions = ["Sobre Nós", "Animais Recém Adicionados", "Dicas", "Fale Conosco"]

  const handleHeaderAction = (selected: string) => {
  };

  return (
    <>
      <AuthorizationToast />
      <Header options={headerOptions} optionsToAction={handleHeaderAction} color="#FFF6E8" Logo={logo} />
      <About />
      <ListAnimals />
      <Dicas />
      <Contact />
      <Footer />
    </>
  );
};


export default HomeView;


