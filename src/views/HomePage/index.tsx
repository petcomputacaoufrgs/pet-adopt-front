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

const HomeView = () => {

  const options = ["A", "B", "C"];

  const handleSelectButton = (value : string) => {
    switch(value){
      case "A":
        console.log("A");
        break;
      case "B":
        console.log("B");
        break;
      case "C":
        console.log("C");
        break;
    }
  }

  const indicator = (selected : boolean) => {
    return selected? <ChevronDown /> : <ChevronUp />;
  }


  return (
    <>
      <DropdownButton label="Teste" options={options} onClick={handleSelectButton} indicator={indicator}  />
      <SearchBar title="Países" required={true} placeholder="Encontre o país" width="500px" fontSize="20px" options={["Brasil", "Burkina Faso", "EUA", "China", "Argentina", "Bolívia", "Brasil mas a segunda versão"]} />
      <p>TESTE</p>
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


