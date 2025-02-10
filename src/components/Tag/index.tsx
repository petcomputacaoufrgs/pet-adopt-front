import {IText} from "./types"
import {TextContainer} from "./styles";


const Tag = ({ text }: IText) => {
  return (
      <TextContainer>{text}</TextContainer>
  );
};

export default Tag;