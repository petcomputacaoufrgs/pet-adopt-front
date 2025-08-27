import { CardsContainer, HintsContainer, InfoDiv, Image } from "./styles";

import ImageCard from "../../../components/ImageCard";

import imagemGatoFundo from "../../../assets/HomePageCat2.jpeg";
import imagemCachorroFundo from "../../../assets/HomePageDog2.jpeg";
import imagemPreenchimento from "../../../assets/HomePageLayer.png";


const Dicas = () => {

  return (
    <HintsContainer id="hints">

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
          <ImageCard to="/" title="Expectativa e Realidade." textColor={"#553525"} backgroundImage={imagemGatoFundo} width={"45vw"} heightDesktop={"48%"} heightMobile="25vh"/>

          <ImageCard to="/" title="Expectativa e Realidade." textColor={"#553525"}  backgroundColor="#FF9944" width={"32vw"} heightDesktop={"48%"} heightMobile="25vh"/>

          <ImageCard to="/" title="Expectativa e Realidade." textColor={"#553525"}  backgroundColor="#45E4FF" width={"27vw"} heightDesktop={"48%"} heightMobile="25vh"/>

          <ImageCard to="/" title="Expectativa e Realidade." textColor={"white"} backgroundImage={imagemCachorroFundo} width={"39vw"} heightDesktop={"48%"} heightMobile="25vh"/>

          <Image src={imagemPreenchimento} $width={12}></Image>

        </CardsContainer>
        
    </HintsContainer>

  );
};


export default Dicas;


