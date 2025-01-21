import LinkText from "../LinkText/LinkText";
import {CardContainer, Image, CardInfo, StyledLink, ButtonDiv} from "./styles";
import {ICard} from "./types"


const ImageCard = ({ title, text_color, background_color, background_image, to , width, height}: ICard) => {
  return (
<>
    <StyledLink to={to} width={width} height={height}>
      <CardContainer background_color={background_color || "transparent"} background_image={background_image || "none"}>

        <CardInfo text_color={text_color}>
          <h3>{title}</h3>
          <LinkText to="/" link_type="primary" font_size="1.4vw" text_color={text_color}>Ver mais</LinkText>
        </CardInfo>

      </CardContainer>

    </StyledLink>


    

</>
  );
};

export default ImageCard;
