import React, { useEffect, useState } from "react";

import { BannerContainer, BannerImage, BannerTextContainer, ContentContainer } from "./styles";
import { IBanner } from "./types";

const BannerComponent = ({ color, imageUrl, title, subTitle, limitWidthForImage }: IBanner) => {
  const [showImage, setShowImage] = useState(
    !limitWidthForImage || window.innerWidth >= parseFloat(limitWidthForImage)
  );

  useEffect(() => {
    const handleResize = () => {
      const isWindowSmall = limitWidthForImage && window.innerWidth < parseFloat(limitWidthForImage);
      setShowImage(!isWindowSmall);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [limitWidthForImage]);

  return (
    <BannerContainer $backgroundColor={color} $limitWidthForImage={limitWidthForImage || ""}>
      <ContentContainer>
        <BannerTextContainer>
          <h1>{title}</h1>
          <h2>{subTitle}</h2>
        </BannerTextContainer>

        {showImage && <BannerImage src={imageUrl} />}
      </ContentContainer>
    </BannerContainer>
  );
};

export default BannerComponent;