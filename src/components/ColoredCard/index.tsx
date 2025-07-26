import React, { useEffect, useState } from "react";

import { CardContainer, CardInfo, Image, StyledLink } from "./styles";
import { ICard } from "./types";

const ColoredCard = ({
  title,
  backgroundColor,
  imageUrl,
  imageUrlMobile,
  to,
  children,
}: ICard) => {
  const [image, setImage] = useState(window.innerWidth > 768 ? imageUrl : imageUrlMobile);

  useEffect(() => {
    const handleResize = () => {
      setImage(window.innerWidth > 768 ? imageUrl : imageUrlMobile);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [imageUrl, imageUrlMobile]); 

  return (
    <StyledLink to={to}>
      <CardContainer $backgroundColor={backgroundColor || "transparent"}>
        {image ? <Image src={image} /> : null}

        <CardInfo>
          <h3>{title}</h3>
          {children}
        </CardInfo>
      </CardContainer>
    </StyledLink>
  );
};

export default ColoredCard;