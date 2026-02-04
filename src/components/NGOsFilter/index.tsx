import React, { useState, useEffect } from "react";
import { useSearchParams, useSubmit, useNavigation } from "react-router-dom";

import BasicInput from "../BasicInput";
import SearchBar from "../SearchBar";
import PrimarySecondaryButton from "../PrimarySecondaryButton";
import ActionText from "../ActionText";

import { ButtonsContainer, Container, ContainerTitle, FilterContainer } from "./styles";

// Interface simplificada (apenas o que vem de dados externos ou estilo)
interface NGOsFilterProps {
  hasBorder?: boolean;
}

export default function NGOsFilter({
  hasBorder = true,
}: NGOsFilterProps) {
  
  // Hooks do React Router
  const [searchParams] = useSearchParams();
  const submit = useSubmit();
  const navigation = useNavigation();
  
  // Identifica se está ocorrendo uma busca (loading)
  const isSearching = navigation.state === "loading" && 
                      navigation.location.search !== "";

  // Estados Locais (Inicializados com valor da URL)
  const [name, setName] = useState(searchParams.get("name") || "");
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [selectedState, setSelectedState] = useState(searchParams.get("state") || "");

  // Sincronia URL -> State
  // Garante que se o usuário clicar em "Voltar" ou der F5, os inputs preenchem sozinhos
  useEffect(() => {
    setName(searchParams.get("name") || "");
    setCity(searchParams.get("city") || "");
    setSelectedState(searchParams.get("state") || "");
  }, [searchParams]);

  // Handlers
  const onChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    const filters = {
      name: name.trim(),
      city: city.trim(),
      // Se o estado for "Qualquer" (valor de reset), mandamos vazio ou undefined
      state: selectedState === "Qualquer" ? "" : selectedState,
      page: "1" // Sempre reseta a paginação ao filtrar
    };

    // Limpa chaves vazias
    const cleanData = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== "")
    );
    
    // Atualiza a URL e dispara o Loader
    submit(cleanData, { method: "get" });
  };

  const handleClearFilters = () => {
    // Limpeza visual imediata
    setSelectedState("");
    setCity("");
    setName("");
    
    // Limpeza da URL (dispara loader sem filtros)
    submit({}, { method: "get" });
  };

  // Constantes de layout
  const states = {
    options: ["AM", "AC", "AL", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO"],
    resetOption: "Qualquer"
  };

  const inputsWidth = "298px";
  const containerWidth = inputsWidth;
  const inputFontSize = "16px";
  const titleFontSize = "18px";

  return (
    <Container $width={containerWidth} $hasBorder={hasBorder}>
      <ContainerTitle>Filtros</ContainerTitle>

      <FilterContainer>
        <BasicInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          $width={inputsWidth}
          $fontSize={inputFontSize}
          $titleFontSize={titleFontSize}
          placeholder="Insira o nome aqui"
          title="Nome"
          required={false}
          $inputType="Secundário"
        />

        <SearchBar
          query={selectedState}
          setQuery={setSelectedState}
          options={states.options}
          resetOption={states.resetOption}
          width={"100%"}
          fontSize={inputFontSize}
          titleFontSize={titleFontSize}
          placeholder="Insira o estado aqui"
          title="Estado"
          required={false}
          readOnly={false}
          inputType="Secundário"
          verticalPadding="6px"
          gapFromTitle="4px"
          listMaxHeight="200px"
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
          content={isSearching ? "Buscando..." : "Buscar"} 
          onClick={handleSearch}
          paddingV="10px"
          isDisabled={isSearching}
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