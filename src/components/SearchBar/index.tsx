import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { Container, ToggleButton, DropDownWrapper } from './styles';
import { ISearchBar } from './types'; // Lembre de adicionar disabled e maxHeight na interface
import DropDownCell from '../DropDownCell';
import BasicInput from '../BasicInput';

// Adicione na sua interface ISearchBar:
// disabled?: boolean;
// listMaxHeight?: string; (ex: "200px")

export default function SearchBar({
  options,
  width,
  fontSize,
  titleFontSize = fontSize,
  placeholder,
  title,
  required,
  query,
  setQuery,
  inputType = 'Primário',
  error = false,
  errorMessage,
  readOnly = false, // readOnly = Modo Seleção (abre dropdown, não digita)
  disabled = false, // disabled = Modo Travado (não abre nada)
  resetOption,
  numOptionsShowed = 5,
  verticalPadding = '8px',
  gapFromTitle = '8px',
  listMaxHeight, // Nova prop para controlar o scroll
}: ISearchBar) {
  
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const arrowSize = parseFloat(fontSize) + 10;
  const containerRef = useRef<HTMLDivElement>(null);
  const hasReset = !!resetOption;


  // O número de células a serem mostradas: se tiver um listMaxHeight, quer dizer que será colocado um scroll, então mostramos todas as opções filtradas
  // senão, mostramos até numOptionsShowed
  const numCellsShowed = listMaxHeight ? filteredOptions.length + (hasReset ? 1 : 0) : Math.min(filteredOptions.length + (hasReset ? 1 : 0), numOptionsShowed); 

  const filterOptions = (value: string) =>
    options.filter((opt: string) => 
      opt.toLowerCase().startsWith(value.toLowerCase()) && opt !== value
    );

  // LÓGICA DE TECLADO
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {


    if (disabled) return; // Se estiver desabilitado, ignora teclado

    const totalItems = filteredOptions.length + (hasReset ? 1 : 0);
    if (totalItems === 0) return;

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const change = e.key === 'ArrowDown' ? 1 : -1;
      setHighlightedIndex(prev => {
        if (prev === -1) return change > 0 ? 0 : totalItems - 1;
        const newIndex = (prev + change + totalItems) % totalItems;
        return newIndex;
      });
    }

    if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      if (hasReset && highlightedIndex === 0) {
        handleOptionClick(resetOption!);
      } else {
        const arrayIndex = hasReset ? highlightedIndex - 1 : highlightedIndex;
        if (filteredOptions[arrayIndex]) {
          selectOption(filteredOptions[arrayIndex]);
        }
      }
      setShowOptions(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Se for readOnly ou disabled, não permite digitar
    if (readOnly || disabled) return;

    const value = e.target.value;
    setQuery(value);
    const matches = filterOptions(value);
    setFilteredOptions(matches);
    setShowOptions(true);
    setHighlightedIndex(-1);
  };

  const selectOption = (value: string) => {
    setQuery(value);
  };

  const handleOptionClick = (value: string) => {
    let newValue = value;
    if (resetOption && value === resetOption) {
      newValue = '';
    }
    setQuery(newValue);
    setShowOptions(false);

    // Se for readOnly (Modo Seleção), não filtramos, mantemos tudo
    if (readOnly) return;

    setFilteredOptions(
      options.filter((opt: string) => opt.toLowerCase().startsWith(newValue.toLowerCase()))
    );
    setHighlightedIndex(-1);
  };

  const toggleOptions = () => {
    if (disabled) return; // Não abre se estiver disabled

    if (!showOptions && !query) {
      setFilteredOptions(options);
    }
    // Se for readOnly, sempre mostra todas as opções ao abrir
    if (readOnly && !showOptions) {
      setFilteredOptions(options);
    }

    setShowOptions(prev => !prev);
    setHighlightedIndex(-1);
  };

  const handleClickOnEmptyInput = () => {
    if (disabled) return;

    // Se for readOnly, o clique no input funciona como o toggle
    if (query === '' || readOnly) {
      if (!showOptions) {
         setFilteredOptions(options);
      }
      setShowOptions(!showOptions);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowOptions(false);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);


  }, []);

  const shouldShowDropdown = !disabled && showOptions && (filteredOptions.length > 0 || hasReset);

  return (
    <Container ref={containerRef} width={width}>
      <BasicInput
        $readOnly={readOnly}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        error={error}
        errorMessage={errorMessage}
        title={title}
        required={required}
        $inputType={inputType}
        $width={'100%'}
        $fontSize={fontSize}
        $titleFontSize={titleFontSize}
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        onClick={handleClickOnEmptyInput}
        $paddingRight={'3.5em'}
        $paddingVertical={verticalPadding}
        $gapFromTitle={gapFromTitle}
      >
        {/* Só mostramos a seta se NÃO estiver disabled */}
        {!disabled && (
          <ToggleButton type="button" onClick={toggleOptions} disabled={disabled}>
            {showOptions ? (
              <ChevronDown size={arrowSize} color="#A39289" />
            ) : (
              <ChevronUp size={arrowSize} color="#A39289" />
            )}
          </ToggleButton>
        )}
      </BasicInput>

      {shouldShowDropdown && (
        <DropDownWrapper width={"100%"} $maxHeight={listMaxHeight}>
          {filteredOptions.length > 0 && (
            <DropDownCell
              highlight={highlightedIndex}
              options={hasReset ? [resetOption, ...filteredOptions] : filteredOptions}
              onSelect={handleOptionClick}
              width={'100%'}
              fontSize={fontSize}
              numCellsShowed={numCellsShowed}
            />
          )}
        </DropDownWrapper>
      )}
    </Container>
  );
}