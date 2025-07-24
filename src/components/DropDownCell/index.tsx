import React from "react";

import { DropDownContainer } from "./styles";
import { IDropDown } from "./types";

const DropDownCell = ({
  options,
  onSelect,
  width,
  fontSize,
  highlight = -1,
  numCellsShowed,
}: IDropDown) => {
  const NUM_OPTIONS_SHOWED = numCellsShowed < 0 ? 5 : numCellsShowed;

  // Click handler function to select an option
  const handleClick = (index: number) => () => {
    onSelect(options[index]);
  };

  return (
    <DropDownContainer
      $width={width}
      $fontSize={fontSize}
    >
      {options.slice(0, NUM_OPTIONS_SHOWED).map((option, index) => (
        <div key={option + index}>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: highlight === index ? "#E67E22" : undefined,
            }}
            onClick={handleClick(index)}
          >
            {option}
          </button>
          {index < options.length - 1 && <hr />}
        </div>
      ))}
    </DropDownContainer>
  );
};

export default DropDownCell;