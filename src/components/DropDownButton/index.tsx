import React, { useEffect, useRef, useState } from "react";
import DropDownCell from "../DropDownCell";
import PrimarySecondaryButton from "../PrimarySecondaryButton";

import { IDropdownButtonProps } from "./types";
import { Container, DropdownWrapper, ContentWrapper } from "./styles";

const DropdownButton = ({
  content,
  options,
  onClick,
  indicator,
  showOptionsOnHover = false,
  buttonWidth = "150px",
  dropDownWidth = "200px",
  fontSize = "16px",
  buttonType = "Primário"
}: IDropdownButtonProps) => { 
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = !showOptionsOnHover ? () => setShowDropdown(!showDropdown) : () => {};

  const handleMouseEnter = showOptionsOnHover ? () => setShowDropdown(true) : () => {};
  const handleMouseLeave = showOptionsOnHover ? () => setShowDropdown(false) : () => {};

  const handleClick = (value: string) => {
    onClick(value);
    setShowDropdown(false);
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (!showOptionsOnHover) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      if (!showOptionsOnHover) {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, [showOptionsOnHover]);

  const styledContent = (
    <ContentWrapper>
      {content}
      {indicator ? indicator(showDropdown) : null}
    </ContentWrapper>
  );

  return (
    <Container
      ref={containerRef}
      buttonWidth={buttonWidth}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <PrimarySecondaryButton
        width={buttonWidth}
        onClick={toggleDropdown}
        highlighted={showDropdown}
        isDisabled={false}
        content={styledContent}
        buttonType={buttonType}
      />
      {showDropdown && (
        <DropdownWrapper dropDownWidth={dropDownWidth}>
          <DropDownCell
            options={options}
            onSelect={handleClick}
            width={dropDownWidth}
            fontSize={fontSize}
            numCellsShowed={options.length}
          />
        </DropdownWrapper>
      )}
    </Container>
  );
};

export default DropdownButton;