import dog from "../../assets/dog.svg";
import dogEffect from "../../assets/dogEffects.svg";

import cat from "../../assets/Cat.svg";
import catEffect from "../../assets/catEffects.svg";

import bird from "../../assets/Bird.svg";
import birdEffect from "../../assets/birdEffects.svg";
import SelectorRadioGroup from "../SelectorButtonRadioGroup";
import SearchBar from "../SearchBar";
import BasicInput from "../BasicInput";
import { ButtonsContainer, Container, ContainerTitle, FilterContainer, InputTitle, SpecieRadioGroup } from "./styles";
import PrimarySecondaryButton from "../PrimarySecondaryButton";
import ActionText from "../ActionText";


interface IAnimalFilter {
  selectedSpecie: number;
  setSelectedSpecie: (value: number) => void;
  selectedState: string;
  setSelectedState: (value: string) => void;
  selectedAge: string;
  setSelectedAge: (value: string) => void;
  selectedSize: string;
  setSelectedSize: (value: string) => void;
  selectedSituation: string;
  setSelectedSituation: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  name: string;
  setName: (value: string) => void;
  breed: string;
  setBreed: (value: string) => void;
  selectedSex: string;
  setSelectedSex: (value: string) => void;
}

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
  setSelectedSex
}: IAnimalFilter) {


    const specieOptions = [
    {
      label: "Cachorro",
      value: "dog",
      backgroundImage: dog,
      backgroundColor: "#F17D6E",
      overlayImage: dogEffect,
    },
    {
      label: "Gato",
      value: "cat",
      backgroundImage: cat,
      backgroundColor: "#45E4FF",
      overlayImage: catEffect,
    },
    {
      label: "Pássaro",
      value: "bird",
      backgroundImage: bird,
      backgroundColor: "#FF9944",
      overlayImage: birdEffect,
    }
  ]




  const states = {
      options: [
        "Qualquer",
        "Rio Grande do Sul",
        "Santa Catarina",
        "Paraná"
      ],

      resetOption: "Qualquer"
    }



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
        "6 anos e acima"
      ],

    resetOption: "Qualquer"

    }



    const sizes = {
      options: [
        "Qualquer",
        "Pequeno",
        "Médio",
        "Grande"
      ],

      resetOption: "Qualquer"
    }


    const situations = {
      options: [
        "Qualquer",
        "Em lar temporário",
        "Disponível"
      ],

      resetOption: "Qualquer"
    }





    const onChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCity(e.target.value);
    }


    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    }

    const onChangeBreed = (e: React.ChangeEvent<HTMLInputElement>) => {
      setBreed(e.target.value);
    }


    const onCleanFilters = (e: React.MouseEventHandler<HTMLParagraphElement>) => {
      setSelectedSpecie(-1);
      setSelectedState("");
      setSelectedAge("");
      setSelectedSize("");
      setSelectedSituation("");
      setCity("");
      setName("");
      setBreed("");
      setSelectedSex("");
    }



    const inputsWidth = "298px";
    const containerWidth = inputsWidth;
    const inputFontsize = "16px";
    const titleFontSize = "18px";

    return (
    
  <Container $width={containerWidth}>

  <ContainerTitle>Filtros</ContainerTitle>

  
  <FilterContainer>

  <SpecieRadioGroup>
    <InputTitle>Espécie</InputTitle>
    <SelectorRadioGroup
      selectedValue        = {selectedSpecie}
      setSelectedValue     = {setSelectedSpecie}
      options              = {specieOptions}
      width                = "92px"
      height               = "81px"
      overlayImageWidth    = "81px"
      overlayImageHeight   = "51px"
      overlayImageLeft     = "4px"
      overlayImageTop      = "11px"
    />
  </SpecieRadioGroup>

  <BasicInput
    value        = {name}
    onChange     = {onChangeName}
    $width       = {inputsWidth}
    $fontSize    = {inputFontsize}
    $titleFontSize= {titleFontSize}
    placeholder  = "Insira o nome aqui"
    title        = "Nome"
    required     = {false}
    $inputType="Secundário"
  />

  <SearchBar
    query        = {selectedState}
    setQuery     = {setSelectedState}
    options      = {states.options}
    resetOption  = {states.resetOption}
    width        = {inputsWidth}
    fontSize     = {inputFontsize}
    titleFontSize= {titleFontSize}
    placeholder  = "Selecione o estado"
    title        = "Estado"
    required     = {false}
    readOnly     = {false}
    inputType= "Secundário"
  />

  <BasicInput
    value        = {city}
    onChange     = {onChangeCity}
    $width       = {inputsWidth}
    $fontSize    = {inputFontsize}
    $titleFontSize= {titleFontSize}
    placeholder  = "Insira a cidade aqui"
    title        = "Cidade"
    required     = {false}
    $inputType= "Secundário"

  />

  <BasicInput
    value        = {breed}
    onChange     = {onChangeBreed}
    $width       = {inputsWidth}
    $fontSize    = {inputFontsize}
    $titleFontSize= {titleFontSize}
    placeholder  = "Insira a raça aqui"
    title        = "Raça"
    required     = {false}
    $inputType= "Secundário"
  />

  <SearchBar
    query        = {selectedSex}
    setQuery     = {setSelectedSex}
    options      = {["Ambos", "Macho", "Fêmea"]}
    resetOption  = "Ambos"
    width        = {inputsWidth}
    fontSize     = {inputFontsize}
    titleFontSize= {titleFontSize}
    placeholder  = "Selecione o sexo"
    title        = "Sexo"
    required     = {false}
    readOnly     = {true}
    inputType= "Secundário"
  />

  <SearchBar
    query             = {selectedAge}
    setQuery          = {setSelectedAge}
    options           = {ages.options}
    resetOption       = {ages.resetOption}
    width             = {inputsWidth}
    fontSize          = {inputFontsize}
    titleFontSize     = {titleFontSize}
    placeholder       = "Selecione a idade"
    title             = "Idade"
    numOptionsShowed  = {ages.options.length}
    required          = {false}
    readOnly          = {true}
    inputType= "Secundário"
  />

  <SearchBar
    query        = {selectedSize}
    setQuery     = {setSelectedSize}
    options      = {sizes.options}
    resetOption  = {sizes.resetOption}
    width        = {inputsWidth}
    fontSize     = {inputFontsize}
    titleFontSize= {titleFontSize}
    placeholder  = "Selecione o porte"
    title        = "Porte"
    required     = {false}
    readOnly     = {true}
    inputType= "Secundário"
  />

  <SearchBar
    query        = {selectedSituation}
    setQuery     = {setSelectedSituation}
    options      = {situations.options}
    resetOption  = {situations.resetOption}
    width        = {inputsWidth}
    fontSize     = {inputFontsize}
    titleFontSize= {titleFontSize}
    placeholder  = "Selecione a situação"
    title        = "Situação"
    required     = {false}
    readOnly     = {true}
    inputType= "Secundário"
  />

  </FilterContainer>

  <ButtonsContainer $width={inputsWidth}>
    <PrimarySecondaryButton width="100%" content= "Buscar" onClick={() => {}} />
    <ActionText width="100%" font_size="18px" onClick={onCleanFilters} text_color="#553525" underline_on_hover={true}>Limpar Filtros</ActionText>
  </ButtonsContainer>
  
  </Container>

)
  }

