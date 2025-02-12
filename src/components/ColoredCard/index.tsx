import { useEffect, useState } from "react";
import {CardContainer, Image, CardInfo, StyledLink} from "./styles";
import {ICard} from "./types"


const ColoredCard = ({ title, background_color, image_url, image_url_mobile, to, children }: ICard) => {

  const [image, setImage] = useState(window.innerWidth > 768 ? image_url : image_url_mobile);

  useEffect(() => {
    const handleResize = () => {
      setImage(window.innerWidth > 768 ? image_url : image_url_mobile);
    };

    window.addEventListener("resize", handleResize);
    
    // Remover o event listener ao desmontar o componente para evitar vazamento de memória
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [image_url, image_url_mobile]); // Dependências para atualizar caso as URLs mudem

  return (
    <StyledLink to={to}>
      <CardContainer  background_color={background_color || "transparent"}>

        {image? <Image src={image}/> : null}

        <CardInfo>
          <h3>{title}</h3>
          {children}
        </CardInfo>
        
      </CardContainer>
    </StyledLink>
    

  );
};

export default ColoredCard;
