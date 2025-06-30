import React, { useState } from "react";
import SelectorButton from "../SelectorButton";

interface Option {
  label: string;
  value: string;
  backgroundImage: string;
  overlayImage?: string;
  backgroundColor: string;
}

interface SelectorRadioGroupProps {
  options: Option[];
  selectedValue: number;
  setSelectedValue: (selectedValues: number) => void;
  width: string;
  height: string;
  overlayImageWidth?: string;
  overlayImageHeight?: string;
  overlayImageTop?: string;
  overlayImageLeft?: string;
  
}

export default function SelectorRadioGroup({
  options,
  selectedValue,
  setSelectedValue,
  width,
  height,
  overlayImageWidth = "0px",
  overlayImageHeight = "0px",
  overlayImageTop = "0px",
  overlayImageLeft = "0px",
}: SelectorRadioGroupProps) {

  const handleSelect = (index: number) => {
    if(selectedValue == -1 || selectedValue !== index){
        setSelectedValue(index);
    }
    
    else{
        setSelectedValue(-1);

    }
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {options.map((option, index) => (
        <SelectorButton
          key={option.value}
          label={option.label}
          active={selectedValue === -1 || selectedValue === index}
          clicked={selectedValue === index}
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
    </div>
  );
}
