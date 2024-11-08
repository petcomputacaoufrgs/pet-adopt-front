import styled from "styled-components";
import LinkText from "../components/LinkText";
import ColoredCard from "../components/ColoredCard";
import imagemGenerica from "../assets/imagem_generica.png";
import imagemGenericaMobile from "../assets/imagem_generica_mobile.png";
import label from "../assets/Label.png";


const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100vw;
    height: auto;
    gap: 12vh;

  overflow: auto;
    @media (max-width: 1064px) {
      gap: 2vh;
  } 

`

const Cards = styled.div`
  display: flex;
  gap: 1rem;
  width: 80%;
  
  justify-content: center;

  @media (max-width: 1500px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }


`;


const Info = styled.div`
    display : flex;
    width: 80%;
    align-items: center;
    gap: 7vw;

    @media (max-width: 1064px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1vh;
  }

`

const Text = styled.p`
    font-family: 'Nunito Sans';
    font-weight: 800;
    font-size: 3em;
    color: #553525;
    text-align: start;

    @media (max-width: 768px) {
      font-size: 2.2em;
  }
`

const Actions = () => {
  return (


    <Container>

       <Info>

        <img src={label}></img>
        <Text>Faça a diferença na <span style={{color: "#F17D6E"}}>vida de um animalzinho</span> e leve amor para o seu coração.</Text>

       </Info>

      <Cards>

      <ColoredCard title="Adotar" background_color="#45E4FF" image_url={imagemGenerica} image_url_mobile={imagemGenericaMobile}>
       <p>Que tal adotar um novo amiguinho e ganhar um parceiro para a vida toda?</p>
        <LinkText to="../" link_type="primary">Ver mais</LinkText>
      </ColoredCard>

      <ColoredCard title="Apadrinhar" background_color="#F3978B" image_url={imagemGenerica} image_url_mobile={imagemGenericaMobile}>
       <p>Que tal se tornar padrinho de um animalzinho?</p>
        <LinkText to="../" link_type="primary">Ver mais</LinkText>
      </ColoredCard>

      <ColoredCard title="Lar Temporário" background_color="#FF9944" image_url={imagemGenerica} image_url_mobile={imagemGenericaMobile}>
       <p>Que tal acolher um animalzinho no seu lar por um tempo?</p>
        <LinkText to="/" link_type="primary">Ver mais</LinkText>
      </ColoredCard>

      </Cards>

    </Container>
  );
};

export default Actions;


