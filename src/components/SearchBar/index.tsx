// SearchBar/index.tsx
import { useEffect, useRef, useState } from 'react';

import { Container, ToggleButton, DropDownWrapper } from './styles';
import { ISearchBar } from './types';

import DropDownCell from '../DropDownCell';
import BasicInput from '../BasicInput';

import { ChevronDown, ChevronUp } from 'lucide-react';

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
  readOnly = false,
  resetOption,
  numOptionsShowed = 5,
}: ISearchBar) {
  // Estado para opções filtradas a partir do valor do input
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  // Estado para controlar a visibilidade das opções
  const [showOptions, setShowOptions] = useState(false);
  // Estado para qual opção está destacada pela navegação do teclado
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  // Tamanho do ícone da seta, 6px maior que a fonte base
  const arrowSize = parseFloat(fontSize) + 20;

  // Referência para o container principal para detecção de clique fora
  const containerRef = useRef<HTMLDivElement>(null);

  // Função utilitária para filtrar opções que começam com o valor atual do input, mas que não sejam idênticas ao input
  const filterOptions = (value: string) =>
    options.filter((opt: string) => opt.toLowerCase().startsWith(value.toLowerCase()) && opt !== value);

  // Manipulador para eventos de teclado (setas para cima/baixo e Enter)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!filteredOptions.length) return;

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const change = e.key === 'ArrowDown' ? 1 : -1;
      setHighlightedIndex(prev => {
        // O índice destacado cicla entre as opções visíveis
        const newIndex = (prev + change + Math.min(filteredOptions.length, numOptionsShowed)) %
          Math.min(filteredOptions.length, numOptionsShowed);
        return newIndex;
      });
    }

    if (e.key === 'Enter' && highlightedIndex >= 0) {
      // Enter seleciona a opção destacada
      selectOption(filteredOptions[highlightedIndex]);
    }
  };

  // Manipulador para mudança no input (digitação do usuário)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    const matches = filterOptions(value);
    setFilteredOptions(matches);
    setShowOptions(true);
    setHighlightedIndex(-1);
  };

  // Seleção de uma opção, seja por clique ou por teclado
  const selectOption = (value: string) => {
    setQuery(value);
  };

  // Manipulador para clique em uma opção da lista
  const handleOptionClick = (value: string) => {
    let newValue = value;

    if (resetOption && value === resetOption) {
      newValue = '';
    }

    setQuery(newValue);
    setShowOptions(false);

    // Se for readOnly, não precisa filtrar as opções novamente no click
    if (readOnly) return;

    setFilteredOptions(
      options.filter((opt: string) => opt.toLowerCase().startsWith(value.toLowerCase()))
    );

    setHighlightedIndex(-1);
  };

  // Alterna a visibilidade das opções ao clicar na seta
  const toggleOptions = () => {
    if (!showOptions && !query) {
      // Se o input estiver vazio e as opções não estiverem visíveis, mostra todas
      setFilteredOptions(options);
    }
    setShowOptions(prev => !prev);
    setHighlightedIndex(-1);
  };

  // Manipulador de clique no input quando ele está vazio ou em modo readOnly
  const handleClickOnEmptyInput = () => {
    if (query === '' || readOnly) {
      setShowOptions(!showOptions);
      setFilteredOptions(options); // Garante que todas as opções são mostradas
    }
  };

  // Hook para detectar cliques fora do componente e esconder as opções
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

  return (
    <Container ref={containerRef} width={width}> {/* Usando a prop width aqui */}
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
      >
        <ToggleButton type="button" onClick={toggleOptions}>
          {showOptions ? (
            <ChevronDown size={arrowSize} color="#A39289" />
          ) : (
            <ChevronUp size={arrowSize} color="#A39289" />
          )}
        </ToggleButton>
      </BasicInput>

      {showOptions && filteredOptions.length > 0 && (
        <DropDownWrapper width={width}> 
          <DropDownCell
            highlight={highlightedIndex}
            options={filteredOptions}
            onSelect={handleOptionClick}
            width={'100%'} 
            fontSize={fontSize}
            numCellsShowed={numOptionsShowed}
          />
        </DropDownWrapper>
      )}
    </Container>
  );
}