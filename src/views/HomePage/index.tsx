import About from "./2About";
import ListAnimals from "./3ListAnimals";
import Dicas from "./4Dicas";
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

      <Footer />
    </>
  );
};


export default HomeView;


