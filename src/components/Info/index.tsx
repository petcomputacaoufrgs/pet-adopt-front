import {InfoContent, InfoContainer} from "./styles";
import PrimarySecondaryButton from "../PrimarySecondaryButton";
import {IInfo} from "./types"


const InfoComponent = ({ subTitle, title, buttonTitle, to, position, children}: IInfo) => {
  return (    

    <InfoContainer position = {position}>

      <InfoContent position = {position}>
        <h1>{subTitle}</h1>
        <h3>{title}</h3>
        {children}
      </InfoContent>

      <PrimarySecondaryButton width={"181px"} buttonType={"Primário"} isDisabled={true} content={"Botão X"} onClick={1}/>

    </InfoContainer>
    
  );
};

export default InfoComponent;
