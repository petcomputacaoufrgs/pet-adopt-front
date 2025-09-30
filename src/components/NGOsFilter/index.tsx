import BasicInput from "../BasicInput";
import SearchBar from "../SearchBar";

import { ButtonsContainer, Container, ContainerTitle, FilterContainer } from "./styles";
import { INGOsFilter } from "./types";

import ActionText from "../ActionText";
import PrimarySecondaryButton from "../PrimarySecondaryButton";

export default function NGOsFilter({
  ngos,
  selectedState,
  setSelectedState,
  city,
  setCity,
  name,
  setName,
  hasBorder = true,
  onSearch,
  onClearFilters
}: INGOsFilter) {
  const states = {
    options: [
      "Qualquer",
      "Rio Grande do Sul",
      "Santa Catarina",
      "Paraná"
    ],
    resetOption: "Qualquer"
  };

  const onChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    const filters = {
      name: name.trim(),
      city: city.trim(),
      state: selectedState
    };
    
    console.log('🔍 Aplicando filtros:', filters);
    onSearch?.(filters);
  };

  const handleClearFilters = () => {
    setSelectedState("");
    setCity("");
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
        <SearchBar
          query={name}
          setQuery={setName}
          options={ngos}
          resetOption="Todas"
          width={inputsWidth}
          fontSize={inputFontSize}
          titleFontSize={titleFontSize}
          placeholder="Insira o nome aqui"
          title="Nome"
          required={false}
          inputType="Secundário"
          numOptionsShowed={4}
        />

        <SearchBar
          query={selectedState}
          setQuery={setSelectedState}
          options={states.options}
          resetOption={states.resetOption}
          width={inputsWidth}
          fontSize={inputFontSize}
          titleFontSize={titleFontSize}
          placeholder="Selecione o estado"
          title="Estado"
          required={false}
          readOnly={false}
          inputType="Secundário"
        />

        <BasicInput
          value={city}
          onChange={onChangeCity}
          $width={inputsWidth}
          $fontSize={inputFontSize}
          $titleFontSize={titleFontSize}
          placeholder="Insira a cidade aqui"
          title="Cidade"
          required={false}
          $inputType="Secundário"
        />
      </FilterContainer>

      <ButtonsContainer $width={inputsWidth}>
        <PrimarySecondaryButton 
          width="100%" 
          content="Buscar" 
          onClick={handleSearch}
        />
        <ActionText 
          width="100%" 
          fontSize="1.125em" 
          onClick={handleClearFilters} 
          textColor="#553525" 
          underlineOnHover
        >
          Limpar Filtros
        </ActionText>
      </ButtonsContainer>
    </Container>
  );
}