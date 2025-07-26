// AnimalFormSection.tsx

import styled from "styled-components";
import {
  AnimalFormContainer,
  FormContainer,
  InfoContent,
  InputsContainer,
  LocationInputsContainer,
  Label,
  RequiredAsterisk,
  InputSubtitle,
  ImageSlotsContainer,
  Wrapper,
  VerticalColumn,
  HalfColumn,
  Row,
  SubmitContainer

} from "./styled";
import BasicInput from "../BasicInput";
import LargeInputField from "../LargeInput";
import RadioGroup from "../RadioGroup";
import SearchBar from "../SearchBar";
import ImageSlotsGroup from "../ImageSlotsGroup";
import PrimarySecondaryButton from "../PrimarySecondaryButton";

import AnimalFormPhoto from "../../assets/AnimalFormPhoto.png";

import { IAnimalFormSection } from "./types";

export default function AnimalFormSection({
  windowSize,
  name,
  age,
  breed,
  ong,
  city,
  state,
  specieIndex,
  animalSexIndex,
  sizeIndex,
  situationIndex,
  setName,
  setAge,
  setBreed,
  setCity,
  setState,
  setOng,
  setSpecieIndex,
  setAnimalSexIndex,
  setSizeIndex,
  setSituationIndex,
  setSpecie,
  description,
  setDescription,
  images,
  setImages,
  animalData
}: IAnimalFormSection) {
  
  return (
    <Wrapper $windowSize={windowSize} AnimalFormPhoto={AnimalFormPhoto}>
      <AnimalFormContainer>
        <FormContainer>
          <InfoContent>
            <h1>Cadastro do Pet</h1>
            <p>Preencha os campos abaixo para cadastrar o pet</p>
          </InfoContent>

          <InputsContainer>
            <HalfColumn $windowSize={windowSize}>
              <VerticalColumn>
                <BasicInput
                  title="Nome"
                  required
                  placeholder="Insira o nome do pet aqui"
                  value={name}
                  $fontSize="1rem"
                  $width="100%"
                  onChange={(e) => setName(e.target.value)}
                />

                <BasicInput
                  title="Idade"
                  required
                  placeholder="Insira a idade do pet aqui"
                  value={age}
                  $fontSize="1rem"
                  $width="100%"
                  onChange={(e) => setAge(e.target.value)}
                />

                <BasicInput
                  title="Raça (Opcional)"
                  required={false}
                  placeholder="Insira a raça do pet aqui"
                  value={breed}
                  $fontSize="1rem"
                  $width="100%"
                  onChange={(e) => setBreed(e.target.value)}
                />

                {windowSize <= 1280 && windowSize >= 932 && (
                  <SearchBar
                    title="Selecione a ONG"
                    required
                    placeholder="Insira a ONG responsável aqui"
                    query={ong}
                    setQuery={setOng}
                    options={["Teste"]}
                    width="100%"
                    fontSize="1rem"
                  />
                )}

                {windowSize < 932 && (
                  <LargeInputField
                    title="Características e Observações"
                    required
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
                )}
              </VerticalColumn>

              <Row>
                <RadioGroup
                  title="Espécie"
                  required
                  options={[
                    { label: "Cachorro", value: "Cachorro" },
                    { label: "Gato", value: "Gato" },
                    { label: "Outro", value: "" },
                  ]}
                  onChange={(value) => setSpecie(value)}
                  userFillOptionLabel="Outro"
                  fontSize="1rem"
                  name="specie"
                  toggleIndex={specieIndex}
                  onSelectToggle={setSpecieIndex}
                />

                <RadioGroup
                  title="Sexo"
                  required
                  options={[
                    { label: "Macho", value: "Macho" },
                    { label: "Fêmea", value: "Fêmea" },
                  ]}
                  fontSize="1rem"
                  name="animalSex"
                  toggleIndex={animalSexIndex}
                  onSelectToggle={setAnimalSexIndex}
                />
              </Row>

              <Row>
                <RadioGroup
                  title="Porte"
                  required
                  options={[
                    { label: "Pequeno", value: "Pequeno" },
                    { label: "Médio", value: "Médio" },
                    { label: "Grande", value: "Grande" },
                  ]}
                  fontSize="1rem"
                  name="size"
                  toggleIndex={sizeIndex}
                  onSelectToggle={setSizeIndex}
                />

                <RadioGroup
                  title="Situação"
                  required
                  options={[
                    { label: "Disponível", value: "Disponível" },
                    { label: "Lar Temporário", value: "Lar Temporário" },
                    { label: "Adotado", value: "Adotado" },
                  ]}
                  fontSize="1rem"
                  name="situation"
                  toggleIndex={situationIndex}
                  onSelectToggle={setSituationIndex}
                />
              </Row>
            </HalfColumn>

            <HalfColumn $windowSize={windowSize}>
              <VerticalColumn>
                {windowSize >= 923 && (
                  <LargeInputField
                    title="Características e Observações"
                    required
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
                )}

                <LocationInputsContainer>
                  <BasicInput
                    title="Cidade"
                    required
                    placeholder="Cidade do pet"
                    value={city}
                    $fontSize="1rem"
                    $width={windowSize > 1180 ? "55%" : "100%"}
                    onChange={(e) => setCity(e.target.value)}
                  />

                  <SearchBar
                    title="Estado"
                    required
                    placeholder="Estado do pet"
                    query={state}
                    setQuery={setState}
                    options={[
                      "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT",
                      "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO",
                      "RR", "SC", "SP", "SE", "TO",
                    ]}
                    width={windowSize > 1180 ? "45%" : "100%"}
                    fontSize="1rem"
                  />
                </LocationInputsContainer>

                {(windowSize > 1280 || windowSize < 932) && (
                  <SearchBar
                    title="Selecione a ONG"
                    required
                    placeholder="Insira a ONG responsável aqui"
                    query={ong}
                    setQuery={setOng}
                    options={["Teste"]}
                    width="100%"
                    fontSize="1rem"
                  />
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <Label $fontSize={"1rem"}>
                    {"Selecione a ONG"}
                    <RequiredAsterisk>*</RequiredAsterisk>
                  </Label>

                  <InputSubtitle>
                    Adicione no mínimo 1 foto e no máximo 10 fotos
                  </InputSubtitle>
                </div>

                <ImageSlotsContainer>
                  <ImageSlotsGroup images={images} setImages={setImages} />
                </ImageSlotsContainer>
              </VerticalColumn>
            </HalfColumn>
          </InputsContainer>

          <hr style={{ width: "100%" }} />

          <SubmitContainer>
            <PrimarySecondaryButton
              content={animalData ? "Editar Cadastro do Pet" : "Criar Cadastro do Pet"}
              onClick={() => console.log("REQUISIÇÃO DE EDIÇÃO/CRIAÇÃO")}
            />
          </SubmitContainer>
        </FormContainer>
      </AnimalFormContainer>
    </Wrapper>
  );
}
