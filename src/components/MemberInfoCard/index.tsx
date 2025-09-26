import React, { useState } from "react";
import {
  CardContainer,
  InfoSection,
  MemberName,
  MemberType,
  DataItem,
  EditButtonWrapper,
  MemberApproveButtonWrapper,
  Cabecalho,
  MemberTextGroup,
} from "./styles";
import { MemberInfoCardProps } from "./types";
import Phone from "../../assets/phone.svg";
import Email from "../../assets/email.svg";
import DeleteIcon from "../../assets/DeleteIcon.svg";
import PencilIcon from "../../assets/PencilIcon.svg";

import EditButton from "../EditButton";
import PrimarySecondaryButton from "../PrimarySecondaryButton";

const MemberInfoCard: React.FC<MemberInfoCardProps> = ({
  member,
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
      $modo={showApproveButtons ? "approve" : showEditOptions ? "edit" : "none"}
    >
      <Cabecalho>
        <MemberTextGroup>
          <MemberName>{member?.name || "Nome não informado"}</MemberName>
          <MemberType>Administrador</MemberType>
        </MemberTextGroup>

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

       {showApproveButtons && member &&(
        <MemberApproveButtonWrapper>
          <PrimarySecondaryButton
            buttonType="Secundário"
            content="Recusar"
            onClick={() => onRejectClick?.(member)}
            height="40px"
            paddingV=""
            paddingH=""
            $flex
          />
          <PrimarySecondaryButton
            buttonType="Primário"
            content="Aceitar"
            onClick={() => onApproveClick?.(member)}
            height="40px"
            paddingV=""
            paddingH=""
            $flex
          />
        </MemberApproveButtonWrapper>
      )}

    </CardContainer>
  );
};

export default MemberInfoCard;
