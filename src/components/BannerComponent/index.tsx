import { BannerContainer, BannerImage, BannerTextContainer, ContentContainer } from "./styles";
import { IBanner } from "./types";


const BannerComponent = ({color, image_url, title, subTitle}: IBanner) => {
    return(
        <BannerContainer $backgroundColor={color}>
            <ContentContainer>
                <BannerTextContainer>
                    <h1>{title}</h1>
                    <h2>{subTitle}</h2>
                </BannerTextContainer>

                <BannerImage src={image_url} />
            </ContentContainer>
        </BannerContainer>
    )
};

export default BannerComponent;