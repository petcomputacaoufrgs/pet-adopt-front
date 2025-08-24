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
import { MemberInfoCardProps } from "./types";

import Location from "../../assets/location.svg";
import Id from "../../assets/id.svg";
import Phone from "../../assets/phone.svg";
import Email from "../../assets/email.svg";
import DeleteIcon from "../../assets/DeleteIcon.svg";
import PencilIcon from "../../assets/PencilIcon.svg";

import EditButton from "../EditButton";

const MemberInfoCard: React.FC<MemberInfoCardProps> = ({
  member,
  onEditClick,
  onDeleteClick,
  selected = false,
}) => {
  const [hovered, setHovered] = useState(false);

  // Criar array com informações da ONG baseado nos dados recebidos
  const memberInfo = [
    member?.email || "",
  ];

  const memberIcons = [
    Email,
    Phone,
  ];


  return (
    <CardContainer
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      $estado={selected ? "selected" : hovered ? "hover" : "default"}
    >
      <Cabecalho>
        <OngTextGroup>
          <OngName>{member?.name || "Nome não informado"}</OngName>
          <OngType>Administrador</OngType>
        </OngTextGroup>

        {member &&(
          <EditButtonWrapper>
            <EditButton
              width="34px"
              height="34px"
              options={[
                { 
                  label: "Editar", 
                  onClick: () => onEditClick?.(member), 
                  iconSrc: PencilIcon 
                },
                { 
                  label: "Excluir", 
                  onClick: () => onDeleteClick?.(member), 
                  iconSrc: DeleteIcon 
                },
              ]}
            />
          </EditButtonWrapper>
        )}
      </Cabecalho>

      <InfoSection>
        {memberInfo.map((info, i) => (
          info != "" && (<DataItem key={i}>
            <img src={memberIcons[i]} alt="" />
            <p>{info}</p>
          </DataItem>)
        ))}
      </InfoSection>

    </CardContainer>
  );
};

export default MemberInfoCard;
