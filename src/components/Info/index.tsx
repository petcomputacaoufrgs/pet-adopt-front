import {InfoContent, InfoContainer} from "./styles";
import ButtonComponent from "../button1";
import {IInfo} from "./types"


const InfoComponent = ({ subTitle, title, to, children}: IInfo) => {
  return (    

    <InfoContainer>

      <InfoContent>
        <h1>{subTitle}</h1>
        <h3>{title}</h3>
        {children}
      </InfoContent>

      <ButtonComponent title="Ver Nossos Animaizinhos" to={to} background="#FF9944"/>

    </InfoContainer>
    
  );
};

export default InfoComponent;
