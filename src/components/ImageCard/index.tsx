import { CardContainer, CardInfo, StyledLink } from "./styles";
import { ICard } from "./types";

import ActionText from "../ActionText";

const ImageCard = ({
  title,
  textColor,
  backgroundColor,
  backgroundImage,
  to,
  width,
  heightDesktop,
  heightMobile,
}: ICard) => {
  
  return (
    <>
      <StyledLink
        to={to}
        $width={width}
        $heightDesktop={heightDesktop}
        $heightMobile={heightMobile}
      >
        <CardContainer $backgroundColor={backgroundColor || "transparent"} $backgroundImage={backgroundImage || "none"}>
          <CardInfo $textColor={textColor}>
            <h3>{title}</h3>
            <ActionText
              onClick={() => {}}
              hasArrowSvg={true}
              fontSize="calc(10px + 1vw)"
              textColor={textColor}
            >
              Ver mais
            </ActionText>
          </CardInfo>
        </CardContainer>
      </StyledLink>
    </>
  );
};

export default ImageCard;