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
import { useEffect, useState } from "react";

import AnimalFormPhoto from "../../assets/AnimalFormPhoto.png";

import { IAnimalFormSection } from "./types";
import { petService, ngoService } from "../../services/index";
import { AxiosError } from "axios";

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
  specie,
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
  characteristics,
  setCharacteristics,
  images,
  setImages,
  animalData
}: IAnimalFormSection) {
  const [isCreatingPET, setIsCreatingPET] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [ngoOptions, setNgoOptions] = useState<{ id: string; name: string }[]>([]);

  const fetchNgoOptions = async () => {
      try {
        const response = await ngoService.getApproved();
        
        // Pega só nome e ID da NGO
        const mappedNgoOptions = response.data.map((ngo: any) => ({
          id: ngo._id || ngo.id, // Lida com nomeclatura "_id" do MongoDB.
          name: ngo.name
        }));
        
        setNgoOptions(mappedNgoOptions);
      } catch (error) {
        console.error('Error fetching NGO options:', error);
      }
    };
  
    useEffect(() => {
      fetchNgoOptions();
    }, []);

  useEffect(() => {
    console.log('ONG atual:', ong);
  }, [ong]);
  
  const validateForm = (): boolean => {
    setError("");
    
    // Lista de campos obrigatórios e suas validações
    const validations = [
      { field: name.trim(), message: "Nome é obrigatório" },
      { field: age, message: "Idade é obrigatória" },
      { field: city.trim(), message: "Cidade é obrigatória" },
      { field: state, message: "Estado é obrigatório" },
      { field: ong, message: "ONG é obrigatória" },
      { field: characteristics.trim(), message: "Características e Observações são obrigatórias" },
      { field: specieIndex >= 0, message: "Espécie é obrigatória" },
      { field: animalSexIndex >= 0, message: "Sexo é obrigatório" },
      { field: sizeIndex >= 0, message: "Porte é obrigatório" },
      { field: situationIndex >= 0, message: "Situação é obrigatória" },
    ];

    // Verificar se há pelo menos uma imagem (File novo ou URL existente)
    const validImages = images.filter(img => img !== null);
    if (validImages.length < 1) {
      setError("Adicione pelo menos 1 foto do pet");
      return false;
    }
    if (validImages.length > 10) {
      setError("Máximo de 10 fotos permitidas");
      return false;
    }

    // Verifica cada campo obrigatório
    for (const validation of validations) {
      if (!validation.field) {
        setError(validation.message);
        return false;
      }
    }
    return true;
  };

  const editPet = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      setIsCreatingPET(true);
      setError("");

      const formData = new FormData();

      // Campos básicos
      formData.append("name", name);
      formData.append("age", age);
      formData.append("breed", breed || ""); // Opcional
      formData.append("characteristics", characteristics);
      formData.append("NGO", ong);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("observations", ""); // Campo opcional, pode adicionar um estado se necessário

      // Sexo: converter índice para formato esperado
      const sexValue = animalSexIndex === 0 ? "M" : "F"; // 0=Macho=M, 1=Fêmea=F
      formData.append("sex", sexValue);

      // Espécie: converter índice para enum
      let speciesValue: string;
      let otherSpeciesValue = "";
      
      if (specieIndex === 0) {
        speciesValue = "DOG"; // Cachorro
      } else if (specieIndex === 1) {
        speciesValue = "CAT"; // Gato  
      } else if (specieIndex === 2) {
        speciesValue = "OTHER"; // Outro
        otherSpeciesValue = specie; // Valor digitado pelo usuário
      } else {
        throw new Error("Espécie deve ser selecionada");
      }
      
      formData.append("species", speciesValue);
      if (otherSpeciesValue) {
        formData.append("otherSpecies", otherSpeciesValue);
      }

      // Porte: apenas para cachorros, converter índice para formato esperado
      if (speciesValue === "DOG") {
        let sizeValue: string;
        if (sizeIndex === 0) sizeValue = "P"; // Pequeno
        else if (sizeIndex === 1) sizeValue = "M"; // Médio
        else if (sizeIndex === 2) sizeValue = "G"; // Grande
        else throw new Error("Porte deve ser selecionado para cachorros");
        
        formData.append("size", sizeValue);
      }

      // Status: converter índice para formato esperado
      let statusValue: string;
      let forAdoption = false;
      let forTempHome = false;

      if (situationIndex === 0) {
        statusValue = "Available"; // Disponível
        forAdoption = true;
        forTempHome = true;
      } else if (situationIndex === 1) {
        statusValue = "TempHome"; // Lar Temporário
        forAdoption = true;
        forTempHome = false;
      } else if (situationIndex === 2) {
        statusValue = "Adopted"; // Adotado
        forAdoption = false;
        forTempHome = false;
      } else {
        throw new Error("Situação deve ser selecionada");
      }

      formData.append("status", statusValue);
      formData.append("forAdoption", forAdoption.toString());
      formData.append("forTempHome", forTempHome.toString());

      // Adicionar apenas novos arquivos (File) ao FormData
      images.forEach((image) => {
        if (image instanceof File) {
          formData.append('photos', image);
        }
      });

      // Se estiver editando, enviar também as URLs existentes que devem ser mantidas
      if (animalData) {
        const petId = animalData.id || animalData._id;
        if (!petId) {
          setError("ID do animal não encontrado para edição");
          return;
        }

        const existingUrls = images
          .filter((img): img is string => typeof img === 'string')
          .map(url => url);
        
        console.log("URLs existentes a serem mantidas:", existingUrls);
        existingUrls.forEach((url) => {
          formData.append('existingPhotos[]', url);
        });

        console.log("Editando pet com ID:", petId);

        // Para edição, usar o serviço update
        const response = await petService.update(petId, formData);
        console.log("Pet editado com sucesso!", response);
      } else {
        // Para criação, usar o serviço create
        const response = await petService.create(formData);
        console.log("Pet criado com sucesso!", response);
      }
      
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        setError(err.response.data?.message || 'Erro ao processar pet.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro de conexão. Tente novamente mais tarde.');
      }
      throw err;
    } finally {
      setIsCreatingPET(false);
    }
  };

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

                <SearchBar
                  title="Idade"
                  required
                  readOnly
                  placeholder="Insira a idade do pet aqui"
                  query={age}
                  setQuery={setAge}
                  fontSize="1rem"
                  width="100%"
                  numOptionsShowed={8}
                  options={["Abaixo de 3 meses", "3 a 11 meses", "1 ano", "2 anos", "3 anos", "4 anos", "5 anos", "6 anos e acima"]}
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
                    options={ngoOptions.map(ngo => ngo.name)}
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
                    value={characteristics}
                    onChange={(e) => setCharacteristics(e.target.value)}
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
                    { label: "Cachorro", value: "DOG" },
                    { label: "Gato", value: "CAT" },
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
                    { label: "Macho", value: "M" },
                    { label: "Fêmea", value: "F" },
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
                    { label: "Pequeno", value: "P" },
                    { label: "Médio", value: "M" },
                    { label: "Grande", value: "G" },
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
                    { label: "Disponível", value: "available" },
                    { label: "Lar Temporário", value: "temporary home" },
                    { label: "Adotado", value: "adopted" },
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
                    value={characteristics}
                    onChange={(e) => setCharacteristics(e.target.value)}
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
                    options={ngoOptions.map(ngo => ngo.name)}
                    width="100%"
                    fontSize="1rem"
                  />
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <Label $fontSize={"1rem"}>
                    {"Fotos do Pet"}
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

          {error && (
            <div style={{
              backgroundColor: '#ffebee',
              border: '1px solid #f44336',
              borderRadius: '4px',
              padding: '12px',
              margin: '16px 0',
              color: '#d32f2f',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <SubmitContainer>
            <PrimarySecondaryButton
              content={
                isCreatingPET 
                  ? (animalData ? "Editando..." : "Criando...") 
                  : (animalData ? "Editar Cadastro do Pet" : "Criar Cadastro do Pet")
              }
              onClick={() => editPet()}
              paddingH="10px" 
              paddingV="10px"
              isDisabled={isCreatingPET}
            />
          </SubmitContainer>
        </FormContainer>
      </AnimalFormContainer>
    </Wrapper>
  );
}
