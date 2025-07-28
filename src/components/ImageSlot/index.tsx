import { X } from "lucide-react";
import { useEffect } from "react";
import { DeleteButton, ImageSlotContainer } from "./styles";

import imagePlus from "../../assets/ImagePlus.svg"


type ImageSlotProps = {
  image: string | null;
  onClick: () => void;
  onRemove: () => void;
};

export function ImageSlot({ image, onClick, onRemove }: ImageSlotProps) {


  useEffect(() => {
  console.log("Imagem mudou:", image);
}, [image]);




  return (
    <ImageSlotContainer
      onClick={image? () => {} : onClick}
      $image={image}
    >
      {image ? (
        <div style={{width: "100%", height: "100%", position: "relative"}}>
          <DeleteButton
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          >
            <X strokeWidth={3} size={14} color="#FFF6E8" />
          </DeleteButton>
        </div>
      ) : (
        <img src={imagePlus} alt="ImagePlus"/>
      )}
    </ImageSlotContainer>
  );
}
