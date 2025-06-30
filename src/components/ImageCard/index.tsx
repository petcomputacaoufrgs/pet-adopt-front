import {CardContainer, CardInfo, StyledLink} from "./styles";

import {ICard} from "./types"

import LinkText from "../ActionText";
import ActionText from "../ActionText";
import { useNavigate } from "react-router-dom";


const ImageCard = ({ title, text_color, background_color, background_image, to , width, height_desktop, height_mobile}: ICard) => {

  const navigateTo = useNavigate();


  return (
<>
    <StyledLink to={to} $width={width} $heightDesktop={height_desktop} $heightMobile={height_mobile}>
      <CardContainer $backgroundColor={background_color || "transparent"} $backgroundImage={background_image || "none"}>

        <CardInfo $textColor={text_color}>
          <h3>{title}</h3>
          <ActionText onClick={(e) => navigateTo("/")} has_arrow_svg={true} font_size="calc(10px + 1vw)" text_color={text_color}>Ver mais</ActionText>
        </CardInfo>

      </CardContainer>

    </StyledLink>


    

</>
  );
};

export default ImageCard;
