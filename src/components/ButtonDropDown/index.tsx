import React, { useState } from "react";
import DropDownCell from "../DropDownCell";
import { PrimaryButton } from "../PrimarySecondaryButton/styles";
import PrimarySecondaryButton from "../PrimarySecondaryButton";

interface IDropdownButtonProps {
  label: string;
  options: string[];
  onClick: any;
  buttonWidth?: string;
  dropDownWidth?: string;
  fontSize?: string;
  buttonType?: string;
}

const DropdownButton = ({
  label,
  options,
  onClick,
  buttonWidth = "150px",
  dropDownWidth = "200px",
  fontSize = "16px",
  buttonType = "Primário"
}: IDropdownButtonProps) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);


  return (
    <div style={{marginLeft: "100px", position: "relative", width: buttonWidth}}>
      <PrimarySecondaryButton width={buttonWidth} onClick={toggleDropdown} highlighted={showDropdown} isDisabled={false} content={label} buttonType={buttonType} />

      {showDropdown && (
        <div style={{ position: "absolute", top: "120%", left:"50%", transform: "translateX(-50%)", zIndex: 10 }}>
          <DropDownCell
            options={options}
            onClick={Array.isArray(onClick)
              ? onClick.map(funct => () => {
                  funct();
                  setShowDropdown(false);
                })
              : () => {
                  (onClick as () => void)();
                  setShowDropdown(false);
                }}
            width={dropDownWidth}
            fontSize={fontSize}
          />
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
