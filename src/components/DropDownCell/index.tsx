import { DropDownContainer } from "./styles";

interface IDropDown {
  options: string[];
  onSelect: (selected: string) => void;
  width: string;
  fontSize: string;
  highlight?: number;
  numCellsShowed: number;
}

const DropDownCell = ({
  options,
  onSelect,
  width,
  fontSize,
  highlight = -1,
  numCellsShowed,
}: IDropDown) => {
  const OPTION_VERTICAL_PADDING = 8;
  const SEPARATOR_HEIGHT = 1;
  const NUM_OPTIONS_SHOWED = numCellsShowed < 0 ? 5 : numCellsShowed;

  const optionHeight = parseFloat(fontSize) + 2 * OPTION_VERTICAL_PADDING;
  const maxHeight = optionHeight * NUM_OPTIONS_SHOWED + (NUM_OPTIONS_SHOWED - SEPARATOR_HEIGHT);

  // Função de clique para selecionar a opção
  const handleClick = (index: number) => () => {
    onSelect(options[index]);
  };

  return (
    <DropDownContainer
      $optionHeight={`${optionHeight}px`}
      $width={width}
      $maxHeight={`${maxHeight}px`}
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
