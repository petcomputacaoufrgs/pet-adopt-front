import About from "./About/About";
import Actions from "./Actions";
import Contact from "./Contact/Contact";
import Dicas from "./Dicas";
import ListAnimals from "./ListAnimals";

const HomeView = () => {

  return (
    <>
    <Actions />
    <Dicas />
    <About></About>
    <Contact></Contact>
    <ListAnimals></ListAnimals>
    </>

  );
};


export default HomeView;


