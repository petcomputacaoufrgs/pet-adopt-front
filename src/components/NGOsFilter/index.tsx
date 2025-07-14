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


interface INGOsFilter {
  ngos: string[],
  selectedState: string;
  setSelectedState: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  name: string;
  setName: (value: string) => void;

  hasBorder?: boolean;
}

export default function NGOsFilter({
  ngos,
  selectedState,
  setSelectedState,
  city,
  setCity,
  name,
  setName,

  hasBorder = true
}: INGOsFilter) {






  const states = {
      options: [
        "Qualquer",
        "Rio Grande do Sul",
        "Santa Catarina",
        "Paraná"
      ],

      resetOption: "Qualquer"
    }




    const onChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCity(e.target.value);
    }


    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    }

    const onCleanFilters = (e: React.MouseEventHandler<HTMLParagraphElement>) => {
      setSelectedState("");
      setCity("");
      setName("");
    }



    const inputsWidth = "298px";
    const containerWidth = inputsWidth;
    const inputFontsize = "16px";
    const titleFontSize = "18px";

    return (
    
  <Container $width={containerWidth} $hasBorder = {hasBorder}>

  <ContainerTitle>Filtros</ContainerTitle>

  
  <FilterContainer>

  <SearchBar
    query         = {name}
    setQuery      = {setName}
    options       = {ngos}
    resetOption   = "Todas"
    width         = {inputsWidth}
    fontSize      = {inputFontsize}
    titleFontSize = {titleFontSize}
    placeholder   = "Insira o nome aqui"
    title         = "Nome"
    required      = {false}
    inputType     = "Secundário"
    numOptionsShowed={4}
  />

  <SearchBar
    query         = {selectedState}
    setQuery      = {setSelectedState}
    options       = {states.options}
    resetOption   = {states.resetOption}
    width         = {inputsWidth}
    fontSize      = {inputFontsize}
    titleFontSize = {titleFontSize}
    placeholder   = "Selecione o estado"
    title         = "Estado"
    required      = {false}
    readOnly      = {false}
    inputType     = "Secundário"
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


  </FilterContainer>

  <ButtonsContainer $width={inputsWidth}>
    <PrimarySecondaryButton width="100%" content= "Buscar" onClick={() => {}} />
    <ActionText width="100%" font_size="18px" onClick={onCleanFilters} text_color="#553525" underline_on_hover={true}>Limpar Filtros</ActionText>
  </ButtonsContainer>
  
  </Container>

)
  }

