import { Image1, Img1Container} from "./styles";

import { IBack } from "./types";

const Background = ({image_url1, image_url2, image_url3}: IBack) => {
    return(
        <Img1Container>
            <Image1 src={image_url1} top="0%" left="0%" width="50%" height="auto" translate="0%" zIndex={3}/>
            <Image1 src={image_url2} top="50%" left="50%" width="60%" height="auto" translate="-50%" zIndex={2}/>
            <Image1 src={image_url3} top="100%" left="100%" width="60%" height="auto" translate="-100%" zIndex={1}/>
        </Img1Container>        
    )
};

export default Background;