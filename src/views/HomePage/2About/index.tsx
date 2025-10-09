import {AboutContainer, AboutDiv, BackgroundDiv, InfoContainer} from "./styles";

import Info from "../../../components/Info";

import dogLines from "../../../assets/HomePageDogLines.png"


const About = () => {
  return (
    <AboutContainer id="about">
      <AboutDiv>

        <InfoContainer>

        <Info 
          subTitle= "Nosso Objetivo é" 
          title="Alcançar Finais Felizes"
          titleFontSize="clamp(32px, 1vw, 48px)"
          subtitleFontSize="clamp(20px, 1vw, 32px)"
          buttonTitle= "Ver Nossos Animaizinhos" 
          to = "/searchAnimals" 
          position="flex-start">

          <div style={{display: "flex", flexDirection: "column", gap: "16px"}}>
            <p>Temos como meta possibilitar o máximo de adoções responsáveis, visando impactar positivamente a vida dos animais errantes, proporcionando-lhes dignidade, e também ajudando a aliviar a superlotação de canis e ONGs.</p>
            <p>Somos <span style={{fontWeight: 800}}>contra qualquer tipo de maus-tratos e priorizamos sempre o bem-estar animal.</span> Lutamos para combater negligências veterinárias e buscamos proporcionar dignidade aos animais sempre que possível. Nosso objetivo é facilitar o processo de adoção e dar visibilidade a essa causa tão importante.</p>
          </div>

        </Info>

        </InfoContainer>

      </AboutDiv>

      <BackgroundDiv $backgroundImage={dogLines}/>
    </AboutContainer>
  );
};

export default About;


