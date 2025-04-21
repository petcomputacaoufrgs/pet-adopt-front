import { CardsContainer, HintsContainer, InfoDiv, Image } from "./styles";

import ImageCard from "../../../components/ImageCard";

import imagemGatoFundo from "../../../assets/HomePageCat2.jpeg";
import imagemCachorroFundo from "../../../assets/HomePageDog2.jpeg";
import imagemPreenchimento from "../../../assets/HomePageLayer.png";

const Dicas = () => {

  return (
    <HintsContainer>

        <InfoDiv>
          <div id="titleDiv">
            <h3>Se liga</h3>
            <h2>Nessas Dicas</h2>
          </div>
          
          <div id="textDiv">
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus fugiat, magnam cum explicabo maxime dolore aut consequuntur perspiciatis optio autem. 
            Laborum natus deserunt optio architecto voluptatibus! Perferendis animi quibusdam accusantium!</p>
          </div>
        </InfoDiv>

        <CardsContainer>
          <ImageCard to="/" title="Expectativa e Realidade." text_color={"#553525"} background_image={imagemGatoFundo} width={"45vw"} height_desktop={"48%"} height_mobile="25vh"/>

          <ImageCard to="/" title="Expectativa e Realidade." text_color={"#553525"}  background_color="#FF9944" width={"32vw"} height_desktop={"48%"} height_mobile="25vh"/>

          <ImageCard to="/" title="Expectativa e Realidade." text_color={"#553525"}  background_color="#45E4FF" width={"27vw"} height_desktop={"48%"} height_mobile="25vh"/>

          <ImageCard to="/" title="Expectativa e Realidade." text_color={"white"} background_image={imagemCachorroFundo} width={"39vw"} height_desktop={"48%"} height_mobile="25vh"/>

          <Image src={imagemPreenchimento} $width={12}></Image>

        </CardsContainer>
        
    </HintsContainer>

  );
};


export default Dicas;


