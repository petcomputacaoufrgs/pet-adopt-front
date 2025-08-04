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


const HomeView = () => {
  
  const headerOptions = ["Sobre Nós", "Animais Recém Adicionados", "Dicas", "Fale Conosco"]

  // Cria refs para os componentes
  const aboutRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const dicasRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const handleHeaderAction = (selected: string) => {
    const map: Record<string, React.RefObject<HTMLDivElement>> = {
      "Sobre Nós": aboutRef,
      "Animais Recém Adicionados": listRef,
      "Dicas": dicasRef,
      "Fale Conosco": contactRef,
    };

    const ref = map[selected];

    console.log(ref);

    if (ref?.current) {
      console.log("A");
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Header options={headerOptions} optionsToAction={handleHeaderAction} color="#FFF6E8" Logo={logo} />
      <Banner/>
      <Actions />
      <About ref={aboutRef} />
      <ListAnimals ref={listRef} />
      <Dicas ref={dicasRef}/>
      <Contact ref={contactRef}/>
      <Footer />
    </>
  );
};


export default HomeView;


