import styled from "styled-components";
import PetCard from "../components/LinkText";
import LinkText from "../components/LinkText";
import ColoredCard from "../components/ColoredCard";
import imagemGenerica from "../assets/imagem_generica.png";
import imagemGenericaMobile from "../assets/imagem_generica_mobile.png";


const Cards = styled.div`
  display: flex;
  gap: 1rem;
  width: 80%;

  @media (max-width: 1500px) {

    flex-direction: column;
  }
`;


const Example = () => {
  return (
    <div>
      Eu sou uma pagina


        <LinkText to="/teste" link_type="primary">Ver mais</LinkText>
        <LinkText to="../" link_type="secondary">Teste</LinkText>


      <Cards>
      <ColoredCard title="Adotar" background_color="#45E4FF" image_url={imagemGenerica} image_url_mobile={imagemGenericaMobile}>
       <p>Que tal adotar um novo amiguinho e ganhar um parceiro para a vida toda?</p>
        <LinkText to="/teste" link_type="primary">Ver mais</LinkText>
      </ColoredCard>

      <ColoredCard title="Apadrinhar" background_color="#F3978B" image_url={imagemGenerica} image_url_mobile={imagemGenericaMobile}>
       <p>Que tal se tornar padrinho de um animalzinho?</p>
        <LinkText to="/teste" link_type="primary">Ver mais</LinkText>
      </ColoredCard>

      <ColoredCard title="Lar Temporário" background_color="#FF9944" image_url={imagemGenerica} image_url_mobile={imagemGenericaMobile}>
       <p>Que tal acolher um animalzinho no seu lar por um tempo?</p>
        <LinkText to="/teste" link_type="primary">Ver mais</LinkText>
      </ColoredCard>

      </Cards>


    </div>
  );
};

export default Example;


