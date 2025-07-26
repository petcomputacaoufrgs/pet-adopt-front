import { PrimaryButton, SecondaryButton } from "./styles";

import {IButton} from "./types"

const PrimarySecondaryButton = ({ width, buttonType = "Primário", isDisabled = false, highlighted = false, content, onClick, maxHeight}: IButton) => {
    return ( 
      <>

        {(buttonType === "Primário") ? (
          <PrimaryButton $width={width} onClick={onClick} disabled={isDisabled} $highlighted={highlighted} $maxHeight={maxHeight}>{content}</PrimaryButton>
        ) : (
          <SecondaryButton $width={width} onClick={onClick} disabled={isDisabled} $highlighted={highlighted} $maxHeight={maxHeight}>{content}</SecondaryButton>
        )}
        
      </>
    )
  };

  export default PrimarySecondaryButton;