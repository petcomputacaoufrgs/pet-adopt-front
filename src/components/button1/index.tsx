import { CardContainer, InfoContent, StyledLink} from "./styles"
import {IButton} from "./types"


const ButtonComponent = ({ title, to, background }: IButton) => {
    return (    
  
        <StyledLink to = {to}>
  
          <CardContainer background_color ={background}>
            
            <InfoContent>
              <h4>{title}</h4>
            </InfoContent>
            
          </CardContainer> 
  
        </StyledLink>
      
    );
  };

  export default ButtonComponent;