import {LabelImage, InfoText, ActionsContainer, CardsDiv, InfoDiv} from "./styles";

import ColoredCard from "../../../components/ColoredCard";

import imagemGenerica from "../../../assets/GenericImage.png";
import imagemGenericaMobile from "../../../assets/MobileGenericImage.png";
import { useNavigate } from "react-router-dom";
import ActionText from "../../../components/ActionText";


const Actions = () => {

  const navigateTo = useNavigate();
 
  

  return (

    
    <ActionsContainer id="actions">
      
       <InfoDiv>
        <LabelImage />
        <InfoText>Faça a diferença na <span style={{color: "#F17D6E"}}>vida de um animalzinho</span> e leve amor para o seu coração.</InfoText>
       </InfoDiv>

      <CardsDiv>

        <ColoredCard to="/teste" title="Adotar" backgroundColor="#45E4FF" imageUrl={imagemGenerica} imageUrlMobile={imagemGenericaMobile}>
          <p>Que tal adotar um novo amiguinho e ganhar um parceiro para a vida toda?</p>
          <ActionText onClick={(e) => navigateTo("/teste")} hasArrowSvg={true} fontSize={"18px"} textColor="#553525">Ver mais</ActionText>
        </ColoredCard>

        <ColoredCard to="/teste" title="Apadrinhar" backgroundColor="#F3978B" imageUrl={imagemGenerica} imageUrlMobile={imagemGenericaMobile}>
          <p>Que tal se tornar padrinho de um animalzinho?</p>
          <ActionText onClick={(e) => navigateTo("/teste")} hasArrowSvg={true} fontSize={"18px"} textColor="#553525">Ver mais</ActionText>
        </ColoredCard>

        <ColoredCard to="/teste" title="Lar Temporário" backgroundColor="#FF9944" imageUrl={imagemGenerica} imageUrlMobile={imagemGenericaMobile}>
          <p>Que tal acolher um animalzinho no seu lar por um tempo?</p>
            <ActionText onClick={(e) => navigateTo("/teste")} hasArrowSvg={true} fontSize={"18px"} textColor="#553525">Ver mais</ActionText>
        </ColoredCard>

      </CardsDiv>

    </ActionsContainer>

  );
};

export default Actions;