import React from "react";

import {
  ButtonsContainer,
  Container,
  ContainerTitle,
  FilterContainer,
  InputTitle,
  SpecieRadioGroup,
} from "./styles";
import { IAnimalFilter } from "./types";

import ActionText from "../ActionText";
import BasicInput from "../BasicInput";
import PrimarySecondaryButton from "../PrimarySecondaryButton";
import SelectorRadioGroup from "../SelectorButtonRadioGroup";
import SearchBar from "../SearchBar";

import birdImage from "../../assets/Bird.svg";
import birdEffectImage from "../../assets/birdEffects.svg";
import catImage from "../../assets/Cat.svg";
import catEffectImage from "../../assets/catEffects.svg";
import dogImage from "../../assets/dog.svg";
import dogEffectImage from "../../assets/dogEffects.svg";

export default function AnimalFilter({
  selectedSpecie,
  setSelectedSpecie,
  selectedState,
  setSelectedState,
  selectedAge,
  setSelectedAge,
  selectedSize,
  setSelectedSize,
  selectedSituation,
  setSelectedSituation,
  city,
  setCity,
  name,
  setName,
  breed,
  setBreed,
  selectedSex,
  setSelectedSex,
  hasBorder = true,
  onSearch,
}: IAnimalFilter & { onSearch: () => void }) {
  const specieOptions = [
    {
      label: "Cachorro",
      value: "dog",
      backgroundImage: dogImage,
      backgroundColor: "#F17D6E",
      overlayImage: dogEffectImage,
    },
    {
      label: "Gato",
      value: "cat",
      backgroundImage: catImage,
      backgroundColor: "#45E4FF",
      overlayImage: catEffectImage,
    },
    {
      label: "Outros",
      value: "other",
      backgroundImage: birdImage,
      backgroundColor: "#FF9944",
      overlayImage: birdEffectImage,
    },
  ];

  const states = {
    options: ["AM", "AC", "AL", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO"],
    resetOption: "Qualquer",
  };

  const ages = {
    options: [
      "Abaixo de 3 meses",
      "3 a 11 meses",
      "1 ano",
      "2 anos",
      "3 anos",
      "4 anos",
      "5 anos",
      "6 anos e acima",
    ],
    resetOption: "Qualquer",
  };

  const sizes = {
    options: ["Pequeno", "Médio", "Grande"],
    resetOption: "Qualquer",
  };

  const situations = {
    options: ["Em lar temporário", "Disponível"],
    resetOption: "Qualquer",
  };

  const onChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeBreed = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBreed(e.target.value);
  };

  const onCleanFilters = () => {
    setSelectedSpecie(-1);
    setSelectedState("");
    setSelectedAge("");
    setSelectedSize("");
    setSelectedSituation("");
    setCity("");
    setName("");
    setBreed("");
    setSelectedSex("");
  };



 


  const inputsWidth = "298px";
  const containerWidth = inputsWidth;
  const inputFontSize = "16px";
  const titleFontSize = "18px";

  return (
    <Container $width={containerWidth} $hasBorder={hasBorder}>
      <ContainerTitle>Filtros</ContainerTitle>

      <FilterContainer>
        <SpecieRadioGroup>
          <InputTitle>Espécie</InputTitle>
          <SelectorRadioGroup
            selectedValue={selectedSpecie}
            setSelectedValue={setSelectedSpecie}
            options={specieOptions}
            width="85px"
            height="75px"
            overlayImageWidth="81px"
            overlayImageHeight="51px"
            overlayImageLeft="4px"
            overlayImageTop="11px"
          />
        </SpecieRadioGroup>

        <div style={{display: "flex", width: inputsWidth}}>
        <BasicInput
          value={name}
          onChange={onChangeName}
          $width={"50%"}
          $fontSize={inputFontSize}
          $titleFontSize={titleFontSize}
          $paddingVertical="6px"
          placeholder="Insira o nome"
          title="Nome"
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

      <ButtonsContainer $width={inputsWidth}>
        <PrimarySecondaryButton width="100%" content="Buscar" onClick={onSearch} height="48px" />
        <ActionText
          width="100%"
          fontSize="18px"
          onClick={onCleanFilters}
          textColor="#553525"
          underlineOnHover={true}

        >
          Limpar Filtros
        </ActionText>
      </ButtonsContainer>
    </Container>
  );
}