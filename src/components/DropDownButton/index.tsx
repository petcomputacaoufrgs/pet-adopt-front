import React, { useEffect, useRef, useState } from "react";
import DropDownCell from "../DropDownCell";
import { PrimaryButton } from "../PrimarySecondaryButton/styles";
import PrimarySecondaryButton from "../PrimarySecondaryButton";

import { IDropdownButtonProps } from "./types";


const DropdownButton = ({
  label, // Texto no botão
  options, // Lista de strings indicando as opções possíveis
  onClick, 
  indicator, // Indicador de que o dropDown está abaixado ou não. É uma função que recebe um valor booleano e retorna um nodo React. O valor booleano é o estado que indica se o DropDown está abaixado, e o nodo retornado é colocado ao lado da label no botão
  showOptionsOnHover = false, // Se for false (padrão), o DropDown será mostrado com clique no botão. Se for true, ele será mostrado com hover
  buttonWidth = "150px", // Tamanho do botão
  dropDownWidth = "200px",  // Tamanho do DropDown
  fontSize = "16px", // Tamanho da fonte no botão e no DropDown
  buttonType = "Primário" // Tipo do botão (Primário = "Primário", Secundário = qualquer outra string)
}: IDropdownButtonProps) => { 


  
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = !showOptionsOnHover? () => setShowDropdown(!showDropdown) : () => {};

  // Funções para hover
  const handleMouseEnter = showOptionsOnHover? () => setShowDropdown(true) : () => {};
  const handleMouseLeave = showOptionsOnHover? () => setShowDropdown(false) : () => {};

  const handleClick = (value : string) => {
    onClick(value);
    setShowDropdown(false);
  }

  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) 
        setShowDropdown(false);
    }
  
    if(!showOptionsOnHover)
      document.addEventListener("mousedown", handleClickOutside);
    return () => {
      if(!showOptionsOnHover)
        document.removeEventListener("mousedown", handleClickOutside);
    };
  });


  const content = (
    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
      {label}
      {indicator ? indicator(showDropdown) : null}
    </span>
  );

  return (
    <div ref={containerRef} style={{marginLeft: "100px", position: "relative", width: buttonWidth}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <PrimarySecondaryButton  width={buttonWidth} onClick={toggleDropdown} highlighted={showDropdown} isDisabled={false} content={content} buttonType={buttonType} />

      {showDropdown && (
        <div style={{ position: "absolute", top: "100%", paddingTop:"10px", left:"50%", transform: "translateX(-50%)", zIndex: 10 }}>
          <DropDownCell
            options={options}
            onSelect={handleClick}
            width={dropDownWidth}
            fontSize={fontSize}
            numCellsShowed={options.length}
          />
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
