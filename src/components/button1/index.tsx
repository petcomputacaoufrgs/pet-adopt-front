import { CardContainer, InfoContent, StyledLink} from "./styles"
import {IButton} from "./types"


const ButtonComponent = ({ title, to, background, border}: IButton) => {
    return (    
  
        <StyledLink to = {to}>
  
          <CardContainer background_color ={background} border = {border}>
            
            <InfoContent>
              <h4>{title}</h4>
            </InfoContent>
            
          </CardContainer> 
  
        </StyledLink>
      
    );
  };

  export default ButtonComponent;