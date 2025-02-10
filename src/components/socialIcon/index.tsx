import { CardContainer, InfoContent, StyledLink, Image} from "./styles"
import {IButton} from "./types"


const SocialIcon = ({ image, width, to, background }: IButton) => {
    return (    
  
        <StyledLink to = {to}>
  
          <CardContainer background_color ={background}>
            
            <InfoContent>
              <Image src={image} width={width}/>
            </InfoContent>
            
          </CardContainer> 
  
        </StyledLink>
      
    );
  };

  export default SocialIcon;