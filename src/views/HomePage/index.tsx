import { ChevronDown, ChevronUp } from "lucide-react";
import DropdownButton from "../../components/DropDownButton";
import SearchBar from "../../components/SearchBar";
import Banner from "./0Banner";
import Actions from "./1Actions";
import About from "./2About";
import ListAnimals from "./3ListAnimals";
import Dicas from "./4Dicas";
import Contact from "./5Contact";
import Footer from "./6Footer";
import RadioButton from "../../components/RadioButton";
import { useState } from "react"; // Importa o useState
import PasswordInput from "../../components/PasswordInput";
import LargeInput from "../../components/LargeInput";

const HomeView = () => {

  return (
    <>
      <Banner />
      <Actions />
      <About></About>
      <ListAnimals></ListAnimals>
      <Dicas />
      <Contact></Contact>
      <Footer></Footer>
    </>
  );
};


export default HomeView;


