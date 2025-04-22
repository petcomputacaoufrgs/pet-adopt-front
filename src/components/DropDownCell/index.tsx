import styled from "styled-components";
import {DropDownContainer} from "./styles"
import { useEffect, useRef, useState } from "react";

interface IDropDown{
    options : string[];
    onSelect: (selected: string) => void;
    width: string;
    fontSize: string;
    highlight?: number;
    numCellsShowed: number;
}


const DropDownCell = ({ options, onSelect, width, fontSize, highlight = -1, numCellsShowed}: IDropDown) => {
    const OPTION_VERTICAL_PADDING = 8;
    const SEPARATOR_HEIGHT = 1;
    const NUM_OPTIONS_SHOWED = (numCellsShowed < 0)? 5 : numCellsShowed;

    const optionHeight = parseFloat(fontSize) + 2 * OPTION_VERTICAL_PADDING;
    const maxHeight = optionHeight * NUM_OPTIONS_SHOWED + (NUM_OPTIONS_SHOWED - SEPARATOR_HEIGHT);



  /* Constrói a função de clique de cada botão com base no parâmetro onClick
     Não é a forma mais eficiente, já que se onClick for um array, para cada elemento do array vai refazer esses testes:
     seria mais otimizado o condicional escolher qual operação de map será feita (reotornando os botões com onClick ou onClick[index])
     Mas é a forma mais agradável aos olhos
  */
    const handleClick = (index: number) => {
      return () => {
        onSelect(options[index]);
      };
    };



  return (
    <DropDownContainer  $optionHeight={`${optionHeight}px`} $width={width} $maxHeight={`${maxHeight}px`} $fontSize={fontSize}>
      {options.slice(0, NUM_OPTIONS_SHOWED).map((option, index) => (
        <div key={option + index}>
          
          {(highlight == index)? 
            <button style={{display: "flex", alignItems: "center", backgroundColor: "#E67E22"}} onClick={handleClick(index)}>{option}</button> 
            : <button style={{display: "flex", alignItems: "center"}} onClick={handleClick(index)}>{option}</button> }
          
          {index < options.length - 1 && <hr />}
        </div>
      ))}
    </DropDownContainer>
  );

    
};

  export default DropDownCell;