import React, { useState } from "react";
import SelectorButton from "../SelectorButton";
import { Container } from "./styles";

interface Option {
  label: string;
  value: string;
  backgroundImage: string;
  overlayImage?: string;
  backgroundColor: string;
}

interface SelectorRadioGroupProps {
  options: Option[];
  width: string;
  height: string;
  overlayImageWidth?: string;
  overlayImageHeight?: string;
  overlayImageTop?: string;
  overlayImageLeft?: string;
}

function SelectorRadioGroup({
  options,
  width,
  height,
  overlayImageWidth = "0px",
  overlayImageHeight = "0px",
  overlayImageTop = "0px",
  overlayImageLeft = "0px",
}: SelectorRadioGroupProps) {
  const [clickedValue, setClickedValue] = useState<number>(-1);
  const [selectedValues, setSelectedValues] = useState<boolean[]>(options.map(() => true));

  const handleSelect = (index: number) => {
    if (selectedValues.reduce((acc, value) => value && acc, true) || !selectedValues[index]) {
      setClickedValue(index);
      setSelectedValues(selectedValues.map((_, i) => i === index));
    } else {
      setClickedValue(-1);
      setSelectedValues(selectedValues.map(() => true));
    }
  };

  return (
    <Container>
      {options.map((option, index) => (
        <SelectorButton
          key={option.value}
          label={option.label}
          active={selectedValues[index]}
          clicked={clickedValue === index}
          setActive={() => handleSelect(index)}
          width={width}
          height={height}
          backgroundImage={option.backgroundImage}
          backgroundColor={option.backgroundColor}
          overlayImage={option.overlayImage}
          overlayImageHeight={overlayImageHeight}
          overlayImageWidth={overlayImageWidth}
          overlayImageLeft={overlayImageLeft}
          overlayImageTop={overlayImageTop}
        />
      ))}
    </Container>
  );
}

export default SelectorRadioGroup;
