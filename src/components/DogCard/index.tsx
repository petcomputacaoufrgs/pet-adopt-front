import {ICard} from "./types"
import { CardContainer, Image, CardInfoContainer, CardCenteredContainer, CardTagsContainer, AnimalName, AnimalRace, AgeLocationContainer, PinText } from "./styles";
import Tag from "../Tag";
import LocationPin from "../../assets/LocationPin.png";
import PawPin from "../../assets/PawPin.png";

const DogCard = ({ image_url, sex, size, name, race, age, location, to }: ICard) => {
  return (
    <CardContainer>
      <Image src={image_url}/>
      
      <CardInfoContainer>
        <CardCenteredContainer>

          <CardTagsContainer>
            <Tag text={sex}/>
            <Tag text={size}/>
          </CardTagsContainer>
          
          <AnimalName>{name}</AnimalName>

          <AnimalRace>{race}</AnimalRace>

          <AgeLocationContainer>
            <PinText style={{marginBottom: "5px"}}>
              <img id="paw" src={PawPin} alt="Paw Pin"/>
              <text>{age} Anos de idade</text>
            </PinText>

            <PinText>
              <img id="loc" src={LocationPin} alt="Location Pin"/>
              <text>{location}</text>
            </PinText>
          </AgeLocationContainer> 

        </CardCenteredContainer>

      </CardInfoContainer>

    </CardContainer>
  );
};

export default DogCard;