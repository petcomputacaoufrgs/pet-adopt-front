import Banner from "./0Banner";
import Actions from "./1Actions";
import About from "./2About";
import ListAnimals from "./3ListAnimals";
import Dicas from "./4Dicas";
import Contact from "./5Contact";
import Footer from "./6Footer";

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


