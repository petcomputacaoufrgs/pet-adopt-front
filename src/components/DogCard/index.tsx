import React, { useState } from "react";
import {
  AgeLocationContainer,
  AnimalName,
  AnimalRace,
  CardContainer,
  ClickableArea, // Wrapper para Imagem + Info
  InfoBox,       // Parte de cima da caixa branca
  ActionsBox,    // Parte de baixo da caixa branca
  Divider,
  CardTagsContainer,
  Image,
  PinText,
  CardCenteredContainer
} from "./styles";
import { ICard } from "./types";
import Tag from "../Tags";
import DogForCard from "../../assets/HomePageCardDog.png";
import LocationPin from "../../assets/LocationPin.png"; 
import PawPin from "../../assets/PawPin.png"; 
import { useNavigate } from "react-router-dom";
import { useImage } from "../../hooks/useImage";
import PrimarySecondaryButton from "../PrimarySecondaryButton";

const DogCard = ({ imageUrl, sex, size, name, breed, race, age, location, id, onEdit, onDelete }: ICard) => {

  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  
  const { imageUrl: processedImageUrl } = useImage({
    imagePath: imageUrl,
    fallbackImage: DogForCard
  });

  const sexText = sex === "F" ? "Fêmea" : sex === "M"? "Macho" : sex;
  const sizeText = size === "P" ? "Pequeno" : size === "M" ? "Médio" : size === "G" ? "Grande" : size;

  // Verifica se a barra de ações existe
  const showActions = !!onEdit && !!onDelete;

  return (
    // O Container Pai recebe o estado para aplicar animações globais (transform)
    <CardContainer $isHovered={isHovered}>
      
      {/* ÁREA CLICÁVEL:
          Envolve a Imagem e a Parte de Cima das infos.
          Controla o estado de hover e a navegação.
      */}
      <ClickableArea 
        onClick={() => navigate(`/petProfile/${id}`)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image 
          src={processedImageUrl} 
          alt={name} 
          $isHovered={isHovered} 
        />

        <InfoBox $hasActions={showActions} $isHovered={isHovered}>
          <CardCenteredContainer>
            
            <CardTagsContainer>
              <Tag $text={sexText} type={"light"} fontSize={"14px"} />
              {size !== "" && <Tag $text={sizeText} type={"light"} fontSize={"14px"} />}
            </CardTagsContainer>

            <AnimalName>{name}</AnimalName>
            <AnimalRace>{race} {breed && `- ${breed}`}</AnimalRace>

            <AgeLocationContainer>
              <PinText style={{ marginBottom: "5px" }}>
                <img id="paw" src={PawPin} alt="Paw Pin" />
                <span>{age}</span>
              </PinText>

              <PinText>
                <img id="loc" src={LocationPin} alt="Location Pin" />
                <span>{location}</span>
              </PinText>
            </AgeLocationContainer>

          </CardCenteredContainer>
        </InfoBox>
      </ClickableArea>

      {/* ÁREA DE AÇÕES:
          Fica fora da ClickableArea.
          Visualmente conectada, mas não dispara navegação nem hover.
      */}
      {showActions && (
        <ActionsBox>
          
          <PrimarySecondaryButton
            width={"120px"}
            buttonType={"Primário"}
            isDisabled={false}
            content={"Editar"}
            onClick={onEdit}
            paddingH="10px"
            paddingV="8px"
            fontSize="14px"
          />

          <PrimarySecondaryButton
            width={"120px"}
            buttonType={"Secundário"}
            isDisabled={false}
            content={"Excluir"}
            onClick={onDelete}
            paddingH="10px"
            paddingV="8px"
            fontSize="14px"
          />  
        </ActionsBox>
      )}

    </CardContainer>
  );
};

export default DogCard;