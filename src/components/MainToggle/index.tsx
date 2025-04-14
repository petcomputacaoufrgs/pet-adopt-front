import {ToggleContainer} from "./styles";
import {ToggleButton} from "./styles";
import {ToggleButtonProps} from "./types";
import { useState } from "react";



const MainToggle: React.FC<ToggleButtonProps> = ({ selected, fontSize, disabledButton = false }) => {
  const [selectedType, setSelectedType] = useState<"ngo" | "member">(selected);
 

  return (
    <ToggleContainer>
      <ToggleButton
        buttonType="ngo"
        selected = {selectedType}
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