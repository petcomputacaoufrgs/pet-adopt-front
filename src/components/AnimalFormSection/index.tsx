import { useEffect, useState, useTransition, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Controller } from "react-hook-form";
import { AxiosError } from "axios";

import {
  AnimalFormContainer, FormContainer, InfoContent, InputsContainer,
  LocationInputsContainer, Label, RequiredAsterisk, InputSubtitle,
  ImageSlotsContainer, Wrapper, VerticalColumn, HalfColumn, Row, SubmitContainer
} from "./styled";

import BasicInput from "../BasicInput";
import LargeInputField from "../LargeInput";
import RadioGroup from "../RadioGroup";
import SearchBar from "../SearchBar";
import ImageSlotsGroup from "../ImageSlotsGroup";
import PrimarySecondaryButton from "../PrimarySecondaryButton";
import AnimalFormPhoto from "../../assets/AnimalFormPhoto.png";

import { petService, ngoService } from "../../services/index";
import { useToast } from "../../contexts/ToastContext";
import { AnimalFormSchema } from "../../hooks/useAnimalForm";

const MemoizedImageSlotsGroup = memo(ImageSlotsGroup);

// Mapas auxiliares para envio (Submit)
const ageMapBackend: Record<string, string> = {
  "Abaixo de 3 meses": "newborn",
  "3 a 11 meses": "baby",
  "1 ano": "1y", "2 anos": "2y", "3 anos": "3y", "4 anos": "4y", "5 anos": "5y", "6 anos e acima": "6y+"
};

export default function AnimalFormSection({
  methods,
  windowSize,
  animalData,
  user
}: any) {
  
  const { control, handleSubmit, setValue, watch, formState: { errors } } = methods;
  
  const [isCreatingPET, setIsCreatingPET] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>(""); // Estado para erro de envio (API)
  const [ngoOptions, setNgoOptions] = useState<any[]>([]);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const handleNavigation = (path: string) => {
    startTransition(() => {
      navigate(path);
    });
  };

  // Observar valores
  const currentCity = watch("city");
  const currentState = watch("state");
  const currentNgoStrId = watch("ngoStrId");

  // Fetch NGOs
  useEffect(() => {
    const fetchNgoOptions = async () => {
      try {
        const response = await ngoService.getApproved();
        const mapped = response.data.map((ngo: any) => ({
            id: ngo._id || ngo.id,
            name: ngo.name,
            email: ngo.email,
            city: ngo.city,
            state: ngo.state
        }));
        setNgoOptions(mapped);
      } catch (error) { console.error(error); }
    };
    fetchNgoOptions();
  }, []);

  // Lógica de Preenchimento Automático p/ Admin de ONG
  useEffect(() => {
    if (ngoOptions.length > 0 && user && (user.role === 'NGO_ADMIN' || user.role === "NGO_MEMBER") && user.ngoId) {
      const userNgo = ngoOptions.find(ngo => ngo.id === user.ngoId);
      if (userNgo) {
        const formatted = `${userNgo.name} - ${userNgo.email}`;
        if (currentNgoStrId !== formatted) {
           setValue("ngoStrId", formatted);
        }
        if (!currentCity && !currentState) {
           setValue("city", userNgo.city || "");
           setValue("state", userNgo.state || "");
        }
      }
    }
  }, [user, ngoOptions, setValue, currentNgoStrId, currentCity, currentState]);


  const onSubmit = async (data: AnimalFormSchema) => {
    try {
      setIsCreatingPET(true);
      setSubmitError(""); // Limpa erro anterior

      const formData = new FormData();

      // 1. Campos Simples
      formData.append("name", data.name);
      formData.append("age", ageMapBackend[data.age] || data.age);
      formData.append("breed", data.breed || "");
      formData.append("characteristics", data.characteristics);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("observations", ""); 

      // 2. Resolver ONG ID
      const selectedNgo = ngoOptions.find(n => `${n.name} - ${n.email}` === data.ngoStrId);
      if (!selectedNgo) throw new Error("ONG inválida selecionada");
      formData.append("ngoId", selectedNgo.id);

      // 3. Mapeamentos de Índices
      formData.append("sex", data.animalSexIndex === 0 ? "M" : "F");
      
      let speciesValue = "";
      if (data.specieIndex === 0) speciesValue = "dog";
      else if (data.specieIndex === 1) speciesValue = "cat";
      else {
          speciesValue = "other";
          formData.append("otherSpecies", data.specieOther || data.specieIndex.toString());
      }
      formData.append("species", speciesValue);

      if (speciesValue === "dog") {
         const sizes = ["P", "M", "G"];
         formData.append("size", sizes[data.sizeIndex] || "P");
      }

      // 4. Status
      const statusOptions = [
          { val: "Available", adopt: true, temp: true },
          { val: "TempHome", adopt: true, temp: false },
          { val: "Adopted", adopt: false, temp: false }
      ];
      const statusData = statusOptions[data.situationIndex];
      formData.append("status", statusData?.val || "Available");
      formData.append("forAdoption", statusData?.adopt.toString() || "true");
      formData.append("forTempHome", statusData?.temp.toString() || "true");

      // 5. Imagens e Ordem
      const validImages = data.images.filter(img => img !== null);
      const photoOrder = validImages.map(img => {
        if (typeof img === 'string') return img;
        if (img instanceof File) return "NEW_FILE_MARKER";
        return null;
      });
      formData.append('photoOrder', JSON.stringify(photoOrder));

      validImages.forEach((img) => {
        if (img instanceof File) formData.append('photos', img);
      });

      // 6. Chamada API
      if (animalData) {
         const petId = animalData.id || animalData._id;
         await petService.update(petId, formData);
         showToast({ success: true, message: "Pet atualizado!", description: "As alterações foram salvas com sucesso." });
         handleNavigation(`/petProfile/${petId}`);
      } else {
         const res = await petService.create(formData);
         showToast({ success: true, message: "Pet criado!", description: "O novo pet foi adicionado ao sistema." });
         if (res.data?.id || res.data?._id) handleNavigation(`/petProfile/${res.data.id || res.data._id}`);
      }

    } catch (err) {
      const msg = err instanceof AxiosError ? err.response?.data?.message : "Erro desconhecido";
      setSubmitError(msg); // Define a mensagem na caixa vermelha
      showToast({ success: false, message: "Erro", description: msg });
    } finally {
      setIsCreatingPET(false);
    }
  };

  const isNgoAdmin = user?.role === 'NGO_ADMIN' || user?.role === "NGO_MEMBER";
  const hasErrors = Object.keys(errors).length > 0;

  // Renderizador do SearchBar da ONG para evitar duplicação de código
  const renderNgoSearchBar = () => (
    <Controller 
        name="ngoStrId"
        control={control}
        rules={{ required: "ONG obrigatória" }}
        render={({ field }) => (
        <SearchBar
            query={field.value}
            setQuery={field.onChange}
            title="Selecione a ONG"
            required
            options={ngoOptions.map(ngo => `${ngo.name} - ${ngo.email}`)}
            readOnly={isNgoAdmin}
            disabled={isNgoAdmin}
            width="100%"
            fontSize="16px"
            verticalPadding="4px"
            placeholder="Insira a ONG responsável aqui"
        />
        )}
    />
  );


  return (
    <Wrapper $windowSize={windowSize} AnimalFormPhoto={AnimalFormPhoto}>
      <AnimalFormContainer>
        <FormContainer>
          <InfoContent>
            <h1>Cadastro do Pet</h1>
            <p>Preencha os campos abaixo para cadastrar o pet</p>
          </InfoContent>

          <InputsContainer>
            {/* --- COLUNA ESQUERDA --- */}
            <HalfColumn $windowSize={windowSize}>
              <VerticalColumn>
                
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Nome é obrigatório" }}
                  render={({ field }) => (
                    <BasicInput
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                      title="Nome"
                      required
                      placeholder="Insira o nome do pet aqui"
                      $width="100%"
                      $fontSize="16px"
                      $paddingVertical="4px"
                    />
                  )}
                />

                <LocationInputsContainer>
                   <Controller
                      name="age"
                      control={control}
                      rules={{ required: "Idade é obrigatória" }}
                      render={({ field }) => (
                        <SearchBar
                          query={field.value}
                          setQuery={field.onChange}
                          title="Idade"
                          required
                          readOnly
                          width="100%"
                          options={["Abaixo de 3 meses", "3 a 11 meses", "1 ano", "2 anos", "3 anos", "4 anos", "5 anos", "6 anos e acima"]}
                          resetOption="Qualquer"
                          fontSize="16px"
                          verticalPadding="4px"
                          numOptionsShowed={9}
                          placeholder="Insira a idade do pet aqui"
                        />
                      )}
                   />
                   
                   <Controller
                      name="breed"
                      control={control}
                      render={({ field }) => (
                         <BasicInput 
                            {...field} 
                            onChange={(e) => field.onChange(e.target.value)}
                            title="Raça (Opcional)" 
                            $width="100%" 
                            placeholder="Insira a raça do pet aqui" 
                            $fontSize="16px" 
                            $paddingVertical="4px"
                            required={false}
                         />
                      )}
                   />
                </LocationInputsContainer>

                <LocationInputsContainer>
                    <Controller
                      name="city"
                      control={control}
                      rules={{ required: "Cidade obrigatória" }}
                      render={({ field }) => (
                        <BasicInput 
                            value={field.value} 
                            onChange={(e) => field.onChange(e.target.value)} 
                            title="Cidade" 
                            required 
                            $width={windowSize > 1180 ? "50%" : "100%"}
                            placeholder="Cidade do pet"
                            $fontSize="16px"
                            $paddingVertical="4px" 
                        />
                      )}
                    />
                    
                    <Controller
                      name="state"
                      control={control}
                      rules={{ required: "Estado obrigatório" }}
                      render={({ field }) => (
                        <SearchBar
                          query={field.value}
                          setQuery={field.onChange}
                          title="Estado"
                          required
                          options={["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]}
                          resetOption="Qualquer"
                          width={windowSize > 1180 ? "50%" : "100%"}
                          fontSize="16px"
                          verticalPadding="4px"
                          placeholder="Estado do pet"
                          listMaxHeight="200px" 
                        />
                      )}
                    />
                </LocationInputsContainer>

                {/* ONG NA ESQUERDA (Desktop Médio) */}
                {(windowSize <= 1280 && windowSize >= 1180) && renderNgoSearchBar()}

              </VerticalColumn>

              <Row>
                <Controller
                  name="specieIndex"
                  control={control}
                  rules={{ validate: (v) => v >= 0 || "Selecione a espécie" }}
                  render={({ field }) => (
                    <RadioGroup
                       title="Espécie"
                       required
                       options={[{ label: "Cachorro", value: "dog" }, { label: "Gato", value: "cat" }, { label: "Outro", value: "other" }]}
                       toggleIndex={field.value}
                       onSelectToggle={(idx) => field.onChange(idx)}
                       onChange={() => {}} 
                       name="specie"
                       userFillOptionLabel="Outro"
                       fontSize="16px"
                    />
                  )}
                />

                <Controller
                    name="animalSexIndex"
                    control={control}
                    rules={{ validate: (v) => v >= 0 || "Selecione o sexo" }}
                    render={({ field }) => (
                        <RadioGroup
                            title="Sexo"
                            required
                            options={[{ label: "Macho", value: "M" }, { label: "Fêmea", value: "F" }]}
                            toggleIndex={field.value}
                            onSelectToggle={field.onChange}
                            onChange={() => {}}
                            name="animalSex"
                            fontSize="16px"
                        />
                    )}
                />
              </Row>
              
              <Row>
                <Controller
                    name="sizeIndex"
                    control={control}
                    rules={{ validate: (v) => v >= 0 || "Selecione o porte" }}
                    render={({ field }) => (
                        <RadioGroup
                            title="Porte"
                            required
                            options={[{ label: "Pequeno", value: "P" }, { label: "Médio", value: "M" }, { label: "Grande", value: "G" }]}
                            fontSize="16px"
                            name="size"
                            toggleIndex={field.value}
                            onSelectToggle={field.onChange}
                        />
                    )}
                />

                <Controller
                    name="situationIndex"
                    control={control}
                    rules={{ validate: (v) => v >= 0 || "Selecione a situação" }}
                    render={({ field }) => (
                        <RadioGroup
                            title="Situação"
                            required
                            options={[{ label: "Disponível", value: "available" }, { label: "Lar Temporário", value: "temporary home" }, { label: "Adotado", value: "adopted" }]}
                            fontSize="16px"
                            name="situation"
                            toggleIndex={field.value}
                            onSelectToggle={field.onChange}
                        />
                    )}
                />
              </Row>
            </HalfColumn>

            {/* --- COLUNA DIREITA --- */}
            <HalfColumn $windowSize={windowSize}>
               <VerticalColumn>
                  <Controller
                     name="characteristics"
                     control={control}
                     rules={{ required: "Características e Observações são obrigatórias" }}
                     render={({ field }) => (
                        <LargeInputField
                           value={field.value}
                           onChange={(e: any) => field.onChange(e.target.value)}
                           title="Características e Observações"
                           required
                           $width="100%"
                           $height="86px"
                           $inputType="Primário"
                           placeholder="Escreva uma breve descrição aqui"
                           $fontSize="16px"
                           error={false}
                           visible={false}
                           isDisabled={false}
                        />
                     )}
                  />

                  {/* ONG NA DIREITA (Desktop Grande ou Mobile) */}
                  {(windowSize > 1280 || windowSize < 1180) && renderNgoSearchBar()}

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                     <Label $fontSize={"16px"}>Fotos do Pet <RequiredAsterisk>*</RequiredAsterisk></Label>
                     <InputSubtitle>Adicione no mínimo 1 foto e no máximo 10 fotos</InputSubtitle>
                  </div>

                  <ImageSlotsContainer>
                     <Controller
                        name="images"
                        control={control}
                        rules={{ 
                            validate: (imgs) => {
                                const count = imgs.filter((i: any) => i !== null).length;
                                if(count < 1) return "Adicione pelo menos 1 foto do pet";
                                if(count > 10) return "Máximo de 10 fotos permitidas";
                                return true;
                            }
                        }}
                        render={({ field }) => (
                           <MemoizedImageSlotsGroup 
                              images={field.value}
                              setImages={(newImages: any) => field.onChange(newImages)}
                           />
                        )}
                     />
                  </ImageSlotsContainer>

               </VerticalColumn>
            </HalfColumn>
          </InputsContainer>

          {(hasErrors || submitError) && (
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
              
              {Object.values(errors).map((error: any, index) => (
                <div key={index}>{error.message}</div>
              ))}
            </div>
          )}

          <SubmitContainer>
             <PrimarySecondaryButton
                content={
                    isCreatingPET 
                      ? (animalData ? "Editando..." : "Criando...") 
                      : (animalData ? "Editar Cadastro do Pet" : "Criar Cadastro do Pet")
                  }
                onClick={handleSubmit(onSubmit)}
                isDisabled={isCreatingPET}
                paddingH="10px"
                paddingV="10px"
             />
          </SubmitContainer>
        </FormContainer>
      </AnimalFormContainer>
    </Wrapper>
  );
}