import React, { useState } from "react";
import {
  CardContainer,
  InfoSection,
  OngName,
  OngType,
  DataItem,
  EditButtonWrapper,
  NGOApproveButtonWrapper,
  SocialMediaGroup,
  Cabecalho,
  OngTextGroup,
} from "./styles";
import { OngInfoCardProps } from "./types";

import Location from "../../assets/Location.png";
import Id from "../../assets/identifier.png";
import Phone from "../../assets/phone.png";
import Contact from "../../assets/contact.png";
import FacebookIcon from "../../assets/OrangeFacebookPin.png";
import DeleteIcon from "../../assets/DeleteIcon.svg";
import PencilIcon from "../../assets/PencilIcon.svg";

import PrimarySecondaryButton from "../PrimarySecondaryButton";
import EditButton from "../EditButton";
import ButtonLink from "../ButtonLink/ButtonLink";

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
        <DataItem>
          <img className="bullet_imgs" src={Location} />
          Cidade da ONG
        </DataItem>
        <DataItem>
          <img className="bullet_imgs" src={Contact} />
          contato@exemplo.org
        </DataItem>
        <DataItem>
          <img className="bullet_imgs" src={Id} />
          00.000.000/0000-00
        </DataItem>
        <DataItem>
          <img className="bullet_imgs" src={Phone} />
          (00) 00000-0000
        </DataItem>

        <SocialMediaGroup>
          {[...Array(4)].map((_, i) => (
            <DataItem key={i}>
              <img className="bullet_imgs" src={FacebookIcon} alt="Icone social" />
            </DataItem>
          ))}
        </SocialMediaGroup>

        <ButtonLink href="#" link_type="primary" fontsize="16px">
          Saiba mais
        </ButtonLink>
      </InfoSection>

      {showApproveButtons && (
        <NGOApproveButtonWrapper>
          <PrimarySecondaryButton
            buttonType="Secundário"
            content="Recusar"
            onClick={onRejectClick}
            $flex
          />
          <PrimarySecondaryButton
            buttonType="Primário"
            content="Aceitar"
            onClick={onApproveClick}
            $flex
          />
        </NGOApproveButtonWrapper>
      )}
    </CardContainer>
  );
};

export default OngInfoCard;
