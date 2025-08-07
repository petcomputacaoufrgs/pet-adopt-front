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

const OngInfoCard: React.FC<OngInfoCardProps> = ({
  ngo,
  showApproveButtons = false,
  showEditOptions = false,
  onApproveClick,
  onRejectClick,
  onEditClick,
  onDeleteClick,
  selected = false,
}) => {
  const [hovered, setHovered] = useState(false);

  // Criar array com informações da ONG baseado nos dados recebidos
  const ngoInfo = [
    ngo?.city || "",
    ngo?.email || "",
    ngo?.phone || "",
    ngo?.cnpj || ""
  ];

  const ngoIcons = [
    Location,
    Email,
    Phone,
    Id
  ];

  // Configurar links das redes sociais baseado nos dados da ONG
  const socialMediaLinks = [
    {
      orange: InstagramPin,
      brown: InstagramBrownPin,
      alt: "Instagram",
      href: ngo?.instagram,
      available: !!ngo?.instagram
    },
    {
      orange: FacebookIcon,
      brown: FacebookBrownIcon,
      alt: "Facebook",
      href: ngo?.facebook,
      available: !!ngo?.facebook
    },
    {
      orange: YoutubePin,
      brown: YoutubeBrownPin,
      alt: "YouTube",
      href: ngo?.youtube,
      available: !!ngo?.youtube
    },
    {
      orange: TiktokIcon,
      brown: TiktokBrownIcon,
      alt: "TikTok",
      href: ngo?.tiktok,
      available: !!ngo?.tiktok
    }
  ].filter(social => social.available); // Mostrar apenas redes sociais disponíveis

  return (
    <CardContainer
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      $estado={selected ? "selected" : hovered ? "hover" : "default"}
      $modo={showApproveButtons ? "approve" : showEditOptions ? "edit" : "none"}
    >
      <Cabecalho>
        <OngTextGroup>
          <OngName>{ngo?.name || "Nome não informado"}</OngName>
          <OngType>ONG</OngType>
        </OngTextGroup>

        {showEditOptions && ngo &&(
          <EditButtonWrapper>
            <EditButton
              width="34px"
              height="34px"
              options={[
                { 
                  label: "Editar", 
                  onClick: () => onEditClick?.(ngo), 
                  iconSrc: PencilIcon 
                },
                { 
                  label: "Excluir", 
                  onClick: () => onDeleteClick?.(ngo), 
                  iconSrc: DeleteIcon 
                },
              ]}
            />
          </EditButtonWrapper>
        )}
      </Cabecalho>

      <InfoSection>
        {ngoInfo.map((info, i) => (
          info != "" && (<DataItem key={i}>
            <img src={ngoIcons[i]} alt="" />
            <p>{info}</p>
          </DataItem>)
        ))}

        {socialMediaLinks.length > 0 && (
          <SocialIconsDiv>
            {socialMediaLinks.map(({ href, orange, brown, alt }, index) => (
              <a key={index} href={href} target="_blank" rel="noopener noreferrer">
                <Icon $orange={orange} $brown={brown} aria-label={alt} />
              </a>
            ))}
          </SocialIconsDiv>
        )}
        
        <div>
          <ButtonLink href="#" link_type="primary" fontsize="15px">
            Saiba Mais
          </ButtonLink>
        </div>
      </InfoSection>

      {showApproveButtons && ngo &&(
        <NGOApproveButtonWrapper>
          <PrimarySecondaryButton
            buttonType="Secundário"
            content="Recusar"
            onClick={() => onRejectClick?.(ngo)}
            height="40px"
            paddingV=""
            paddingH=""
            $flex
          />
          <PrimarySecondaryButton
            buttonType="Primário"
            content="Aceitar"
            onClick={() => onApproveClick?.(ngo)}
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
