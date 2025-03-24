import About from "./About/About";
import Actions from "./Actions";
import Contact from "./Contact/Contact";
import Footer from "./Footer/Footer";
import Dicas from "./Dicas";
import ListAnimals from "./ListAnimals";
import Tags from "../../components/Tags";

const this_text = "Tags"
const HomeView = () => {

  return (
    <>
    <Actions />
    <About></About>
    {/* Tag de Teste
    <Tags type={"disabled"} text={this_text} fontSize={"30px"} hasCheck = {false}></Tags>
    */}
    <ListAnimals></ListAnimals>
    <Dicas />
    <Contact></Contact>
    <Footer></Footer>
    </>

  );
};


export default HomeView;


