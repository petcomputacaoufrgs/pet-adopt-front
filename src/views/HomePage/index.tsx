import About from "./About/About";
import Actions from "./Actions";
import Contact from "./Contact/Contact";
import Footer from "./Footer/Footer";
import Dicas from "./Dicas";
import ListAnimals from "./ListAnimals";

const HomeView = () => {

  return (
    <>
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


