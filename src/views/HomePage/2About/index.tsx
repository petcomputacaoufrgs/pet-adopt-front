import {AboutContainer, AboutDiv, BackgroundDiv} from "./styles";

import Info from "../../../components/Info";

import dogLines from "../../../assets/HomePageDogLines.png"

interface AboutProps {
  id?: string; // Tornar o id opcional
}

const About: React.FC<AboutProps> = ({ id })=> {
  return (

    <AboutContainer>

      <AboutDiv $backgroundColor="#FFF6E8">
          

        <Info subTitle= "Nosso Objetivo é" title="Alcançar Finais Felizes" buttonTitle= "Ver Nossos Animaizinhos" to = "/teste" position="flex-start">
          
          <p>Temos como meta possibilitar o máximo de adoções responsáveis, visando impactar positivamente a vida dos animais errantes, proporcionando-lhes dignidade, e também ajudando a aliviar a superlotação de canis e ONGs.</p>
          
          <p>Somos <span style={{fontWeight: 800}}>contra qualquer tipo de maus-tratos e priorizamos sempre o bem-estar animal.</span> Lutamos para combater negligências veterinárias e buscamos proporcionar dignidade aos animais sempre que possível. Nosso objetivo é facilitar o processo de adoção e dar visibilidade a essa causa tão importante.</p>

        </Info>

      </AboutDiv>

      <BackgroundDiv $backgroundColor="#FF9944" $backgroundImage={dogLines}>
    
      </BackgroundDiv>

    </AboutContainer>

  );
};

export default About;


