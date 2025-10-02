import AnimalFilter from "../../components/AnimalFilter";
import Header from "../../components/Header";
import BannerComponent from "../../components/BannerComponent";

import dog from "../../assets/ManageAnimalsDog.png";
import logo from "../../assets/HorizontalLogo.png";
import { useEffect, useState } from "react";
import { petService, createPetFiltersFromState } from "../../services";
import { formatAge, formatSize, formatString, formatSpecies } from "../../services";
import { AxiosError } from "axios";
import Footer from "../HomePage/6Footer";
import { CloseButton, ContentContainer, DogCardsContainer, EditButtonWrapper, Overlay, PetCardWrapper, TopBarContainer, TopBarContent } from "./styles";

import DogCard from "../../components/DogCard";
import DogForCard from "../../assets/HomePageCardDog.png";
import EditButton from "../../components/EditButton";

import DeleteIcon from "../../assets/DeleteIcon.svg"
import PencilIcon from "../../assets/PencilIcon.svg";
import PaginationButtons from "../../components/PaginationButtons";
import PrimarySecondaryButton from "../../components/PrimarySecondaryButton";
import Breadcrumb from "../../components/BreadCrumb";
import SectionWithEmptyState from "../../components/SectionWithEmptyState";

import { IManageAnimals } from "./types";
import { Pet } from "../../types/pets";

const ManageAnimals = ({ allowEdit }: IManageAnimals) => {
  // Estados dos pets
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Estados dos filtros
  const [selectedSpecie, setSelectedSpecie] = useState<number>(-1);
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedAge, setSelectedAge] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedSituation, setSelectedSituation] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [breed, setBreed] = useState<string>("");
  const [selectedSex, setSelectedSex] = useState<string>("");

  // Layout e paginação
  const [hideAnimalFilter, setHideAnimalFilter] = useState(window.innerWidth < 1240);
  const [showAnimalFilterOnSide, setShowAnimalFilterOnSide] = useState(false);

  /**
   * Função para buscar pets com filtros
   */
  const fetchPets = async () => {
    try {
      setIsLoading(true);
      setError("");
      
      // Criar filtros usando utilitário
      const filters = createPetFiltersFromState({
        selectedSpecie,
        name,
        selectedState,
        city,
        breed,
        selectedSex,
        selectedAge,
        selectedSize,
        selectedSituation
      });
      
      console.log('📡 Buscando pets com filtros:', filters);
      
      const response = await petService.getAll(filters);
      
      // Mapear os dados para garantir que tenham o campo 'id'
      const mappedPets = response.data.map((pet: any) => ({
        ...pet,
        id: pet._id || pet.id,
      }));
      
      setPets(mappedPets);
      
      console.log('✅ Pets carregados:', mappedPets.length);
      
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        setError(err.response.data?.message || 'Erro ao carregar pets.');
      } else {
        setError('Erro de conexão. Tente novamente mais tarde.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Callback para limpar filtros
   */
  const handleClearFilters = () => {
    console.log('🧹 Limpando filtros de pets');
    
    setSelectedSpecie(-1);
    setSelectedState("");
    setSelectedAge("");
    setSelectedSize("");
    setSelectedSituation("");
    setCity("");
    setName("");
    setBreed("");
    setSelectedSex("");
    
    // Buscar todos os pets
    setTimeout(() => {
      fetchPets();
      setCurrentPage(1);
    }, 100);
  };

  /**
   * Função para deletar um pet
   */
  const deletePet = async (petId: string) => {
    try {
      await petService.delete(petId);
      
      // Remover o pet da lista local
      setPets(prevPets => prevPets.filter(pet => (pet.id || pet._id) !== petId));
      
      // Ajustar página atual se necessário
      const updatedPets = pets.filter(pet => (pet.id || pet._id) !== petId);
      if (petsPerPage * currentPage > updatedPets.length && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        setError(err.response.data?.message || 'Erro ao deletar pet.');
      } else {
        setError('Erro de conexão. Tente novamente mais tarde.');
      }
    }
  };

  /**
   * Função para lidar com o clique em deletar
   */
  const handleDeleteClick = (pet: Pet) => {
    const petId = pet.id || pet._id;
    if (!petId) return;
    
    const confirmDelete = window.confirm(
      `Tem certeza que deseja excluir o pet "${pet.name}"? Esta ação não pode ser desfeita.`
    );
    
    if (confirmDelete) {
      deletePet(petId);
    }
  };

  /**
   * Função para lidar com o clique em editar
   */
  const handleEditClick = (pet: Pet) => {
    const petId = pet.id || pet._id;
    if (!petId) return;
    
    console.log("Editando pet:", pet); // Debug
    // Aqui pode navegar para uma página de edição
    // window.location.href = `/editAnimal?id=${petId}`;
  };

  // Função para gerar ID único caso não tenha
  const getPetId = (pet: Pet, index: number): string => {
    return pet.id || pet._id || `pet-${index}`;
  };

  // Função utilitária para definir quantidade de pets por página conforme largura da tela
  function getPetsPerPage(): number {
    if (window.innerWidth < 600) return 2;
    if (window.innerWidth < 900) return 4;
    if (window.innerWidth < 1240) return 6;
    return 8;
  }

  const [petsPerPage, setPetsPerPage] = useState<number>(getPetsPerPage());
  const [currentPage, setCurrentPage] = useState(1);

  // Define os pets que serão mostrados com base na página atual
  const startIndexShowedPets = petsPerPage * (currentPage - 1);
  const showedPets = pets.slice(startIndexShowedPets, startIndexShowedPets + petsPerPage);

  /**
   * Efeito para buscar pets quando o componente for montado
   */
  useEffect(() => {
    fetchPets();
  }, []);

  /**
   * Atualiza o estado do layout e quantidade de pets por página ao redimensionar a tela.
   */
  useEffect(() => {
    const handleResize = () => {
      const isWindowSmall = window.innerWidth < 1240;
      const newPetsPerPage = getPetsPerPage();

      setPetsPerPage(newPetsPerPage);
      setHideAnimalFilter(isWindowSmall);

      // Corrige página atual se necessário
      if (pets.length > 0 && newPetsPerPage * currentPage > pets.length) {
        setCurrentPage(Math.ceil(pets.length / newPetsPerPage));
      }

      // Fecha o filtro no lado da tela se a janela for redimensionada para modo desktop
      if (!isWindowSmall && showAnimalFilterOnSide) {
        setShowAnimalFilterOnSide(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showAnimalFilterOnSide, pets.length, currentPage]);

  /**
   * Efeito que desativa o scroll do `body` quando o filtro estiver ocupando a tela toda.
   */
  useEffect(() => {
    document.body.style.overflow = showAnimalFilterOnSide ? "hidden" : "";
  }, [showAnimalFilterOnSide]);

  /**
   * Opções exibidas no header da aplicação.
   */
  const headerOptions = ["Sobre Nós", "Animais Recém Adicionados", "Dicas", "Fale Conosco"];

  /**
   * Manipula ações do header com base na opção clicada.
   */
  const handleHeaderAction = (selected: string) => {
    switch (selected) {
      case headerOptions[0]:
        console.log("Sobre nós");
        return;
      case headerOptions[1]:
        console.log("Animais Recém Adicionados");
        return;
      case headerOptions[2]:
        console.log("Dicas");
        return;
      case headerOptions[3]:
        console.log("Fale Conosco");
        return;
    }
  };

  return (
    <>
      <Header
        color="#FFF6E8"
        Logo={logo}
      />

      <BannerComponent
        limitWidthForImage="850px"
        color="#F5ABA2"
        title="Encontre seu novo melhor amigo!"
        subTitle="Conheça aqui peludinhos cheios de amor, esperando por um lar para chamar de seu!"
        imageUrl={dog}
      />

      <TopBarContainer>
        <TopBarContent>
          {hideAnimalFilter && (
            <PrimarySecondaryButton
              onClick={() => setShowAnimalFilterOnSide(true)}
              content="Filtros"
              height = {"48px"}
              paddingH= {"26px"}
            />
          )}

          <Breadcrumb
            items={[
              { label: "Home", to: "/" },
              { label: "Gerenciar Animais" },
            ]}
          />
        </TopBarContent>
      </TopBarContainer>

      {showAnimalFilterOnSide && (
        <Overlay>
          <CloseButton onClick={() => setShowAnimalFilterOnSide(false)}>x</CloseButton>

          <AnimalFilter
            selectedSpecie={selectedSpecie}
            setSelectedSpecie={setSelectedSpecie}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            selectedAge={selectedAge}
            setSelectedAge={setSelectedAge}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedSituation={selectedSituation}
            setSelectedSituation={setSelectedSituation}
            city={city}
            setCity={setCity}
            name={name}
            setName={setName}
            breed={breed}
            setBreed={setBreed}
            selectedSex={selectedSex}
            setSelectedSex={setSelectedSex}
            hasBorder={false}
            onSearch={fetchPets}
            onClearFilters={handleClearFilters}
          />
        </Overlay>
      )}

      <ContentContainer>
        {!hideAnimalFilter && (
          <AnimalFilter
            selectedSpecie={selectedSpecie}
            setSelectedSpecie={setSelectedSpecie}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            selectedAge={selectedAge}
            setSelectedAge={setSelectedAge}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedSituation={selectedSituation}
            setSelectedSituation={setSelectedSituation}
            city={city}
            setCity={setCity}
            name={name}
            setName={setName}
            breed={breed}
            setBreed={setBreed}
            selectedSex={selectedSex}
            setSelectedSex={setSelectedSex}
            onSearch={fetchPets}
            onClearFilters={handleClearFilters}
          />
        )}

        <div style={{minWidth: hideAnimalFilter? "60%" : "50%", width: hideAnimalFilter? "80%" : "auto", display: "flex", flexDirection: "column", gap: "36px"}}>

          <SectionWithEmptyState 
            title="Pets Disponíveis"
            subtitle={allowEdit? "Visualize e gerencie os pets disponíveis" : "Visualize os pets disponíveis"}
            emptyMessage="Nenhum Pet Encontrado"
            expandContainer={hideAnimalFilter}
            emptyState={showedPets.length === 0}
            buttonText="+ Cadastrar Pet"
            onButtonClick={() => {
              console.log("Navegando para criar pet");
              // window.location.href = "/createAnimal";
            }}
          />
         
          {isLoading && <p>Carregando pets...</p>}
          {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
          
          {!isLoading && !error && showedPets.length > 0 && 
            <DogCardsContainer>
              {showedPets.map((pet, index) => (
                <PetCardWrapper key={getPetId(pet, index)}>
                  <DogCard
                    imageUrl={DogForCard}
                    sex={formatString(pet.sex)}
                    size={formatString(formatSize(pet.size ?? ""))}
                    name={formatString(pet.name)}
                    race={formatString(formatSpecies(pet.species))}
                    age={formatString(formatAge(pet.age))}
                    location={formatString(`${pet.city}, ${pet.state}`)}
                    to={`/pet/${getPetId(pet, index)}`}
                  />

                  {allowEdit &&
                    <EditButtonWrapper>
                      <EditButton
                        width="34px"
                        height="34px"
                        options={[
                          { 
                            label: "Editar", 
                            onClick: () => handleEditClick(pet), 
                            iconSrc: PencilIcon 
                          },
                          { 
                            label: "Excluir", 
                            onClick: () => handleDeleteClick(pet), 
                            iconSrc: DeleteIcon 
                          },
                        ]}
                      />
                    </EditButtonWrapper>
                  }
                </PetCardWrapper>
              ))}
            </DogCardsContainer>
          }
        </div>
      </ContentContainer>

      <PaginationButtons
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsLength={pets.length}
        itemsPerPage={petsPerPage}
        buttonHeight="30px"
        buttonWidth="30px"
        containerHeight="160px"
      />

      <Footer />
    </>
  );
};

export default ManageAnimals;


