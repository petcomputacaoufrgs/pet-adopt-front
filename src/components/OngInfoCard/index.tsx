import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  CardContainer,
  ClickableArea,
  ContentWrapper,
  InfoSection,
  OngName,
  OngType,
  DataItem,
  ActionsBox,
  Cabecalho,
  OngTextGroup,
} from "./styles";
import { OngInfoCardProps } from "./types";

// Assets Gerais
import Location from "../../assets/location.svg";
import Id from "../../assets/id.svg";
import Phone from "../../assets/phone.svg";
import Email from "../../assets/email.svg";

// Assets Social (Usando os Pins laranjas para combinar com os ícones SVG coloridos, ou marrons se preferir)
import FacebookIcon from "../../assets/OrangeFacebookPin.png"; 
import InstagramPin from "../../assets/OrangeInstagramPin.png"; 

// Components
import PrimarySecondaryButton from "../PrimarySecondaryButton";

const OngInfoCard: React.FC<OngInfoCardProps> = ({
  ngo,
  showApproveButtons = false,
  showDeleteOptions = false,
  onApproveClick,
  onRejectClick,
  onDeleteClick,
}) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  // Função auxiliar para deixar o link da rede social mais bonito (ex: @usuario)
  const formatSocialHandle = (url: string, platform: 'instagram' | 'facebook') => {
    try {
      // Remove protocolo e www
      let clean = url.replace(/(?:https?:\/\/)?(?:www\.)?/i, "");
      // Remove o domínio da plataforma
      if (platform === 'instagram') {
        clean = clean.replace(/instagram\.com\//i, "@").replace(/\/$/, "");
        return clean.startsWith("@") ? clean : `@${clean}`;
      }
      if (platform === 'facebook') {
        clean = clean.replace(/facebook\.com\//i, "/").replace(/\/$/, "");
        return clean.startsWith("/") ? clean.substring(1) : clean;
      }
      return url;
    } catch (e) {
      return platform === 'instagram' ? "Instagram" : "Facebook";
    }
  };

  // Lógica de Prioridade de Contato
  // 1. Telefone -> 2. Instagram -> 3. Facebook
  const getContactInfo = () => {
    if (ngo?.phone) {
      return { type: 'phone', icon: Phone, text: ngo.phone, link: null };
    }
    if (ngo?.instagram) {
      return { 
        type: 'instagram', 
        icon: InstagramPin, 
        text: formatSocialHandle(ngo.instagram, 'instagram'), 
        link: ngo.instagram 
      };
    }
    if (ngo?.facebook) {
      return { 
        type: 'facebook', 
        icon: FacebookIcon, 
        text: formatSocialHandle(ngo.facebook, 'facebook'), 
        link: ngo.facebook 
      };
    }
    return null;
  };

  const contactItem = getContactInfo();

  // Montagem da lista final de exibição
  const displayItems = [
    { icon: Location, text: ngo?.city ? `${ngo?.city}, ${ngo?.state}` : ngo?.state, link: null },
    { icon: Email, text: ngo?.email, link: null },
    contactItem, // Insere o item de contato decidido acima
    { icon: Id, text: ngo?.cnpj, link: null }
  ].filter(item => item && item.text); // Remove itens nulos ou sem texto

  // Determina se exibe a barra de ações
  const showActions = showApproveButtons || showDeleteOptions;

  return (
    <CardContainer $isHovered={hovered}>
      
      <ClickableArea
        onClick={() => navigate(`/NGOProfile/${ngo?._id}`)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <ContentWrapper>
          <Cabecalho>
            <OngTextGroup>
              <OngName>{ngo?.name || "Nome não informado"}</OngName>
              <OngType>ONG</OngType>
            </OngTextGroup>
          </Cabecalho>

          <InfoSection>
            {displayItems.map((item, index) => {
              if (!item) return null;

              // Se tiver link (Rede Social), renderiza clicável
              if (item.link) {
                return (
                  
                    <DataItem>
                      <img src={item.icon} alt="Social Icon" />
                      <p>{item.text}</p>
                    </DataItem>
                  
                );
              }

              // Item normal (Telefone, Email, etc)
              return (
                <DataItem key={index}>
                  <img src={item.icon} alt="Icon" />
                  <p>{item.text}</p>
                </DataItem>
              );
            })}
          </InfoSection>
        </ContentWrapper>
      </ClickableArea>

      {/* ÁREA DE AÇÕES */}
      {showActions && (
        <ActionsBox>
          {showApproveButtons && (
            <>
              <PrimarySecondaryButton
                buttonType="Secundário"
                content="Recusar"
                onClick={() => onRejectClick?.(ngo)}
                height="40px"
                $flex
              />
              <PrimarySecondaryButton
                buttonType="Primário"
                content="Aceitar"
                onClick={() => onApproveClick?.(ngo)}
                height="40px"
                $flex
              />
            </>
          )}

          {showDeleteOptions && (
            <PrimarySecondaryButton
                buttonType="Secundário"
                content="Excluir"
                onClick={() => onDeleteClick?.(ngo)}
                height="40px"
                width="100%"
            />
          )}
        </ActionsBox>
      )}
    </CardContainer>
  );
};

export default OngInfoCard;