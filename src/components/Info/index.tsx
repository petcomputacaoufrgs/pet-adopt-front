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

      <PrimarySecondaryButton width={"50px"} buttonType={"Primário"} isDisabled={false} content={buttonTitle} onClick={1} />

    </InfoContainer>
    
  );
};

export default InfoComponent;
