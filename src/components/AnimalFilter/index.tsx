import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigation, useSubmit } from "react-router-dom"; // Importações novas

import {
  ButtonsContainer,
  Container,
  ContainerTitle,
  FilterContainer,
  InputTitle,
  SpecieRadioGroup,
} from "./styles";

import ActionText from "../ActionText";
import BasicInput from "../BasicInput";
import PrimarySecondaryButton from "../PrimarySecondaryButton";
import SelectorRadioGroup from "../SelectorButtonRadioGroup";
import SearchBar from "../SearchBar";

// Imagens
import birdImage from "../../assets/Bird.svg";
import birdEffectImage from "../../assets/birdEffects.svg";
import catImage from "../../assets/Cat.svg";
import catEffectImage from "../../assets/catEffects.svg";
import dogImage from "../../assets/dog.svg";
import dogEffectImage from "../../assets/dogEffects.svg";
import { mapBackendToAge, mapBackendToSex, mapBackendToSize, mapSpeciesStringToIndex } from "../../services/filters/petFilters";

export default function AnimalFilter({ hasBorder = true }) {
  const [searchParams] = useSearchParams();
  const submit = useSubmit(); // ✅ Hook mágico para disparar actions/loaders manualmente
  const navigation = useNavigation();
  
  const isSearching = navigation.state === "loading" && navigation.location.search !== "";

  // ESTADOS DO FILTRO (inicializados com valores da URL)
  const [name, setName] = useState(searchParams.get("name") || "");
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [breed, setBreed] = useState(searchParams.get("breed") || "");
  
  // Selects e Radio Groups
  const [selectedState, setSelectedState] = useState(searchParams.get("state") || "");
  const [selectedAge, setSelectedAge] = useState(mapBackendToAge(searchParams.get("age") || ""));
  const [selectedSize, setSelectedSize] = useState(mapBackendToSize(searchParams.get("size") || ""));
  const [selectedSex, setSelectedSex] = useState(mapBackendToSex(searchParams.get("sex") || ""));
  const [selectedSituation, setSelectedSituation] = useState(searchParams.get("situation") || "");

  
  // Inicializa lendo da URL e convertendo para índice (ou -1 se não achar)
  const initialSpecieIndex = mapSpeciesStringToIndex(searchParams.get("specie") || "");
  const [selectedSpecie, setSelectedSpecie] = useState(initialSpecieIndex);

  
  
  // SINCRONIA URL -> STATE (Para botão Voltar/Refresh)
  useEffect(() => {
    setName(searchParams.get("name") || "");
    setCity(searchParams.get("city") || "");
    setBreed(searchParams.get("breed") || "");
    
    // Converte Back -> Front ao ler da URL
    setSelectedState(searchParams.get("state") || "");
    setSelectedAge(mapBackendToAge(searchParams.get("age") || ""));
    setSelectedSize(mapBackendToSize(searchParams.get("size") || ""));
    setSelectedSex(mapBackendToSex(searchParams.get("sex") || ""));
    setSelectedSituation(searchParams.get("situation") || "");
    
    const specieParam = searchParams.get("species");

    setSelectedSpecie(mapSpeciesStringToIndex(specieParam || ""));
  }, [searchParams]);


  // FUNÇÃO DE BUSCA
  const handleSearch = () => {
    // Aqui nós montamos o objeto que vai para a URL
    const formData = {
      name,
      city,
      breed,
      state: selectedState,
      age: selectedAge,
      size: selectedSize,
      situation: selectedSituation,
      sex: selectedSex,
      // Convertemos o índice numérico do radio de volta para string ("dog")
      species: selectedSpecie !== -1 ? specieOptions[selectedSpecie].value : "",
      // Resetar paginação
      page: "1" 
    };

    
    // Filtra chaves vazias para não ficar ?name=&city= na URL
    const cleanData = Object.fromEntries(
      Object.entries(formData).filter(([_, v]) => v != null && v !== "")
    );

    // Dispara o GET (Loader)
    submit(cleanData, { method: "get" });
  };

  const handleClear = () => {
    // Simplesmente submete vazio para limpar (ou redireciona via navigate)
    submit({}, { method: "get" });
  };

  // --- HELPERS DOS INPUTS ---
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const onChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value);
  const onChangeBreed = (e: React.ChangeEvent<HTMLInputElement>) => setBreed(e.target.value);



  // Constantes de opções
  const specieOptions = [
    { label: "Cachorro", value: "dog", backgroundImage: dogImage, backgroundColor: "#F17D6E", overlayImage: dogEffectImage },
    { label: "Gato", value: "cat", backgroundImage: catImage, backgroundColor: "#45E4FF", overlayImage: catEffectImage },
    { label: "Outros", value: "other", backgroundImage: birdImage, backgroundColor: "#FF9944", overlayImage: birdEffectImage },
  ];

  const states = { options: ["AM", "AC", "AL", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO"], resetOption: "Qualquer" };
  const ages = { options: ["Abaixo de 3 meses", "3 a 11 meses", "1 ano", "2 anos", "3 anos", "4 anos", "5 anos", "6 anos e acima"], resetOption: "Qualquer" };
  const sizes = { options: ["Pequeno", "Médio", "Grande"], resetOption: "Qualquer" };
  const situations = { options: ["Em lar temporário", "Disponível"], resetOption: "Qualquer" };

  const inputsWidth = "298px";
  const inputFontSize = "16px";
  const titleFontSize = "18px";

 return (
    <Container $width={"298px"} $hasBorder={hasBorder}>
      <ContainerTitle>Filtros</ContainerTitle>

      <FilterContainer>
        <SpecieRadioGroup>
          <InputTitle>Espécie</InputTitle>
          <SelectorRadioGroup
            selectedValue={selectedSpecie} // Passa number
            setSelectedValue={setSelectedSpecie} // Recebe number
            options={specieOptions}

            width="85px"
            height="75px"
            overlayImageWidth="81px"
            overlayImageHeight="51px"
            overlayImageLeft="4px"
            overlayImageTop="11px"
          />
        </SpecieRadioGroup>

        <div style={{display: "flex", width: "298px"}}>
            <BasicInput
              value={name}
              onChange={onChangeName}
              title="Nome"
              $width={"50%"}

              $fontSize={inputFontSize}
              $titleFontSize={titleFontSize}
              $paddingVertical="6px"
              placeholder="Insira o nome"
              required={false}
              $inputType="Secundário"
              $gapFromTitle="4px"
            />


            <SearchBar
              query={selectedSize}
              setQuery={setSelectedSize}
              options={sizes.options}
              resetOption={sizes.resetOption}
              width={"50%"}
              fontSize={inputFontSize}
              titleFontSize={titleFontSize}
              placeholder="P/M/G"
              title="Porte"
              required={false}
              readOnly={true}
              inputType="Secundário"
              verticalPadding="6px"
              gapFromTitle="4px"
          />

        </div>

        <div style={{display: "flex", width: inputsWidth}}>

          <BasicInput
            value={city}
            onChange={onChangeCity}
            $width={"65%"}
            $fontSize={inputFontSize}
            $titleFontSize={titleFontSize}
            placeholder="Insira a cidade aqui"
            $paddingVertical="6px"
            title="Cidade"
            required={false}
            $inputType="Secundário"
            $gapFromTitle="4px"
          />

          <SearchBar
            query={selectedState}
            setQuery={setSelectedState}
            options={states.options}
            resetOption={states.resetOption}
            width={"35%"}
            fontSize={inputFontSize}
            titleFontSize={titleFontSize}
            placeholder="UF"
            title="Estado"
            required={false}
            readOnly={false}
            inputType="Secundário"
            verticalPadding="6px"
            gapFromTitle="4px"
            listMaxHeight="200px"
          />

        </div>


        <div style={{display: "flex", width: inputsWidth}}>

          <BasicInput
            value={breed}
            onChange={onChangeBreed}
            $width={"55%"}
            $fontSize={inputFontSize}
            $titleFontSize={titleFontSize}
            placeholder="Insira a raça"
            $paddingVertical="6px"
            title="Raça"
            required={false}
            $inputType="Secundário"
            $gapFromTitle="4px"
          />



          <SearchBar
            query={selectedSex}
            setQuery={setSelectedSex}
            options={["Macho", "Fêmea"]}
            resetOption="Ambos"
            width={"45%"}
            fontSize={inputFontSize}
            titleFontSize={titleFontSize}
            placeholder="M/F"
            title="Sexo"
            required={false}
            readOnly={true}
            inputType="Secundário"
            verticalPadding="6px"
            gapFromTitle="4px"
          />

        </div>

          <SearchBar
            query={selectedAge}
            setQuery={setSelectedAge}
            options={ages.options}
            resetOption={ages.resetOption}
            width={inputsWidth}
            fontSize={inputFontSize}
            titleFontSize={titleFontSize}
            placeholder="Selecione a idade"
            title="Idade"
            numOptionsShowed={ages.options.length + 1}
            required={false}
            readOnly={true}
            inputType="Secundário"
            verticalPadding="6px"
            gapFromTitle="4px"
          />


          <SearchBar
            query={selectedSituation}
            setQuery={setSelectedSituation}
            options={situations.options}
            resetOption={situations.resetOption}
            width={inputsWidth}
            fontSize={inputFontSize}
            titleFontSize={titleFontSize}
            placeholder="Selecione a situação"
            title="Situação"
            required={false}
            readOnly={true}
            inputType="Secundário"
            verticalPadding="6px"
            gapFromTitle="4px"
          />
        
      </FilterContainer>

      <ButtonsContainer $width={"298px"}>

        <PrimarySecondaryButton 
          width="100%" 
          content={isSearching ? "Buscando..." : "Buscar"} 
          onClick={handleSearch}
          height="48px" 
        />
        
        <ActionText
          width="100%"
          fontSize="18px"
          onClick={handleClear}
          textColor="#553525"
          underlineOnHover={true}
        >
          Limpar Filtros
        </ActionText>
      </ButtonsContainer>
    </Container>
  );
}