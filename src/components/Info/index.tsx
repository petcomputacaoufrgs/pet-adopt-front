import {InfoContent, InfoContainer} from "./styles";

import {IInfo} from "./types"

import PrimarySecondaryButton from "../PrimarySecondaryButton";

const Info = ({ subTitle, title, buttonTitle, to, position, children}: IInfo) => {
  return (    

    <InfoContainer $position = {position}>

      <InfoContent $position = {position}>
        <h1>{subTitle}</h1>
        <h3>{title}</h3>
        {children}
      </InfoContent>

      <PrimarySecondaryButton width={"50px"} buttonType={"Primário"} isDisabled={false} content={buttonTitle} onClick={1} />

    </InfoContainer>
    
  );
};

export default Info;
