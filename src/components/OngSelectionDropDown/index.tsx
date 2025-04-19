import { useState } from 'react';
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
}

export default function SearchBar({ options, width, fontSize, placeholder, title, required } : ISeaarchBar) {
  const [query, setQuery] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const arrowSize = parseFloat(fontSize) + 6;

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    const matches = options.filter((opt) =>
      opt.toLowerCase().startsWith(value.toLowerCase()) && opt != value
    );
    setFilteredOptions(matches);
    setShowOptions(true);
  };

  const handleOptionClick = (event : any) => {
    const value = event.target.innerText
    setQuery(value);           // preenche o input

    setFilteredOptions(options.filter((opt) =>
      opt.toLowerCase().startsWith(value.toLowerCase())))

    setShowOptions(false);
  };


  const toggleOptions = () => {
    if(!showOptions && query == '')
      setFilteredOptions(options);

    setShowOptions(!showOptions);
  };

  const handleClickOnEmptyInput = () => {
    if (query == '') {
      setFilteredOptions(options);
      setShowOptions(true);
    }
  }

  console.log(filteredOptions);

  return (

<>

      <BasicInput  title='Países' required={true} width={width} fontSize={fontSize} placeholder={placeholder} value={query} onChange={handleChange} onClick={handleClickOnEmptyInput} paddingRight='56px'>

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
            options={filteredOptions}
            onClick={handleOptionClick}
            width={width}
            fontSize={fontSize}
          />
        </div>
      )}

    </div>

    </>
  );
}

