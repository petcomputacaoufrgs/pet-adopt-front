import { useEffect, useRef, useState } from 'react';
import DropDownCell from '../DropDownCell';
import { ChevronDown, ChevronUp } from 'lucide-react';
import BasicInput from '../BasicInput';


interface ISeaarchBar{
    options : string[]; // Opções que aparecerão no DropDown
    width: string; // Comprimento tanto do input quanto do DropDown
    fontSize: string; // Tamanho da fonte tanto no input quanto nas opções do DropDown
    titleFontSize?: string; // Tamanho da fonte do título do input. Se não for definido, o padrão é o mesmo que o tamanho da fonte do input
    placeholder: string; // Placeholder do input
    title: string; // Título que vai antes do input
    required: boolean; // Se o input é obrigatório. Se for, coloca um asterisco "*" no título
    query: string;
    setQuery: (query: string) => void;
    inputType?: string; // Tipo do input. Atualmete são dois: "Primário", com fundo mais laranja, e qualquer outra string indica o tipo secundário, com fundo branco
    error?: boolean; // eventualmente vamos ter que ver como será feita a validação deste erro. Por enquanto o erro tá só sendo propagado entre componentes e está estático.
    errorMessage?: string;
    readOnly?: boolean; // Se o input é apenas para leitura. Se for true, o usuário não pode digitar nada dele
    resetOption?: string; // Se definida, o usuário pode clicar na opção com o valor passado para limpar o input
    numOptionsShowed?: number; // Quantas opções devem ser mostradas no DropDown. Se não for definido, o padrão é 5
}

export default function SearchBar({ options, width, fontSize, titleFontSize=fontSize, placeholder, title, required, query, setQuery, inputType="Primário", error = false, errorMessage, readOnly = false, resetOption, numOptionsShowed = 5 } : ISeaarchBar) {
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]); // opções filtradas a partir do valor do input: todas as opções que começam com o valor atual do input
  const [showOptions, setShowOptions] = useState<boolean>(false); // se deve mostrar as opções ou não
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1); // Qual das opções está selecionada no momento (seleção usando as setas do teclado). -1 indica que nenhuma está


  const arrowSize = parseFloat(fontSize) + 6; // Tamahno da flechinha que aponta pra cima quando as opções estão aparecendo e pra baixo quando não estão. É sempre 6px maior que a fonte


  // Seleção de opções a partir do teclado (setas pra cima e pra baixo e enter)
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex < Math.min(filteredOptions.length - 1, numOptionsShowed - 1) ? prevIndex + 1 : 0
      );
    }
  
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : Math.min(filteredOptions.length - 1, numOptionsShowed - 1)
      );
    }
  
    if (event.key === 'Enter' && highlightedIndex >= 0) {
      let selected = filteredOptions[highlightedIndex];

      if (resetOption && selected === resetOption)
        selected = '';

      setQuery(selected);
      setShowOptions(false);
      setFilteredOptions(options.filter((opt) =>
        opt.toLowerCase().startsWith(selected.toLowerCase())))
      setHighlightedIndex(-1);
    }
  };


  // Mudança no input (digitando)
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    const matches = options.filter((opt) =>
      opt.toLowerCase().startsWith(value.toLowerCase()) && opt != value
    );

    setHighlightedIndex(-1);
    setFilteredOptions(matches);
    setShowOptions(true);
  };


  // Eventos ligados a clique do mouse

  // Clique numa opção
  const handleOptionClick = (value : string) => {
    let newValue = value;

    if(resetOption && value === resetOption)
      newValue = '';

    setQuery(newValue);
    setShowOptions(false);

    if (readOnly) return;
    

    setFilteredOptions(options.filter((opt) =>
      opt.toLowerCase().startsWith(value.toLowerCase())))

    setHighlightedIndex(-1);
  };

  // Clique na setinha para mostrar/esconder opções
  const toggleOptions = () => {
    if(!showOptions && query == '')
      setFilteredOptions(options);

    setHighlightedIndex(-1);
    setShowOptions(!showOptions);
  };

  // Clique no input vazio (deve mostrar as opções se não estiverem aparecendo, ou esconder se estiverem. Considera o caso readOnly como se o input estivesse sempre vazio)
  const handleClickOnEmptyInput = () => {
    if (query == '' || readOnly) {
      setShowOptions(!showOptions);
      setFilteredOptions(options);
    }
  }

  // Clique em qualquer lugar fora do container (deve esconder as opções)
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowOptions(false);
        setHighlightedIndex(-1);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });



  return (

<div ref={containerRef} style={{width:width}}>

      <BasicInput $readOnly={readOnly} onKeyDown={handleKeyDown} error={error} errorMessage={errorMessage} title={title} required={required} $inputType={inputType} $width={"100%"} $fontSize={fontSize} $titleFontSize={titleFontSize} placeholder={placeholder} value={query} onChange={handleChange} onClick={handleClickOnEmptyInput} $paddingRight='56px'>

      <button
          onClick={toggleOptions}
          style={{
            position: 'absolute',
            right: '0px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: '#553525',
            paddingTop: "8px",
            paddingBottom: "8px",
            paddingRight: "24px",
            paddingLeft: "12px",
            display: "flex",
            alignContent: "center",
            alignItems: "center"

          }}
        >
          {showOptions ? <ChevronDown size={arrowSize} color='#A39289' />  : <ChevronUp size={arrowSize} color='#A39289'/>}
        </button>
      
      </BasicInput>

      <div style={{position: "relative", width: "100%"}}>

      {showOptions && filteredOptions.length > 0 && (
        <div style={{ position: "absolute", top: "10px", left:"50%", transform: "translateX(-50%)", zIndex: 10, width: "100%" }}>
          <DropDownCell
            highlight={highlightedIndex}
            options={filteredOptions}
            onSelect={handleOptionClick}
            width={"100%"}
            fontSize={fontSize}
            numCellsShowed={numOptionsShowed}
          />
        </div>
      )}

    </div>

    </div>
  );
}

