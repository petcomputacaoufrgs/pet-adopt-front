import { useTransition } from "react";

import { InfoContainer, InfoContent } from "./styles";
import { IInfo } from "./types";

import PrimarySecondaryButton from "../PrimarySecondaryButton";
import { useNavigate } from "react-router-dom";

const Info = ({ subTitle, title, subtitleFontSize = "clamp(1.2rem, 3vw, 32)", titleFontSize = "clamp(1.5rem, 4vw, 2em)", buttonTitle, to, position, children }: IInfo) => {

  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const handleButtonClick = () => {
    startTransition(() => {
      navigate(to);
    });
  };

  return (
    <InfoContainer $position={position}>
      <InfoContent $position={position} $subtitleFontSize={subtitleFontSize} $titleFontSize={titleFontSize}>
          <h1>{subTitle}</h1>
          <h3>{title}</h3>
        {children}
      </InfoContent>

      <PrimarySecondaryButton
        width={"auto"}
        buttonType={"Primário"}
        isDisabled={false}
        content={buttonTitle}
        onClick={handleButtonClick}
        paddingH="20px"
        paddingV="10px"
      />
    </InfoContainer>
  );
};

export default Info;