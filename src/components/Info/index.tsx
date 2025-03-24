import {InfoContent, InfoContainer} from "./styles";
import ButtonComponent from "../button1";
import {IInfo} from "./types"


const InfoComponent = ({ subTitle, title, buttonTitle, to, position, children}: IInfo) => {
  return (    

    <InfoContainer position = {position}>

      <InfoContent position = {position}>
        <h1>{subTitle}</h1>
        <h3>{title}</h3>
        {children}
      </InfoContent>

      <ButtonComponent title={buttonTitle} to={to} background="#FF9944" border="none"/>

    </InfoContainer>
    
  );
};

export default InfoComponent;
