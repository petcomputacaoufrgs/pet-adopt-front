import { useEffect, useState } from "react";
import { ImageSlotsGroup } from "../../components/ImageSlotsGroup";
import { AnimalFormContainer, FormContainer, ImageSlotsContainer, InfoContent, InputsContainer, InputSubtitle, Label, RequiredAsterisk } from "./styles";
import LargeInputField from "../../components/LargeInput";
import BasicInput from "../../components/BasicInput";
import styled from "styled-components";
import SelectorRadioGroup from "../../components/SelectorButtonRadioGroup";
import RadioGroup from "../../components/RadioGroup";
import SearchBar from "../../components/SearchBar";
import PrimarySecondaryButton from "../../components/PrimarySecondaryButton";


import AnimalFormPhoto from "../../assets/AnimalFormPhoto.png";
import Header from "../../components/Header";

import logo from "../../assets/HorizontalLogo.png"
import Footer from "../HomePage/6Footer";


interface IAnimalForm{
  animalData: boolean;
}

export function AnimalForm({animalData} : IAnimalForm) {
  let initialImages = [];

  if(animalData)
    initialImages = [null, null, null, null, null, null, null, null, null, null];
  else
    initialImages = [null, null, null, null, null, null, null, null, null, null];


  const [images, setImages] = useState<(string | null)[]>(initialImages);


  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [breed, setBreed] = useState<string>("");
  const [sizeIndex, setSizeIndex] = useState<number>(-1);
  const [situationIndex, setSituationIndex] = useState<number>(-1);
  const [animalSexIndex, setAnimalSexIndex] = useState<number>(-1);
  
  const [description, setDescription] = useState<string>("");

  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");

  const [specie, setSpecie] = useState<string>("");
  const [specieIndex, setSpecieIndex] = useState<number>(-1);

  const [ong, setOng] = useState<string>("");

  console.log(specie);


  const headerOptions = ["Sobre Nós", "Animais Recém Adicionados", "Dicas", "Fale Conosco"]


  const handleHeaderAction = (selected: string) => {
  } 


  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (


<div style={{display: "flex", flexDirection: "column"}}>

  <Header options={headerOptions} optionsToAction={handleHeaderAction} color="#FFF6E8" Logo={logo}/>


  <div style={{padding: "32px", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundImage: `url(${AnimalFormPhoto})`, backgroundSize: "cover", backgroundPosition: "center"}}>
    <AnimalFormContainer>

      <FormContainer >

        <InfoContent>
          <h1>Cadastro do Pet</h1>
          <p>Preencha os campos abaixo para cadastrar o pet</p>
        </InfoContent>

        <InputsContainer>
          <div style={{width: "50%", display: "flex", flexDirection: "column", gap: "24px"}}>

          <div style={{display: "flex", flexDirection: "column", gap: "16px"}}>
            <BasicInput
              title="Nome"
              required = {true}
              placeholder="Insira o nome do pet aqui"
              value={name}
              $fontSize="1rem"
              $width="100%"
              onChange={(e) => setName(e.target.value)}
            />

            <BasicInput
              title="Idade"
              required = {true}
              placeholder="Insira a idade do pet aqui"
              value={age}
              $fontSize="1rem"
              $width="100%"
              onChange={(e) => setAge(e.target.value)}
            />

            <BasicInput
              title="Raça (Opcional)"
              required = {false}
              placeholder="Insira a raça do pet aqui"
              value={breed}
              $fontSize="1rem"
              $width="100%"
              onChange={(e) => setBreed(e.target.value)}
            />

            {window.innerWidth <= 1280 && window.innerWidth > 979 && 
              <SearchBar 
                title="Selecione a ONG"
                required = {true}
                placeholder="Insira a ONG responsável aqui"
                query={ong}
                setQuery={setOng}
                options={["Teste"]}
                width= "100%"
                fontSize="1rem"
              />
            
            }



            { windowSize <= 979 &&
            <LargeInputField
            title="Características e Observações"
            required={true}
            $fontSize="1rem"
            placeholder="Escreva uma breve descrição aqui"
            $width="100%"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={false}
            visible={false}
            isDisabled={false}
            $inputType="Primário"
          />
            }



            </div>


            <div style={{display: 'flex', gap: "24px"}}>

              <RadioGroup 
                title="Espécie"
                required={true}
                options={
                [{label: "Cachorro", value: "Cachorro"}, {label: "Gato", value: "Gato"}, {label: "Outro", value: ""}]}
                onChange={(value) => setSpecie(value)}
                userFillOptionLabel="Outro"
                fontSize="1rem"
                name="specie"
                toggleIndex={specieIndex}
                onSelectToggle={(index) => setSpecieIndex(index)}
              />

              <RadioGroup 
                title="Sexo"
                required={true}
                options={
                [{label: "Macho", value: "Macho"}, {label: "Fêmea", value: "Fêmea"}]}
                fontSize="1rem"
                name="animalSex"
                toggleIndex={animalSexIndex}
                onSelectToggle={(index) => setAnimalSexIndex(index)}
              />

            </div>


          <div style={{display: 'flex', gap: "24px"}}>
              <RadioGroup 
                title="Porte"
                required={true}
                options={
                [{label: "Pequeno", value: "Pequeno"}, {label: "Médio", value: "Médio"}, {label: "Grande", value: "Grande"}]}
                fontSize="1rem"
                name="size"
                toggleIndex={sizeIndex}
                onSelectToggle={(index) => setSizeIndex(index)}
              />


              <RadioGroup 
                title="Situação"
                required={true}
                options={
                [{label: "Disponível", value: "Disponível"}, {label: "Lar Temporário", value: "Lar Temporário"}, {label: "Adotado", value: "Adotado"}]}
                fontSize="1rem"
                name="situation"
                toggleIndex={situationIndex}
                onSelectToggle={(index) => setSituationIndex(index)}
              />
                
            </div>




            
          </div>

      <div style={{width: "50%"}}>

        <div style={{display: "flex", flexDirection: "column", gap: "16px"}}>

          {windowSize > 979 &&

          <LargeInputField
            title="Características e Observações"
            required={true}
            $fontSize="1rem"
            placeholder="Escreva uma breve descrição aqui"
            $width="100%"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={false}
            visible={false}
            isDisabled={false}
            $inputType="Primário"
          />

        }


        {/* <SearchBar /> */}

          <div style={{display: 'flex', gap: "24px"}}>
              <BasicInput 
                title="Cidade"
                required = {true}
                placeholder="Cidade do pet"
                value={city}
                $fontSize="1rem"
                $width="70%"
                onChange={(e) => setCity(e.target.value)}
              />

              <SearchBar 
                title="Estado"
                required = {true}
                placeholder="Estado do pet"
                query={state}
                setQuery={setState}
                options={["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]}
                width= "30%"
                fontSize="1rem"
              />
            
          </div>

            {windowSize > 1280 || windowSize <= 979 &&
            <SearchBar 
                title="Selecione a ONG"
                required = {true}
                placeholder="Insira a ONG responsável aqui"
                query={ong}
                setQuery={setOng}
                options={["Teste"]}
                width= "100%"
                fontSize="1rem"
              />
            }


      <>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Label $fontSize={"1rem"}>
            {"Selecione a ONG"}
            <RequiredAsterisk> *</RequiredAsterisk>
          </Label>

          <InputSubtitle>Adicione no mínimo 1 foto e no máximo 10 fotos</InputSubtitle>

        </div>



        <ImageSlotsContainer>
          <ImageSlotsGroup images={images} setImages={setImages} />
        </ImageSlotsContainer>
      </>


      </div>


          

      </div>

        
      </InputsContainer>




                  

      <hr style={{width: "100%"}}></hr>

      <div style={{display: "flex", justifyContent: "flex-end"}}>
      <PrimarySecondaryButton content={animalData? "Editar Cadastro do Pet" : "Criar Cadastro do Pet"} onClick={() => {console.log("REQUISIÇÃO DE EDIÇÃO/CRIAÇÃO")}} />

      
      </div>

      </FormContainer>

    </AnimalFormContainer>

  </div>


<Footer />
</div>
  );
}
