import { PrimaryButton, SecondaryButton } from "./styles";

import {IButton} from "./types"

const PrimarySecondaryButton = ({ width, buttonType = "Primário", isDisabled = false, highlighted = false, content, onClick, height, $flex=false, paddingV, paddingH, fontSize}: IButton) => {
    return ( 
      <>

        {(buttonType === "Primário") ? (
          <PrimaryButton $width={width} onClick={onClick} disabled={isDisabled} $highlighted={highlighted} $height={height} $flex={$flex} $paddingV={paddingV} $paddingH={paddingH} $fontSize={fontSize}>{content}</PrimaryButton>
        ) : (
          <SecondaryButton $width={width} onClick={onClick} disabled={isDisabled} $highlighted={highlighted} $height={height} $flex={$flex} $paddingV={paddingV} $paddingH={paddingH} $fontSize={fontSize}>{content}</SecondaryButton>
        )}
        
      </>
    )
  };

  export default PrimarySecondaryButton;