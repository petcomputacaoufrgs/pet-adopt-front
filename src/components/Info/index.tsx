import {InfoContent, CardContainer, InfoContainer, StyledLink} from "./styles";
import {IInfo} from "./types"


const InfoComponent = ({ subTitle, title, buttonTitle, background_button, to, children}: IInfo) => {
  return (    

    <InfoContainer>

      <InfoContent>
        <h1>{subTitle}</h1>
        <h3>{title}</h3>
        {children}
      </InfoContent>

      <StyledLink to = {to}>

        <CardContainer background_color ={background_button}>
          
          <InfoContent>
            <h4>{buttonTitle}</h4>
          </InfoContent>
          
        </CardContainer> 

      </StyledLink>

    </InfoContainer>
    
  );
};

export default InfoComponent;
