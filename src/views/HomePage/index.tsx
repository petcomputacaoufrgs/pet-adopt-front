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

const HomeView = () => {

  const [nome, setNome] = useState(''); 

  return (
    <>
      <PasswordInput 
        title="nome" 
        required = {true} 
        $fontSize="10px" 
        placeholder="Digite seu nome" 
        $width="735px" 
        value={nome}
        onChange={(e) => setNome(e.target.value)} />

      <p>{nome}</p>


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


