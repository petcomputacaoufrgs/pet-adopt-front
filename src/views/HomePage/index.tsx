import About from "./2About";
import ListAnimals from "./3ListAnimals";
import Dicas from "./4Dicas";
import Contact from "./5Contact";
import Footer from "./6Footer";

import AuthorizationToast from '../../components/AuthorizationToast';

const HomeView = () => {
  return (
    <>
      <AuthorizationToast />
      <About />

      <div id="list-animals" style={{scrollMarginTop: "80px"}}>
        <ListAnimals />
      </div>

      <div id="dicas" style={{scrollMarginTop: "80px"}}>
        <Dicas />
      </div>

      <div id="contact" style={{scrollMarginTop: "80px"}}>
        <Contact />
      </div>

      <Footer />
    </>
  );
};


export default HomeView;


