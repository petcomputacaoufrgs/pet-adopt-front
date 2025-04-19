import styled from "styled-components";
import {DropDownContainer} from "./styles"

interface IDropDown{
    options : string[];
    onClick: any;
    width: string;
    fontSize: string;
}


const DropDownCell = ({ options, onClick, width, fontSize }: IDropDown) => {
    const isFunctArray = Array.isArray(onClick) 
    const isValidFunctArray = isFunctArray && onClick.length == options.length;

    const OPTION_VERTICAL_PADDING = 8;
    const NUM_OPTIONS_SHOWED = 4;
    const SEPARATOR_HEIGHT = 1;

    const optionHeight = parseFloat(fontSize) + 2 * OPTION_VERTICAL_PADDING;
    const maxHeight = optionHeight * NUM_OPTIONS_SHOWED + (NUM_OPTIONS_SHOWED - SEPARATOR_HEIGHT);

//    const maxHeight = `${(fontSize + 16) * 4 }px`;

  /* Constrói a função de clique de cada botão com base no parâmetro onClick
     Não é a forma mais eficiente, já que se onClick for um array, para cada elemento do array vai refazer esses testes:
     seria mais otimizado o condicional escolher qual operação de map será feita (reotornando os botões com onClick ou onClick[index])
     Mas é a forma mais agradável aos olhos
  */
    const handleClick = (index: number) => {
      // Se onClick não for um array de funções, mas uma função apenas, simplesmente retorna ela
      if (!isFunctArray) return onClick;

      // Se onClick for um array de funções e for do tamanho da quantidade de opções, faz um mapeamneto para as opções com base no index
      if (isValidFunctArray) return onClick[index];

      // Do contrário, temos um erro
      console.error("DropDownCell: número de funções no onClick não bate com número de opções.");
      return () => {};
    };


  return (
    <DropDownContainer optionHeight={`${optionHeight}px`} width={width} maxHeight={`${maxHeight}px`} fontSize={fontSize}>
      {options.map((option, index) => (
        <div key={option + index}>
          <button style={{display: "flex", alignItems: "center"}} onClick={handleClick(index)}>
            {option}
          </button>
          {index < options.length - 1 && <hr />}
        </div>
      ))}
    </DropDownContainer>
  );

    
};

  export default DropDownCell;