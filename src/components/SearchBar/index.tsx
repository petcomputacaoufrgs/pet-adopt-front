import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import DropDownCell from '../DropDownCell';
import BasicInput from '../BasicInput';
import { Container, ToggleButton, DropDownWrapper } from './styles';


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
  const [showOptions, setShowOptions] = useState(false); // se deve mostrar as opções ou não
  const [highlightedIndex, setHighlightedIndex] = useState(-1); // Qual das opções está selecionada no momento (seleção usando as setas do teclado). -1 indica que nenhuma está

  const arrowSize = parseFloat(fontSize) + 6; // Tamahno da flechinha que aponta pra cima quando as opções estão aparecendo e pra baixo quando não estão. É sempre 6px maior que a fonte

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
  }

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
    if (!showOptions && !query) {
      // Se estiver vazio, mostrar todas as opções
      setFilteredOptions(options);
    }
    setShowOptions(prev => !prev);
    setHighlightedIndex(-1);
  };

  // Clique no input vazio (deve mostrar as opções se não estiverem aparecendo, ou esconder se estiverem. Considera o caso readOnly como se o input estivesse sempre vazio)
  const handleClickOnEmptyInput = () => {
    if (query == '' || readOnly) {
      setShowOptions(!showOptions);
      setFilteredOptions(options);
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
    <Container ref={containerRef} width={"100%"}>
      <BasicInput
        $readOnly={readOnly} 
        onKeyDown={handleKeyDown} 
        error={error} 
        errorMessage={errorMessage} 
        title={title} 
        required={required} 
        $inputType={inputType} 
        $width={"100%"} 
        $fontSize={fontSize} 
        $titleFontSize={titleFontSize} 
        placeholder={placeholder} 
        value={query} 
        onChange={handleChange} 
        onClick={handleClickOnEmptyInput} 
        $paddingRight='56px'
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
            onSelect={handleOptionClick}
            width={"100%"}
            fontSize={fontSize}
            numCellsShowed={numOptionsShowed}
          />
        </DropDownWrapper>
      )}
    </Container>
  );
}