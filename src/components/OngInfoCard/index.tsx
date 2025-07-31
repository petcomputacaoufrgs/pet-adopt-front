import React, { useState } from "react";
import {
  CardContainer,
  InfoSection,
  OngName,
  OngType,
  DataItem,
  EditButtonWrapper,
  NGOApproveButtonWrapper,
  SocialIconsDiv,
  Icon,
  Cabecalho,
  OngTextGroup,
} from "./styles";
import { OngInfoCardProps } from "./types";

import Location from "../../assets/location.svg";
import Id from "../../assets/id.svg";
import Phone from "../../assets/phone.svg";
import Email from "../../assets/email.svg";
import DeleteIcon from "../../assets/DeleteIcon.svg";
import PencilIcon from "../../assets/PencilIcon.svg";

import PrimarySecondaryButton from "../PrimarySecondaryButton";
import EditButton from "../EditButton";
import ButtonLink from "../ButtonLink/ButtonLink";

// social icons
import FacebookIcon from "../../assets/OrangeFacebookPin.png"; 
import FacebookBrownIcon from "../../assets/BrownFacebookPin.png"; 
import InstagramPin from "../../assets/OrangeInstagramPin.png"; 
import InstagramBrownPin from "../../assets/BrownInstagramPin.png"; 
import TiktokIcon from "../../assets/OrangeTiktokPin.png"; 
import TiktokBrownIcon from "../../assets/BrownTiktokPin.png"; 
import YoutubePin from "../../assets/OrangeYoutubePin.png"; 
import YoutubeBrownPin from "../../assets/BrownYoutubePin.png"; 

const SOCIAL_MEDIA_LINKS = [
    { orange: InstagramPin, brown: InstagramBrownPin, alt: "Instagram", href: "https://www.instagram.com" },
    { orange: FacebookIcon, brown: FacebookBrownIcon, alt: "Facebook", href: "https://www.facebook.com" },
    { orange: YoutubePin, brown: YoutubeBrownPin, alt: "YouTube", href: "https://www.youtube.com" },
    { orange: TiktokIcon, brown: TiktokBrownIcon, alt: "TikTok", href: "https://www.tiktok.com" }
];


const NGO_INFO = [
    "São Pedro da Água Branca",
    "contato@amorpetong.org",
    "(51) 98765-4321",
    "CPF/CNPJ"
];

const NGO_ICONS = [
  Location,
  Email,
  Id,
  Phone
]

const OngInfoCard: React.FC<OngInfoCardProps> = ({
  showApproveButtons = false,
  showEditOptions = false,
  onApproveClick,
  onRejectClick,
  onEditClick,
  onDeleteClick,
  selected = false,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <CardContainer
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      $estado={selected ? "selected" : hovered ? "hover" : "default"}
      $modo={showApproveButtons ? "approve" : showEditOptions ? "edit" : "none"}
    >
      <Cabecalho>
        <OngTextGroup>
          <OngName>Nome da ONG</OngName>
          <OngType>Tipo da ONG</OngType>
        </OngTextGroup>

        {showEditOptions && (
          <EditButtonWrapper>
            <EditButton
              width="34px"
              height="34px"
              options={[
                { label: "Editar", onClick: onEditClick, iconSrc: PencilIcon },
                { label: "Excluir", onClick: onDeleteClick, iconSrc: DeleteIcon },
              ]}
            />
          </EditButtonWrapper>
        )}
      </Cabecalho>

      <InfoSection>
        
        {NGO_INFO.map((info, i) => (
            <DataItem key={i}>
              <img src={NGO_ICONS[i]} alt="" />
              <p>{info}</p>
            </DataItem>
          ))}
        

        <SocialIconsDiv>
            {SOCIAL_MEDIA_LINKS.map(({ href, orange, brown, alt }, index) => (
                <a key={index} href={href} target="_blank" rel="noopener noreferrer">
                    <Icon $orange={orange} $brown={brown} aria-label={alt} />
                </a>
            ))}
        </SocialIconsDiv>
        
        <div>
          <ButtonLink href="#" link_type="primary" fontsize="15px">
            Saiba Mais
          </ButtonLink>
        </div>
      </InfoSection>

      {showApproveButtons && (
        <NGOApproveButtonWrapper>
          <PrimarySecondaryButton
            buttonType="Secundário"
            content="Recusar"
            onClick={onRejectClick}
            height="40px"
            paddingV=""
            paddingH=""
            $flex
          />
          <PrimarySecondaryButton
            buttonType="Primário"
            content="Aceitar"
            onClick={onApproveClick}
            height="40px"
            paddingV=""
            paddingH=""
            $flex
          />
        </NGOApproveButtonWrapper>
      )}
    </CardContainer>
  );
};

export default OngInfoCard;
