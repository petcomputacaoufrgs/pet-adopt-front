import React, { useState } from "react";
import {
  CardContainer,
  InfoSection,
  MemberName,
  MemberType,
  DataItem,
  MemberApproveButtonWrapper,
  Cabecalho,
  MemberTextGroup,
  ActionsBox,
  Area
} from "./styles";
import type { MemberInfoCardProps } from "./types";
import Phone from "../../assets/phone.svg";
import Email from "../../assets/email.svg";

import PrimarySecondaryButton from "../PrimarySecondaryButton";

const MemberInfoCard: React.FC<MemberInfoCardProps> = ({
  member,
  showApproveButtons = false,
  showDeleteOptions = false,
  onApproveClick,
  onRejectClick,
  onDeleteClick,
  selected = false,
}) => {
  const [hovered, setHovered] = useState(false);

  const memberInfo = [
    member?.email || "",
  ];

  const memberIcons = [
    Email,
    Phone,
  ];

  const showActions = showApproveButtons || showDeleteOptions;


  return (
    
      <CardContainer
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        $estado={selected ? "selected" : hovered ? "hover" : "default"}
      >
      <Area>
        <Cabecalho>
          <MemberTextGroup>
            <MemberName>{member?.name || "Nome não informado"}</MemberName>
            <MemberType>Administrador</MemberType>
          </MemberTextGroup>
        </Cabecalho>

        <InfoSection>
          {memberInfo.map((info, i) => (
            info != "" && (<DataItem key={i}>
              <img src={memberIcons[i]} alt="" />
                <p title={info}>{info}</p>
            </DataItem>)
          ))}
        </InfoSection>
      </Area>
      {showActions && (
        <ActionsBox>
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

          {showDeleteOptions && member && (
            <PrimarySecondaryButton
                buttonType="Secundário"
                content="Excluir"
                onClick={() => onDeleteClick?.(member)}
                height="40px"
                width="100%"
            />
          )}
        </ActionsBox>
      )}
    </CardContainer>
  );
};

export default MemberInfoCard;
