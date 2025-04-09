import { PrimaryButton, SecondaryButton } from "./styles";

import {IButton} from "./types"

const PrimarySecondaryButton = ({ width, buttonType, isDisabled, content, onClick}: IButton) => {
    return ( 
      <>

        {(buttonType === "Primário") ? (
          <PrimaryButton width={width} onClick={onClick} disabled={isDisabled}>{content}</PrimaryButton>
        ) : (
          <SecondaryButton width={width} onClick={onClick} disabled={isDisabled}>{content}</SecondaryButton>
        )}
        
      </>
    )
  };

  export default PrimarySecondaryButton;