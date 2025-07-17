import React, { useState } from "react";

import { ToggleContainer, ToggleButton } from "./styles";
import { ToggleButtonProps } from "./types";

const MainToggle: React.FC<ToggleButtonProps> = ({
  selected,
  fontSize,
  disabledButton = false,
}) => {
  const [selectedType, setSelectedType] = useState<"ngo" | "member">(selected);

  return (
    <ToggleContainer>
      <ToggleButton
        buttonType="ngo"
        selected={selectedType}
        disabledButton={disabledButton}
        onClick={() => !disabledButton && setSelectedType("ngo")}
      >
        Cadastro de ONG
      </ToggleButton>

      <ToggleButton
        buttonType="member"
        selected={selectedType}
        disabledButton={disabledButton}
        onClick={() => !disabledButton && setSelectedType("member")}
      >
        Cadastro de Membro
      </ToggleButton>
    </ToggleContainer>
  );
};

export default MainToggle;