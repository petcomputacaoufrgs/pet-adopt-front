import React, { useEffect, useRef, useState } from "react";

import { Container, ContentWrapper, DropdownWrapper } from "./styles";
import { IDropdownButtonProps } from "./types";

import DropDownCell from "../DropDownCell";
import PrimarySecondaryButton from "../PrimarySecondaryButton";

const DropdownButton = ({
  content,
  options,
  onClick,
  indicator,
  showOptionsOnHover = false,
  buttonWidth = "auto",
  dropDownWidth = "200px",
  fontSize = "16px",
  buttonType = "Primário",
  paddingH = "10px",
  paddingV = "10px", 

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
      $buttonWidth={buttonWidth}
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
        paddingH={paddingH}
        paddingV={paddingV}
        fontSize={fontSize}
      />
      {showDropdown && (
        <DropdownWrapper $dropDownWidth={dropDownWidth}>
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