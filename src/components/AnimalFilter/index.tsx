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
}: IAnimalFilter) {
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
      label: "Pássaro",
      value: "bird",
      backgroundImage: birdImage,
      backgroundColor: "#FF9944",
      overlayImage: birdEffectImage,
    },
  ];

  const states = {
    options: ["Qualquer", "Rio Grande do Sul", "Santa Catarina", "Paraná"],
    resetOption: "Qualquer",
  };

  const ages = {
    options: [
      "Qualquer",
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
    options: ["Qualquer", "Pequeno", "Médio", "Grande"],
    resetOption: "Qualquer",
  };

  const situations = {
    options: ["Qualquer", "Em lar temporário", "Disponível"],
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
            width="92px"
            height="81px"
            overlayImageWidth="81px"
            overlayImageHeight="51px"
            overlayImageLeft="4px"
            overlayImageTop="11px"
          />
        </SpecieRadioGroup>

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

        <BasicInput
          value={breed}
          onChange={onChangeBreed}
          $width={inputsWidth}
          $fontSize={inputFontSize}
          $titleFontSize={titleFontSize}
          placeholder="Insira a raça aqui"
          title="Raça"
          required={false}
          $inputType="Secundário"
        />

        <SearchBar
          query={selectedSex}
          setQuery={setSelectedSex}
          options={["Ambos", "Macho", "Fêmea"]}
          resetOption="Ambos"
          width={inputsWidth}
          fontSize={inputFontSize}
          titleFontSize={titleFontSize}
          placeholder="Selecione o sexo"
          title="Sexo"
          required={false}
          readOnly={true}
          inputType="Secundário"
        />

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
        />

        <SearchBar
          query={selectedSize}
          setQuery={setSelectedSize}
          options={sizes.options}
          resetOption={sizes.resetOption}
          width={inputsWidth}
          fontSize={inputFontSize}
          titleFontSize={titleFontSize}
          placeholder="Selecione o porte"
          title="Porte"
          required={false}
          readOnly={true}
          inputType="Secundário"
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
        />
      </FilterContainer>

      <ButtonsContainer $width={inputsWidth}>
        <PrimarySecondaryButton width="100%" content="Buscar" onClick={() => {}} />
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