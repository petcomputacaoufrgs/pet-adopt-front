import { useEffect, useRef, useState } from 'react';
import DropDownCell from '../DropDownCell';
import { ChevronDown, ChevronUp } from 'lucide-react';
import BasicInput from '../BasicInput';


interface ISeaarchBar{
    options : string[];
    width: string;
    fontSize: string;
    placeholder: string;
    title: string;
    required: boolean;
    error?: boolean; // eventualmente vamos ter que ver como será feita a validação deste erro. Por enquanto o erro tá só sendo propagado entre componentes e está estático.
    errorMessage?: string;
}

export default function SearchBar({ options, width, fontSize, placeholder, title, required, error = false, errorMessage } : ISeaarchBar) {
  const [query, setQuery] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const arrowSize = parseFloat(fontSize) + 6;
  const numOptionsShowed = 5;

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
      const selected = filteredOptions[highlightedIndex];
      setQuery(selected);
      setShowOptions(false);
      setFilteredOptions(options.filter((opt) =>
        opt.toLowerCase().startsWith(selected.toLowerCase())))
      setHighlightedIndex(-1);
    }
  };


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

  const handleOptionClick = (value : string) => {
    setQuery(value);           

    setFilteredOptions(options.filter((opt) =>
      opt.toLowerCase().startsWith(value.toLowerCase())))

    setHighlightedIndex(-1);
    setShowOptions(false);
  };


  const toggleOptions = () => {
    if(!showOptions && query == '')
      setFilteredOptions(options);

    setHighlightedIndex(-1);
    setShowOptions(!showOptions);
  };

  const handleClickOnEmptyInput = () => {
    if (query == '') {
      setFilteredOptions(options);
      setShowOptions(true);
    }
  }


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

      <BasicInput onKeyDown={handleKeyDown} error={error} errorMessage={errorMessage} title={title} required={required} $width={width} $fontSize={fontSize} placeholder={placeholder} value={query} onChange={handleChange} onClick={handleClickOnEmptyInput} $paddingRight='56px'>

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

      <div style={{position: "relative", width: width}}>

      {showOptions && filteredOptions.length > 0 && (
        <div style={{ position: "absolute", top: "10px", left:"50%", transform: "translateX(-50%)", zIndex: 10 }}>
          <DropDownCell
            highlight={highlightedIndex}
            options={filteredOptions}
            onSelect={handleOptionClick}
            width={width}
            fontSize={fontSize}
            numCellsShowed={numOptionsShowed}
          />
        </div>
      )}

    </div>

    </div>
  );
}

