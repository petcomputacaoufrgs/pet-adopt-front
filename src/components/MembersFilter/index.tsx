// components/MembersFilter/index.tsx
import React, { useState, useEffect } from "react";
import { useSearchParams, useSubmit, useNavigation } from "react-router-dom";

import BasicInput from "../BasicInput";
import { ButtonsContainer, Container, ContainerTitle, FilterContainer } from "./styles";
import ActionText from "../ActionText";
import PrimarySecondaryButton from "../PrimarySecondaryButton";

export default function MembersFilter({ hasBorder = true }: { hasBorder?: boolean }) {
  const [searchParams] = useSearchParams();
  const submit = useSubmit();
  const navigation = useNavigation();

  // Estado local apenas para o input controlado (UX de digitação)
  const [name, setName] = useState(searchParams.get("name") || "");
  
  const isSearching = navigation.state === "loading" && 
                      navigation.location.search.includes("name");

  // Sincroniza URL -> State (caso usuário dê refresh ou volte a página)
  useEffect(() => {
    setName(searchParams.get("name") || "");
  }, [searchParams]);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSearch = () => {
    // Monta os filtros
    const formData = {
      name: name.trim(),
      page: "1"
    };

    // Remove chaves vazias
    const cleanData = Object.fromEntries(
      Object.entries(formData).filter(([_, v]) => v !== "")
    );

    // Dispara a atualização da URL (Loader vai rodar)
    submit(cleanData, { method: "get" });
  };

  const handleClearFilters = () => {
    setName(""); // Limpa visual
    submit({}, { method: "get" }); // Limpa URL
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
        <PrimarySecondaryButton 
          width="100%" 
          content={isSearching ? "Buscando..." : "Buscar"} 
          height="50px" 
          onClick={handleSearch}
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