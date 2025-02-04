import {LabelImage, InfoText, ActionsContainer, CardsDiv, InfoDiv} from "./styles";
import LinkText from "../../../components/LinkText/LinkText";
import ColoredCard from "../../../components/ColoredCard";
import imagemGenerica from "../../../assets/imagem_generica.png";
import imagemGenericaMobile from "../../../assets/imagem_generica_mobile.png";
import DogForCard from "../../../assets/DogForCard.png";
import DogCard from "../../../components/DogCard";

const Actions = () => {
  return (

    <ActionsContainer>

       <InfoDiv>
        <LabelImage />
        <InfoText>Faça a diferença na <span style={{color: "#F17D6E"}}>vida de um animalzinho</span> e leve amor para o seu coração.</InfoText>
       </InfoDiv>

      <CardsDiv>

        <ColoredCard to="/teste" title="Adotar" background_color="#45E4FF" image_url={imagemGenerica} image_url_mobile={imagemGenericaMobile}>
          <p>Que tal adotar um novo amiguinho e ganhar um parceiro para a vida toda?</p>
          <LinkText to="/" link_type="primary">Ver mais</LinkText>
        </ColoredCard>

        <ColoredCard to="/" title="Apadrinhar" background_color="#F3978B" image_url={imagemGenerica} image_url_mobile={imagemGenericaMobile}>
          <p>Que tal se tornar padrinho de um animalzinho?</p>
          <LinkText to="/" link_type="primary">Ver mais</LinkText>
        </ColoredCard>

        <ColoredCard to="/teste" title="Lar Temporário" background_color="#FF9944" image_url={imagemGenerica} image_url_mobile={imagemGenericaMobile}>
          <p>Que tal acolher um animalzinho no seu lar por um tempo?</p>
          <LinkText to="/" link_type="primary">Ver mais</LinkText>
        </ColoredCard>

      </CardsDiv>

      <DogCard image_url={DogForCard} sex="Fêmea" size="Porte Médio" name="Nome Animal" race="Raça do Animal" age="3" location="Rio Grande do Sul" to="/teste"/>

    </ActionsContainer>

  );
};

export default Actions;


