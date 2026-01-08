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
import { useEffect, useState, useTransition } from "react";

import AnimalFormPhoto from "../../assets/AnimalFormPhoto.png";

import { IAnimalFormSection } from "./types";
import { petService, ngoService } from "../../services/index";
import { AxiosError } from "axios";

import { useToast } from "../../contexts/ToastContext";
import { useNavigate } from "react-router-dom";

export default function AnimalFormSection({
  windowSize,
  name,
  age,
  breed,
  ngoId,
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
  setNgoId,
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
  const [ngoName, setNgoName] = useState<string>();

  const navigate = useNavigate();
    const [isPending, startTransition] = useTransition();
    const handleNavigation = (to: string) => {
      startTransition(() => {
        navigate(to);
      });
    }

  const { showToast } = useToast();

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
    console.log('ONG atual:', ngoId);
  }, [ngoId]);
  
  const validateForm = (): boolean => {
    setError("");
    
    // Lista de campos obrigatórios e suas validações
    const validations = [
      { field: name.trim(), message: "Nome é obrigatório" },
      { field: age, message: "Idade é obrigatória" },
      { field: city.trim(), message: "Cidade é obrigatória" },
      { field: state, message: "Estado é obrigatório" },
      { field: ngoName, message: "ONG é obrigatória" },
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

      // --- MONTAGEM DO FORM DATA (Mantido igual) ---
      formData.append("name", name);
      formData.append("age", age);
      formData.append("breed", breed || ""); 
      formData.append("characteristics", characteristics);

      const ngoId = ngoOptions.find(ngo => ngo.name === ngoName);
      formData.append("ngoId", ngoId?.id || '');

      formData.append("city", city);
      formData.append("state", state);
      formData.append("observations", ""); 

      // Sexo
      const sexValue = animalSexIndex === 0 ? "M" : "F";
      formData.append("sex", sexValue);

      // Espécie
      let speciesValue: string;
      let otherSpeciesValue = "";
      
      if (specieIndex === 0) speciesValue = "DOG"; 
      else if (specieIndex === 1) speciesValue = "CAT";
      else if (specieIndex === 2) {
        speciesValue = "OTHER";
        otherSpeciesValue = specie;
      } else throw new Error("Espécie deve ser selecionada");
      
      formData.append("species", speciesValue);
      if (otherSpeciesValue) formData.append("otherSpecies", otherSpeciesValue);

      // Porte
      if (speciesValue === "DOG") {
        let sizeValue: string;
        if (sizeIndex === 0) sizeValue = "P";
        else if (sizeIndex === 1) sizeValue = "M";
        else if (sizeIndex === 2) sizeValue = "G";
        else throw new Error("Porte deve ser selecionado para cachorros");
        formData.append("size", sizeValue);
      }

      // Status
      let statusValue: string;
      let forAdoption = false;
      let forTempHome = false;

      if (situationIndex === 0) {
        statusValue = "Available";
        forAdoption = true;
        forTempHome = true;
      } else if (situationIndex === 1) {
        statusValue = "TempHome";
        forAdoption = true;
        forTempHome = false;
      } else if (situationIndex === 2) {
        statusValue = "Adopted";
        forAdoption = false;
        forTempHome = false;
      } else throw new Error("Situação deve ser selecionada");

      formData.append("status", statusValue);
      formData.append("forAdoption", forAdoption.toString());
      formData.append("forTempHome", forTempHome.toString());

      // Arquivos
      images.forEach((image) => {
        if (image instanceof File) formData.append('photos', image);
      });

      // --- LÓGICA DE ENVIO (Com Toast de Sucesso) ---
      
      if (animalData) {
        // === EDIÇÃO ===
        const petId = animalData.id || animalData._id;
        if (!petId) throw new Error("ID do animal não encontrado para edição");

        const existingUrls = images
          .filter((img): img is string => typeof img === 'string')
          .map(url => url);
        
        existingUrls.forEach((url) => formData.append('existingPhotos[]', url));

        await petService.update(petId, formData);
        
        // TOAST SUCESSO EDIÇÃO
        showToast({
            success: true,
            message: "Pet atualizado!",
            description: "As alterações foram salvas com sucesso."
        });

      } else {
        // === CRIAÇÃO ===
        const response = await petService.create(formData);
        const newId = response.data.id || response.data._id;


        // TOAST SUCESSO CRIAÇÃO
        showToast({
            success: true,
            message: "Pet criado!",
            description: "O novo pet foi adicionado ao sistema."
        });

        if(newId){
          handleNavigation(`/petProfile/${newId}`);
        }
      
      }

    } catch (err) {
      // --- TRATAMENTO DE ERRO UNIFICADO ---
      
      let errorMessage = 'Erro de conexão. Tente novamente mais tarde.';

      if (err instanceof AxiosError && err.response) {
        errorMessage = err.response.data?.message || 'Erro ao processar pet.';
      }

      setError(errorMessage);

      // TOAST ERRO
      showToast({
        success: false,
        message: animalData ? "Erro ao atualizar" : "Erro ao criar",
        description: errorMessage
      });
      
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
                  $fontSize="16px"
                  $width="100%"
                  onChange={(e) => setName(e.target.value)}
                  $paddingVertical="4px"
                />

              <LocationInputsContainer>
                <SearchBar
                  title="Idade"
                  required
                  readOnly
                  placeholder="Insira a idade do pet aqui"
                  query={age}
                  setQuery={setAge}
                  fontSize="16px"
                  width="100%"
                  numOptionsShowed={8}
                  options={["Abaixo de 3 meses", "3 a 11 meses", "1 ano", "2 anos", "3 anos", "4 anos", "5 anos", "6 anos e acima"]}
                  resetOption="Qualquer"
                  verticalPadding="4px"
                />

                <BasicInput
                  title="Raça (Opcional)"
                  required={false}
                  placeholder="Insira a raça do pet aqui"
                  value={breed}
                  $fontSize="16px"
                  $width="100%"
                  onChange={(e) => setBreed(e.target.value)}
                  $paddingVertical="4px"
                />

                </LocationInputsContainer>

                
                <LocationInputsContainer>
                  <BasicInput
                    title="Cidade"
                    required
                    placeholder="Cidade do pet"
                    value={city}
                    $fontSize="16px"
                    $width={windowSize > 1180 ? "55%" : "100%"}
                    onChange={(e) => setCity(e.target.value)}
                    $paddingVertical="4px"
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
                    resetOption="Qualquer"
                    width={windowSize > 1180 ? "45%" : "100%"}
                    fontSize="16px"
                    verticalPadding="4px"
                  />
                </LocationInputsContainer>

                {windowSize <= 1280 && windowSize >= 1180 && (
                  <SearchBar
                    title="Selecione a ONG"
                    required
                    placeholder="Insira a ONG responsável aqui"
                    query={ngoName || ''}
                    setQuery={setNgoName}
                    options={ngoOptions.map(ngo => ngo.name)}
                    resetOption="Qualquer"
                    width="100%"
                    fontSize="16px"
                    verticalPadding="4px"
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
                  fontSize="16px"
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
                  fontSize="16px"
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
                  fontSize="16px"
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
                  fontSize="16px"
                  name="situation"
                  toggleIndex={situationIndex}
                  onSelectToggle={setSituationIndex}
                />
              </Row>
            </HalfColumn>

            <HalfColumn $windowSize={windowSize}>
              <VerticalColumn>

                  <LargeInputField
                    title="Características e Observações"
                    required
                    $fontSize="16px"
                    placeholder="Escreva uma breve descrição aqui"
                    $width="100%"
                    $height="86px"
                    value={characteristics}
                    onChange={(e) => setCharacteristics(e.target.value)}
                    error={false}
                    visible={false}
                    isDisabled={false}
                    $inputType="Primário"
                  />

                


                {(windowSize > 1280 || windowSize < 1180) && (
                  <SearchBar
                    title="Selecione a ONG"
                    required
                    placeholder="Insira a ONG responsável aqui"
                    query={ngoName || ''}
                    setQuery={setNgoName}
                    options={ngoOptions.map(ngo => ngo.name)}
                    resetOption="Qualquer"
                    width="100%"
                    fontSize="16px"
                    verticalPadding="4px"
                  />
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <Label $fontSize={"16px"}>
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
