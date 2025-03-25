import {IButton} from "./types"
import { PrimaryButton, SecondaryButton } from "./styles";

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