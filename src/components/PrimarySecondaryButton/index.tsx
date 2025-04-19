import { PrimaryButton, SecondaryButton } from "./styles";

import {IButton} from "./types"

const PrimarySecondaryButton = ({ width, buttonType = "Primário", isDisabled = false, highlighted = false, content, onClick}: IButton) => {
    return ( 
      <>

        {(buttonType === "Primário") ? (
          <PrimaryButton width={width} onClick={onClick} disabled={isDisabled} highlighted={highlighted}>{content}</PrimaryButton>
        ) : (
          <SecondaryButton width={width} onClick={onClick} disabled={isDisabled} highlighted={highlighted}>{content}</SecondaryButton>
        )}
        
      </>
    )
  };

  export default PrimarySecondaryButton;