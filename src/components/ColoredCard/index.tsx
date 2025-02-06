import {CardContainer, Image, CardInfo, StyledLink} from "./styles";
import {ICard} from "./types"


const ColoredCard = ({ title, background_color, image_url, image_url_mobile, to, children }: ICard) => {
  return (
    

    <StyledLink to={to}>

      <CardContainer background_color={background_color}>
        <Image src={image_url}/>
        <CardInfo>
          <h3>{title}</h3>
          {children}
        </CardInfo>
      </CardContainer>

    </StyledLink>
  );
};

export default ColoredCard;
