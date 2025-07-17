import React from "react";

import {
  AgeLocationContainer,
  AnimalName,
  AnimalRace,
  CardCenteredContainer,
  CardContainer,
  CardInfoContainer,
  CardTagsContainer,
  Image,
  PinText,
} from "./styles";
import { ICard } from "./types";

import Tag from "../Tags";

import LocationPin from "../../assets/LocationPin.png"; // Assuming LocationPin is generic
import PawPin from "../../assets/PawPin.png"; // Assuming PawPin is generic

const DogCard = ({ imageUrl, sex, size, name, race, age, location }: ICard) => {
  return (
    <CardContainer>
      <Image src={imageUrl} />

      <CardInfoContainer>
        <CardCenteredContainer>
          <CardTagsContainer>
            <Tag $text={sex} type={"light"} fontSize={"14px"} />
            <Tag $text={size} type={"light"} fontSize={"14px"} />
          </CardTagsContainer>

          <AnimalName>{name}</AnimalName>

          <AnimalRace>{race}</AnimalRace>

          <AgeLocationContainer>
            <PinText style={{ marginBottom: "5px" }}>
              <img id="paw" src={PawPin} alt="Paw Pin" />
              <text>{age} Anos de idade</text>
            </PinText>

            <PinText>
              <img id="loc" src={LocationPin} alt="Location Pin" />
              <text>{location}</text>
            </PinText>
          </AgeLocationContainer>
        </CardCenteredContainer>
      </CardInfoContainer>
    </CardContainer>
  );
};

export default DogCard;