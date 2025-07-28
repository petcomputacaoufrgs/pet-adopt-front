import React, { useEffect, useRef, useState } from "react";

import {
  EditButtonContainer,
  OptionContentContainer,
  OptionsContainer,
  StyledEditButton,
  StyledOptionButton,
} from "./styles";

import { IEditButtonProps } from "./types";

import editIcon from "../../assets/SystemIcon.svg"; 

const EditButton = ({ options, width, height }: IEditButtonProps) => {
  const [showOptions, setShowOptions] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionsContainerRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showOptions &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        optionsContainerRef.current &&
        !optionsContainerRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);

  return (
    <EditButtonContainer $width={width} $height={height}>
      <StyledEditButton
        ref={buttonRef}
        $backgroundImage={editIcon}
        $width={width}
        $height={height}
        $clicked={showOptions}
        onClick={() => setShowOptions(!showOptions)}
      />

      {showOptions && (
        <OptionsContainer ref={optionsContainerRef}>
          {options.map((option, index) => (
            <StyledOptionButton key={index} onClick={option.onClick}>
              <OptionContentContainer>
                {option.iconSrc && <img src={option.iconSrc} alt={option.label} />}
                {option.label}
              </OptionContentContainer>
            </StyledOptionButton>
          ))}
        </OptionsContainer>
      )}
    </EditButtonContainer>
  );
};

export default EditButton;