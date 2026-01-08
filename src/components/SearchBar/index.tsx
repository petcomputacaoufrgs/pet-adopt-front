import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { Container, ToggleButton, DropDownWrapper } from './styles';
import { ISearchBar } from './types';
import DropDownCell from '../DropDownCell';
import BasicInput from '../BasicInput';


export default function SearchBar({
  options, // Assumimos que 'options' agora contém APENAS dados, não o reset
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
  readOnly = false,
  resetOption,
  numOptionsShowed = 5,
  verticalPadding = '8px',
  gapFromTitle = '8px',
}: ISearchBar) {
  
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  
  // Controle de navegação
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const arrowSize = parseFloat(fontSize) + 10;
  const containerRef = useRef<HTMLDivElement>(null);

  // Verifica se temos a opção de reset ativa nessa instância
  const hasReset = !!resetOption;

  const filterOptions = (value: string) =>
    options.filter((opt: string) => 
      opt.toLowerCase().startsWith(value.toLowerCase()) && opt !== value
    );

  // --- LÓGICA DE TECLADO ---
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Calculamos o total de itens navegáveis (Reset + Opções Filtradas)
    const totalItems = filteredOptions.length + (hasReset ? 1 : 0);
    
    if (totalItems === 0) return;

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const change = e.key === 'ArrowDown' ? 1 : -1;

      setHighlightedIndex(prev => {
        // Se for a primeira vez que aperta, vai para 0
        if (prev === -1) return change > 0 ? 0 : totalItems - 1;
        
        const newIndex = (prev + change + totalItems) % totalItems;
        return newIndex;
      });
    }

    if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault(); // Evita submit de form se houver
      
      // Lógica para selecionar baseado no índice corrigido
      if (hasReset && highlightedIndex === 0) {
        handleOptionClick(resetOption!);
      } else {
        // Se tem reset, o índice 1 do teclado equivale ao índice 0 do array filtrado
        const arrayIndex = hasReset ? highlightedIndex - 1 : highlightedIndex;
        if (filteredOptions[arrayIndex]) {
          selectOption(filteredOptions[arrayIndex]);
        }
      }
      setShowOptions(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    if (readOnly) return;

    // Refazemos o filtro para a próxima vez
    setFilteredOptions(
      options.filter((opt: string) => opt.toLowerCase().startsWith(newValue.toLowerCase()))
    );

    setHighlightedIndex(-1);
  };

  const toggleOptions = () => {
    if (!showOptions && !query) {
      setFilteredOptions(options);
    }
    setShowOptions(prev => !prev);
    setHighlightedIndex(-1);
  };

  const handleClickOnEmptyInput = () => {
    if (query === '' || readOnly) {
      setShowOptions(!showOptions);
      setFilteredOptions(options);
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

  // Define se o dropdown deve aparecer (se tiver opções OU se tiver botão de reset)
  const shouldShowDropdown = showOptions && (filteredOptions.length > 0 || hasReset);

  return (
    <Container ref={containerRef} width={width}>
      <BasicInput
        $readOnly={readOnly}
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
        <ToggleButton type="button" onClick={toggleOptions}>
          {showOptions ? (
            <ChevronDown size={arrowSize} color="#A39289" />
          ) : (
            <ChevronUp size={arrowSize} color="#A39289" />
          )}
        </ToggleButton>
      </BasicInput>

      {shouldShowDropdown && (
        <DropDownWrapper width={"100%"}>
          
          {filteredOptions.length > 0 && (
            <DropDownCell
              highlight={hasReset ? highlightedIndex - 1 : highlightedIndex}
              options={hasReset ? [resetOption, ...filteredOptions] : filteredOptions}
              onSelect={handleOptionClick}
              width={'100%'}
              fontSize={fontSize}
              numCellsShowed={numOptionsShowed}
            />
          )}
        </DropDownWrapper>
      )}
    </Container>
  );
}