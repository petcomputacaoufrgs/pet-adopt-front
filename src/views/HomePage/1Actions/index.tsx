import {LabelImage, InfoText, ActionsContainer, CardsDiv, InfoDiv} from "./styles";

import LinkText from "../../../components/ActionText";
import ColoredCard from "../../../components/ColoredCard";

import imagemGenerica from "../../../assets/GenericImage.png";
import imagemGenericaMobile from "../../../assets/MobileGenericImage.png";
import { useNavigate } from "react-router-dom";
import ActionText from "../../../components/ActionText";

const Actions = () => {

  const navigateTo = useNavigate();
 

  return (

    
    <ActionsContainer>

       <InfoDiv>
        <LabelImage />
        <InfoText>Faça a diferença na <span style={{color: "#F17D6E"}}>vida de um animalzinho</span> e leve amor para o seu coração.</InfoText>
       </InfoDiv>

      <CardsDiv>

        <ColoredCard to="/teste" title="Adotar" background_color="#45E4FF" image_url={imagemGenerica} image_url_mobile={imagemGenericaMobile}>
          <p>Que tal adotar um novo amiguinho e ganhar um parceiro para a vida toda?</p>
          <ActionText onClick={(e) => navigateTo("/teste")} has_arrow_svg={true} font_size={"18px"} text_color="#553525">Ver mais</ActionText>
        </ColoredCard>

        <ColoredCard to="/teste" title="Apadrinhar" background_color="#F3978B" image_url={imagemGenerica} image_url_mobile={imagemGenericaMobile}>
          <p>Que tal se tornar padrinho de um animalzinho?</p>
          <ActionText onClick={(e) => navigateTo("/teste")} has_arrow_svg={true} font_size={"18px"} text_color="#553525">Ver mais</ActionText>
        </ColoredCard>

        <ColoredCard to="/teste" title="Lar Temporário" background_color="#FF9944" image_url={imagemGenerica} image_url_mobile={imagemGenericaMobile}>
          <p>Que tal acolher um animalzinho no seu lar por um tempo?</p>
          <ActionText onClick={(e) => navigateTo("/teste")} has_arrow_svg={true} font_size={"18px"} text_color="#553525">Ver mais</ActionText>
        </ColoredCard>

      </CardsDiv>

    </ActionsContainer>

  );
};

export default Actions;