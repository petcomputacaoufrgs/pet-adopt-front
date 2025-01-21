import LinkText from "../../../components/LinkText/LinkText";
import ColoredCard from "../../../components/ColoredCard";
import imagemGenerica from "../../../assets/imagem_generica.png";
import imagemGenericaMobile from "../../../assets/imagem_generica_mobile.png";
import imagemGatoFundo from "../../../assets/gato.jpeg";
import imagemCachorroFundo from "../../../assets/cachorro.jpeg";
import imagemPreenchimento from "../../../assets/Camada_1.png";
import ImageCard from "../../../components/ImageCard";
import { Image } from "./styles";
import { CardsContainer, HintsContainer, InfoDiv } from "./styles";


const Actions = () => {
  const fundoGatoProporcao = 879 / 280;
  const fundoCachorroProporcao = 745 / 280;

  const fundoGatoWidthPercentage = 50;
  const fundoCachorroWidthPercentage = 50;

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

          <Image src={imagemPreenchimento} width={12}></Image>

        </CardsContainer>
    </HintsContainer>

  );
};


export default Actions;


