import About from "./About/About";
import Actions from "./Actions";
import Contact from "./Contact/Contact";
import Footer from "./Footer/Footer";
import Dicas from "./Dicas";
import ListAnimals from "./ListAnimals";
import PrimarySecondaryButton from "../../components/PrimarySecondaryButton";

const HomeView = () => {

  return (
    <>
      <PrimarySecondaryButton buttonType={"Primário"} isDisabled={true} content={"ajslkjslks"} onClick={() => {console.log("Teste")}}/> 
      <PrimarySecondaryButton buttonType={"Primário"} isDisabled={false} content={"ajslkjslks"} onClick={() => {console.log("Teste")}}/> 
      <PrimarySecondaryButton buttonType={"Secundário"} isDisabled={false} content={"ajslkjslks"} onClick={() => {}}/> 
      <PrimarySecondaryButton buttonType={"Secundário"} isDisabled={true} content={"ajslkjslks"} onClick={() => {}}/> 
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


