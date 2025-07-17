import React from "react";
import { useNavigate } from "react-router-dom";

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
  const navigateTo = useNavigate(); // navigateTo is declared but not used in the return statement

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