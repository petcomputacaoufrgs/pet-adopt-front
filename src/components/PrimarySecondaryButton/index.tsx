import { PrimaryButton, SecondaryButton } from "./styles";

import {IButton} from "./types"

const PrimarySecondaryButton = ({ width, buttonType = "Primário", isDisabled = false, highlighted = false, content, onClick, maxHeight,  $flex=false}: IButton) => {
    return ( 
      <>

        {(buttonType === "Primário") ? (
          <PrimaryButton $width={width} onClick={onClick} disabled={isDisabled} $highlighted={highlighted} $maxHeight={maxHeight} $flex={$flex}>{content}</PrimaryButton>
        ) : (
          <SecondaryButton $width={width} onClick={onClick} disabled={isDisabled} $highlighted={highlighted} $maxHeight={maxHeight} $flex={$flex}>{content}</SecondaryButton>
        )}
        
      </>
    )
  };

  export default PrimarySecondaryButton;