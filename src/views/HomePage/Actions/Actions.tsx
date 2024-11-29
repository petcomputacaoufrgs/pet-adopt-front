import "./Actions.css";
import styled from "styled-components";
import LinkText from "../../../components/LinkText";
import ColoredCard from "../../../components/ColoredCard";
import imagemGenerica from "../../assets/imagem_generica.png";
import imagemGenericaMobile from "../../assets/imagem_generica_mobile.png";
import label from "../../assets/Label.png";
import label_mobile from "../../assets/Label_mobile.png";


const InfoText = styled.p`
    font-family: 'Nunito Sans';
    font-weight: 800;
    font-size: 3em;
    color: #553525;
    text-align: start;

    @media (max-width: 768px) {
      font-size: 2.2em;
  }
`

const LabelImage = styled.img`

  /* Exibe a imagem padrão (desktop) por padrão */
  content: url(${label});

  /* Media Query para telas pequenas (máximo 768px) */
  @media (max-width: 428px) {
    content: url(${label_mobile});
  }
`;

const Actions = () => {
  return (


    <div id="container">

       <div id="div_info">

        <LabelImage />
        <InfoText>Faça a diferença na <span style={{color: "#F17D6E"}}>vida de um animalzinho</span> e leve amor para o seu coração.</InfoText>

       </div>

      <div id="div_cards">

      <ColoredCard to="/" title="Adotar" background_color="#45E4FF" image_url={imagemGenerica} image_url_mobile={imagemGenericaMobile}>
       <p>Que tal adotar um novo amiguinho e ganhar um parceiro para a vida toda?</p>
        <LinkText to="../" link_type="primary">Ver mais</LinkText>
      </ColoredCard>

      <ColoredCard to="/" title="Apadrinhar" background_color="#F3978B" image_url={imagemGenerica} image_url_mobile={imagemGenericaMobile}>
       <p>Que tal se tornar padrinho de um animalzinho?</p>
        <LinkText to="../" link_type="primary">Ver mais</LinkText>
      </ColoredCard>

      <ColoredCard to="/" title="Lar Temporário" background_color="#FF9944" image_url={imagemGenerica} image_url_mobile={imagemGenericaMobile}>
       <p>Que tal acolher um animalzinho no seu lar por um tempo?</p>
        <LinkText to="/" link_type="primary">Ver mais</LinkText>
      </ColoredCard>

      </div>


 
    </div>

  );
};

export default Actions;


