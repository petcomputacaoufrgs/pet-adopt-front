import { useEffect, useState } from "react";
import { BannerContainer, BannerImage, BannerTextContainer, ContentContainer } from "./styles";
import { IBanner } from "./types";


const BannerComponent = ({color, image_url, title, subTitle, limitWidthForImage}: IBanner) => {

    
    const [showImage, setShowImage] = useState(!limitWidthForImage || window.innerWidth >= parseFloat(limitWidthForImage));

    useEffect(() => {
        const handleResize = () => {
            const isWindowSmall = limitWidthForImage && window.innerWidth < parseFloat(limitWidthForImage);
            setShowImage(!isWindowSmall); 
        }

        window.addEventListener("resize", handleResize);
    
        return () => {
          window.removeEventListener("resize", handleResize)
        }
      }, [])

    return(
        <BannerContainer $backgroundColor={color} $limitWidthForImage={limitWidthForImage || ""}>
            <ContentContainer>
                <BannerTextContainer>
                    <h1>{title}</h1>
                    <h2>{subTitle}</h2>
                </BannerTextContainer>

                {showImage && <BannerImage src={image_url} />}
            </ContentContainer>
        </BannerContainer>
    )
};

export default BannerComponent;