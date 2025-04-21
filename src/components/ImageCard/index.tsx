import {CardContainer, CardInfo, StyledLink} from "./styles";

import {ICard} from "./types"

import LinkText from "../LinkText/LinkText";


const ImageCard = ({ title, text_color, background_color, background_image, to , width, height_desktop, height_mobile}: ICard) => {
  return (
<>
    <StyledLink to={to} $width={width} $heightDesktop={height_desktop} $heightMobile={height_mobile}>
      <CardContainer $backgroundColor={background_color || "transparent"} $backgroundImage={background_image || "none"}>

        <CardInfo $textColor={text_color}>
          <h3>{title}</h3>
          <LinkText to="/" link_type="primary" font_size="calc(10px + 1vw)" text_color={text_color}>Ver mais</LinkText>
        </CardInfo>

      </CardContainer>

    </StyledLink>


    

</>
  );
};

export default ImageCard;
