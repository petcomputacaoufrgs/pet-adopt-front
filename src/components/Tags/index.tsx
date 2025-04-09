import {TagContainer} from "./styles";

import {TagProps } from "./types";

import Check from "../../assets/CheckTags.png";

const Tag: React.FC<TagProps> = ({ text , type = "orange", fontSize, hasCheck = false}) => {
  return (
    <TagContainer type={type} fontSize={fontSize} text={text}> 
      {hasCheck && <img id="checkmark" src={Check} alt="checkmark"/>}
      {text}
    </TagContainer>
  );
};

export default Tag;