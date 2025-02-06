import {AboutContainer, AboutDiv, Image} from "./styles";
import InfoComponent from "../../../components/Info";
import BackgroundComponent from "../../../components/Background"
import dog from "../../../assets/Cachorro2.png"
import line1 from "../../../assets/line1.png"
import line2 from "../../../assets/line2.png"
import dogLines from "../../../assets/DogLines.png"


const About = () => {
  return (

    <AboutContainer>

      <AboutDiv background_color="#FFF6E8">
          

        <InfoComponent subTitle= "Nosso Objetivo é" title="Alcançar Finais Felizes" to = "/teste">
          
          <p>Temos como meta possibilitar o máximo de adoções responsáveis, visando impactar positivamente a vida dos animais errantes, proporcionando-lhes dignidade, e também ajudando a aliviar a superlotação de canis e ONGs.</p>
          
          <p>Somos <span style={{fontWeight: 800}}>contra qualquer tipo de maus-tratos e priorizamos sempre o bem-estar animal.</span> Lutamos para combater negligências veterinárias e buscamos proporcionar dignidade aos animais sempre que possível. Nosso objetivo é facilitar o processo de adoção e dar visibilidade a essa causa tão importante.</p>

        </InfoComponent>

      </AboutDiv>

      <AboutDiv background_color="#FF9944">

        <Image src = {dogLines}/>

      </AboutDiv>

    </AboutContainer>

  );
};

export default About;


