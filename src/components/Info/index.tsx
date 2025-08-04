import React from "react";

import { InfoContainer, InfoContent } from "./styles";
import { IInfo } from "./types";

import PrimarySecondaryButton from "../PrimarySecondaryButton";
import { useNavigate } from "react-router-dom";

const Info = ({ subTitle, title, buttonTitle, to, position, children }: IInfo) => {

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(to);
  };

  return (
    <InfoContainer $position={position}>
      <InfoContent $position={position}>
        <h1>{subTitle}</h1>
        <h3>{title}</h3>
        {children}
      </InfoContent>

      <PrimarySecondaryButton
        width={"clamp(100px, 60%, 275px)"}
        buttonType={"Primário"}
        isDisabled={false}
        content={buttonTitle}
        onClick={handleButtonClick}
        paddingH="5px"
        paddingV="10px"
      />
    </InfoContainer>
  );
};

export default Info;