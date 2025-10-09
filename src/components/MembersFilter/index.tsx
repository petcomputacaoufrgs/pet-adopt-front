import BasicInput from "../BasicInput";
import SearchBar from "../SearchBar";

import { ButtonsContainer, Container, ContainerTitle, FilterContainer } from "./styles";
import { IMembersFilter } from "./types";

import ActionText from "../ActionText";
import PrimarySecondaryButton from "../PrimarySecondaryButton";

/*Dá onde vem os nomes filtrados?*/

export default function MembersFilter({
  members,
  name,
  setName,
  hasBorder = true,
  onSearch,
  onClearFilters
}: IMembersFilter) {

  
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onCleanFilters = () => {
    setName("");
  };

  const handleSearch = () => {
    const filters = {
      name: name.trim(),

    };
    
    console.log('🔍 Aplicando filtros:', filters);
    onSearch?.(filters);
  };

  const handleClearFilters = () => {
    setName("");
    
    console.log('🧹 Limpando filtros');
    onClearFilters?.();
  };

  const inputsWidth = "298px";
  const containerWidth = inputsWidth;
  const inputFontSize = "1em"; // Converted from 16px
  const titleFontSize = "1.125em"; // Converted from 18px

  return (
    <Container $width={containerWidth} $hasBorder={hasBorder}>
      <ContainerTitle>Filtros</ContainerTitle>

      <FilterContainer>
        <BasicInput
          value={name}
          onChange={onChangeName}
          $width={inputsWidth}
          $fontSize={inputFontSize}
          $titleFontSize={titleFontSize}
          placeholder="Insira o nome aqui"
          title="Nome"
          required={false}
          $inputType="Secundário"
        />
      </FilterContainer>

      <ButtonsContainer $width={inputsWidth}>
        <PrimarySecondaryButton width="100%" content="Buscar" height="50px" onClick={handleSearch}/>
        <ActionText width="100%" fontSize="1.125em" onClick={onCleanFilters} textColor="#553525" underlineOnHover>
          Limpar Filtros
        </ActionText>
      </ButtonsContainer>
    </Container>
  );
}