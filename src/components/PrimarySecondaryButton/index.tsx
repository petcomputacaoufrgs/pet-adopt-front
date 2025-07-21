import { PrimaryButton, SecondaryButton } from "./styles";

import {IButton} from "./types"

const PrimarySecondaryButton = ({ width, buttonType = "Primário", isDisabled = false, highlighted = false, content, onClick,  $flex=false}: IButton) => {
    return ( 
      <>

        {(buttonType === "Primário") ? (
          <PrimaryButton $width={width} onClick={onClick} disabled={isDisabled} $highlighted={highlighted} $flex={$flex}>{content}</PrimaryButton>
        ) : (
          <SecondaryButton $width={width} onClick={onClick} disabled={isDisabled} $highlighted={highlighted} $flex={$flex}>{content}</SecondaryButton>
        )}
        
      </>
    )
  };

  export default PrimarySecondaryButton;