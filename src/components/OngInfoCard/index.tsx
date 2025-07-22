import React, { useState } from "react";
import { CardContainer, InfoSection, OngName, OngType, DataItem, EditButtonWrapper, NGOApproveButtonWrapper, SocialMediaGroup, Cabecalho} from "./styles";
import { OngInfoCardProps } from "./types";
import Location from "../../assets/Location.png"
import  Id from "../../assets/identifier.png";
import Phone from "../../assets/phone.png"
import Contact from "../../assets/contact.png"

import PrimarySecondaryButton from "../PrimarySecondaryButton"; 
import EditButton from "../EditButton";
import ButtonLink from "../ButtonLink/ButtonLink";
import ConfirmModal from "../ConfirmModal";
import DeleteIcon from "../../assets/DeleteIcon.svg";
import PencilIcon from "../../assets/PencilIcon.svg";
import FacebookIcon from "../../assets/OrangeFacebookPin.png"



export const OngInfoCard: React.FC<OngInfoCardProps> = ({
  modo = "edit",
  estado = "default",
  modalAction,
  setModalAction,
  handleConfirm,
}) => {
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(estado === "selected");

  return (

    <CardContainer
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      $estado={selected ? "selected" : hovered ? "hover" : "default"}
      $modo={modo}
    >
    <Cabecalho>
        {modo === "edit" && selected && (
        <EditButtonWrapper>
            <EditButton
              width="34px"
              height="34px"
              options={[
                { label: "Editar", onClick: () => {}, iconSrc: PencilIcon },
                { label: "Excluir", onClick: () => {}, iconSrc: DeleteIcon },
              ]}
            />
          </EditButtonWrapper>
      )}
      <OngName>Nome da ONG</OngName>
      <OngType>Ong</OngType>
      </Cabecalho>

      <InfoSection>
        <DataItem><img className="bullet_imgs" src={Location}/>São Pedro da Água Branca</DataItem>
        <DataItem><img className="bullet_imgs" src={Contact}/>contato@amorpetong.org</DataItem>
        <DataItem><img className="bullet_imgs" src={Id}/>CPF/CNPJ</DataItem>
        <DataItem><img className="bullet_imgs" src={Phone}/>(51) 98765-4321</DataItem>
        <SocialMediaGroup>
            <DataItem><img className="bullet_imgs" src={FacebookIcon}></img></DataItem>
            <DataItem><img className="bullet_imgs" src={FacebookIcon}></img></DataItem>
            <DataItem><img className="bullet_imgs" src={FacebookIcon}></img></DataItem>
            <DataItem><img className="bullet_imgs" src={FacebookIcon}></img></DataItem>
        </SocialMediaGroup>
        <ButtonLink href="#" link_type="primary" fontsize = "16px">Saiba mais</ButtonLink>
      </InfoSection>

      

       {modo === "approve" && (
        <NGOApproveButtonWrapper>
          <PrimarySecondaryButton buttonType="Secundário" content="Recusar" onClick={() => setModalAction('recusar')}  $flex/>
          <PrimarySecondaryButton buttonType="Primário" content="Aceitar" onClick={() => setModalAction('aprovar')} $flex />

          <ConfirmModal
            isOpen={modalAction !== null}
            title={
              modalAction === 'aprovar'
                ? 'Que bom que gostou! Deseja aprovar esta ONG?'
                : 'Tem certeza que deseja recusar esta ONG?'
            }
            message={
              modalAction === 'aprovar'
                ? 'Tem certeza de que deseja aprovar esta ONG? Caso mude de ideia, você poderá removê-la depois.'
                : 'Uma vez recusada, a ONG sairá da lista de avaliação.'
            }
            confirmLabel={modalAction === 'aprovar' ? 'Sim, Aprovar' : 'Sim, Recusar'}
            cancelLabel="Cancelar"
            onConfirm={handleConfirm}
            onClose={() => setModalAction(null)}
          />
        </NGOApproveButtonWrapper>
      )}

     
    </CardContainer>
  );
};
export default OngInfoCard;
