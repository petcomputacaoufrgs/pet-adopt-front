import { PrimaryButton, SecondaryButton } from "./styles";

import {IButton} from "./types"

const PrimarySecondaryButton = ({ width, buttonType = "Primário", isDisabled = false, highlighted = false, content, onClick, maxHeight,  $flex=false, $fontSize="clamp(12px, 1vw, 18px)"}: IButton) => {
    return ( 
      <>

        {(buttonType === "Primário") ? (
          <PrimaryButton $width={width} onClick={onClick} disabled={isDisabled} $highlighted={highlighted} $maxHeight={maxHeight} $flex={$flex} $fontSize={$fontSize}>{content}</PrimaryButton>
        ) : (
          <SecondaryButton $width={width} onClick={onClick} disabled={isDisabled} $highlighted={highlighted} $maxHeight={maxHeight} $flex={$flex} $fontSize={$fontSize}>{content}</SecondaryButton>
        )}
        
      </>
    )
  };

  export default PrimarySecondaryButton;