import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import DropDownCell from '../DropDownCell';
import BasicInput from '../BasicInput';
import { Container, ToggleButton, DropDownWrapper } from './styles';

interface ISearchBar {
  options: string[]; // Opções que aparecerão no DropDown
  width: string; // Comprimento tanto do input quanto do DropDown
  fontSize: string; // Tamanho da fonte tanto no input quanto nas opções do DropDown
  placeholder: string; // Placeholder do input
  title: string; // Título que vai antes do input
  required: boolean; // Se o input é obrigatório. Se for, coloca um asterisco "*" no título
  error?: boolean; // eventualmente vamos ter que ver como será feita a validação deste erro. Por enquanto o erro tá só sendo propagado entre componentes e está estático.
  errorMessage?: string;
}

function SearchBar({
  options,
  width,
  fontSize,
  placeholder,
  title,
  required,
  error = false,
  errorMessage
}: ISearchBar) {

  const [query, setQuery] = useState(''); // valor atual do input
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]); // opções filtradas a partir do valor do input: todas as opções que começam com o valor atual do input
  const [showOptions, setShowOptions] = useState(false); // se deve mostrar as opções ou não
  const [highlightedIndex, setHighlightedIndex] = useState(-1); // Qual das opções está selecionada no momento (seleção usando as setas do teclado). -1 indica que nenhuma está

  const arrowSize = parseFloat(fontSize) + 6; // Tamahno da flechinha que aponta pra cima quando as opções estão aparecendo e pra baixo quando não estão. É sempre 6px maior que a fonte
  const numOptionsShowed = 5;

  const containerRef = useRef<HTMLDivElement>(null); // Referência ao container para verificar clique fora dele

  // Função utilitária para filtrar opções que começam com o valor atual do input, mas que não sejam idênticas ao input
  const filterOptions = (value: string) =>
    options.filter(opt => opt.toLowerCase().startsWith(value.toLowerCase()) && opt !== value);

  // Seleção de opções a partir do teclado (setas pra cima e pra baixo e enter)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!filteredOptions.length) return;

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const change = e.key === 'ArrowDown' ? 1 : -1;
      setHighlightedIndex(prev => {
        // O índice destacado cicla entre as opções visíveis
        const newIndex = (prev + change + Math.min(filteredOptions.length, numOptionsShowed)) % Math.min(filteredOptions.length, numOptionsShowed);
        return newIndex;
      });
    }

    if (e.key === 'Enter' && highlightedIndex >= 0) {
      // Enter seleciona a opção destacada
      selectOption(filteredOptions[highlightedIndex]);
    }
  };

  // Mudança no input (digitando)
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

    setFilteredOptions(filterOptions(value));
    setShowOptions(false);
    setHighlightedIndex(-1);
  };

  // Clique na setinha para mostrar/esconder opções
  const toggleOptions = () => {
    if (!showOptions && !query) {
      // Se estiver vazio, mostrar todas as opções
      setFilteredOptions(options);
    }
    setShowOptions(prev => !prev);
    setHighlightedIndex(-1);
  };

  // Clique no input vazio (deve mostrar todas as opções)
  const handleClickOnEmptyInput = () => {
    if (!query) {
      setFilteredOptions(options);
      setShowOptions(true);
    }
  };

  // Clique em qualquer lugar fora do container (deve esconder as opções)
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
    <Container ref={containerRef} width={width}>
      <BasicInput
        onKeyDown={handleKeyDown}
        error={error}
        errorMessage={errorMessage}
        title={title}
        required={required}
        $width={width}
        $fontSize={fontSize}
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        onClick={handleClickOnEmptyInput}
        $paddingRight='56px' // espaço para a setinha
      >
        <ToggleButton onClick={toggleOptions}>
          {showOptions ? <ChevronDown size={arrowSize} color='#A39289' /> : <ChevronUp size={arrowSize} color='#A39289' />}
        </ToggleButton>
      </BasicInput>

      {showOptions && filteredOptions.length > 0 && (
        <DropDownWrapper width={width}>
          <DropDownCell
            highlight={highlightedIndex}
            options={filteredOptions}
            onSelect={selectOption}
            width={width}
            fontSize={fontSize}
            numCellsShowed={numOptionsShowed}
          />
        </DropDownWrapper>
      )}
    </Container>
  );
}

export default SearchBar;
