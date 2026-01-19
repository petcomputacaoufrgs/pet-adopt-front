import AnimalFilter from "../../components/AnimalFilter";
import Header from "../../components/Header";
import BannerComponent from "../../components/BannerComponent";

import dog from "../../assets/ManageAnimalsDog.png";
import logo from "../../assets/HorizontalLogo.png";
import { useEffect, useRef, useState, useTransition } from "react";
import { petService, createPetFiltersFromState } from "../../services";
import { formatAge, formatSize, formatString, formatSpecies } from "../../services";
import { AxiosError } from "axios";
import Footer from "../HomePage/6Footer";
import { CloseButton, ContentContainer, DogCardsContainer, Overlay, PetCardWrapper, SectionAndDogCardsContainer, SectionWithEmptyStateContainer, TopBarContainer, TopBarContent } from "./styles";
import { useToast } from "../../contexts/ToastContext";
import DogCard from "../../components/DogCard";
import DogForCard from "../../assets/HomePageCardDog.png";

import PaginationButtons from "../../components/PaginationButtons";
import PrimarySecondaryButton from "../../components/PrimarySecondaryButton";
import Breadcrumb from "../../components/BreadCrumb";
import SectionWithEmptyState from "../../components/SectionWithEmptyState";

import { IManageAnimals, ModalAction } from "./types";
import { Pet } from "../../types/pets";
import { useAuth } from "../../hooks/useAuth";
import ConfirmModal from "../../components/ConfirmModal";
import { useNavigate } from "react-router-dom";
const ManageAnimals = ({ allowEdit }: IManageAnimals) => {

  const CACHE_KEY = '@Meau:PetsCache';


  // Estados dos pets
  // Inicialização "Lazy" com LocalStorage
  // Isso roda antes do primeiro render visual, garantindo que se tiver cache, ele já aparece.
  const [pets, setPets] = useState<Pet[]>(() => {
    try {
      const saved = localStorage.getItem(CACHE_KEY);
      console.log("Carregando pets do cache:");
      console.log(saved);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.log("Erro ao carregar pets do cache:", error);
      console.log("Nenhum cache encontrado ou erro ao carregar.");
      return [];
    }
  });



  const [isLoadingPets, setIsLoadingPets] = useState<boolean>(true);
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

  const { showToast } = useToast(); 

  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  

  const handleNavigation = (to: string) => {
    startTransition(() => {
      navigate(to);
    });
  }
    
  // Modais e toasts
  const [modalAction, setModalAction] = useState<ModalAction>(null);

  // Abrir modal (e fechar toast se estiver aberto)
  const abrirModal = (tipo: "success", petId: string) => {
    setModalAction({ tipo, petId });
  };

  // Confirmar ação
  const handleConfirm = () => {
    if (!modalAction) return;
    
    deletePet(modalAction.petId)
      .then(
        () => {        
        showToast({ 
            success: true,
            message: "Pet excluído com sucesso!",
            description: "O pet foi removido do sistema."
        });
      },
       (errorMessage) => {
        showToast({ 
            success: false,
            message: "Erro ao excluir pet.",
            description: errorMessage || "Ocorreu um erro ao tentar excluir o pet."
        });
       });

    setModalAction(null);
  };

  // Layout e paginação
  const [hideAnimalFilter, setHideAnimalFilter] = useState(window.innerWidth < 1240);
  const [showAnimalFilterOnSide, setShowAnimalFilterOnSide] = useState(false);

  /**
   * Função para buscar pets com filtros
   */
  const fetchPets = async () => {
    try {
      if (pets.length === 0) setIsLoadingPets(true);
      setError("");
      
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
            
      const response = await petService.getAll(filters);
      

      const mappedPets = response.data.map((pet: any) => ({
        ...pet,
        id: pet._id || pet.id,
      }));
      
      
      const isDefaultView = (selectedSpecie === -1) && !selectedState && !city && !name; // adicione os outros filtros aqui

      console.log("isDefaultView:", isDefaultView);
      if(isDefaultView){
        console.log("Salvando pets no cache:");
        try{
          localStorage.setItem(CACHE_KEY, JSON.stringify(mappedPets.slice(0, 12))); // Só o suficiente pra encher a primeira página
          console.log("Pets salvos no cache:");
          console.log(mappedPets.slice(0, 12));
        } catch (error){
          console.log("Erro ao salvar pets no cache:", error);
          // Falha ao salvar no localStorage, pode ignorar ou logar se quiser
        }
      }
      setPets(mappedPets);
            
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        setError(err.response.data?.message || 'Erro ao carregar pets.');
      } else {
        setError('Erro de conexão. Tente novamente mais tarde.');
      }
    } finally {
      setIsLoadingPets(false);
    }
  };

  const handleClearFilters = () => {
    setSelectedSpecie(-1);
    setSelectedState("");
    setSelectedAge("");
    setSelectedSize("");
    setSelectedSituation("");
    setCity("");
    setName("");
    setBreed("");
    setSelectedSex("");
    
    setTimeout(() => {
      fetchPets();
      setCurrentPage(1);
    }, 100);
  };

  const deletePet = async (petId: string) => {
    try {
      await petService.delete(petId);
      
      setPets(prevPets => prevPets.filter(pet => (pet.id || pet._id) !== petId));
      
      const updatedPets = pets.filter(pet => (pet.id || pet._id) !== petId);
      if (petsPerPage * currentPage > updatedPets.length && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      
    } catch (err) {
      let errorMessage = 'Erro de conexão. Tente novamente mais tarde.';
      if (err instanceof AxiosError && err.response) {
        errorMessage = err.response.data?.message || 'Erro ao deletar pet.';
      } 

      setError(errorMessage);

      throw errorMessage;
    }
  };

  const handleDeleteClick = (pet: Pet) => {
    abrirModal("success", pet.id as string);
  };

  const handleEditClick = (pet: Pet) => {
    const petId = pet.id || pet._id;
    if (!petId) return;
    
    handleNavigation(`/editAnimal/${petId}`);
  };

  const getPetId = (pet: Pet, index: number): string => {
    return pet.id || pet._id || `pet-${index}`;
  };

  function getPetsPerPage(): number {
    if (window.innerWidth < 600) return 3;
    if (window.innerWidth < 900) return 4;
    if (window.innerWidth < 1612) return 6;
    return 9;
  }

  const [petsPerPage, setPetsPerPage] = useState<number>(getPetsPerPage());
  const [currentPage, setCurrentPage] = useState(1);

  const startIndexShowedPets = petsPerPage * (currentPage - 1);
  const showedPets = pets.slice(startIndexShowedPets, startIndexShowedPets + petsPerPage);

  useEffect(() => {
    fetchPets();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const isWindowSmall = window.innerWidth < 1240;
      const newPetsPerPage = getPetsPerPage();

      setPetsPerPage(newPetsPerPage);
      setHideAnimalFilter(isWindowSmall);

      if (pets.length > 0 && newPetsPerPage * currentPage > pets.length) {
        setCurrentPage(Math.ceil(pets.length / newPetsPerPage));
      }

      if (!isWindowSmall && showAnimalFilterOnSide) {
        setShowAnimalFilterOnSide(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showAnimalFilterOnSide, pets.length, currentPage]);

  useEffect(() => {
    document.body.style.overflow = showAnimalFilterOnSide ? "hidden" : "";
  }, [showAnimalFilterOnSide]);

  const { isLoading, user, isLoggedIn} = useAuth();

  if(isLoading) return null;

  return (
    <>
      <ConfirmModal
          isOpen={modalAction !== null}
          title= "Tem certeza que deseja excluir este pet?"
          message="Esta ação não poderá ser desfeita. O pet será removido permanentemente do sistema."
          confirmLabel="Sim, excluir"
          cancelLabel="Cancelar"
          onConfirm={handleConfirm}
          onClose={() => setModalAction(null)}
      />

      <Header
        color="#FFF6E8"
        Logo={logo}
        isLoggedIn={isLoggedIn}
        user={user}
      />

      <BannerComponent
        limitWidthForImage="850px"
        color="#F5ABA2"
        title="Encontre seu novo melhor amigo!"
        subTitle="Conheça aqui peludinhos cheios de amor, esperando por um lar para chamar de seu!"
        imageUrl={dog}
      />

      <TopBarContainer id="top-bar">
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
            items={allowEdit? [
              { label: "Home", to: "/" },
              { label: "Gerenciar Animais" },
            ] : [
              { label: "Home", to: "/" },
              { label: "Animais" },
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

        <SectionAndDogCardsContainer hideAnimalFilter={hideAnimalFilter}>


        {/* Se for o PRIMEIRO carregamento (sem dados antigos), mostra Skeleton ou Loading */}
          {isLoadingPets && pets.length === 0 && (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <p>Carregando dados...</p> 
                {/* O ideal aqui seria usar aquele Skeleton que conversamos antes */}
            </div>
          )}

        {/* Se tiver erro */}
          {error && (
            <div style={{ padding: '20px', textAlign: 'center', width: '100%' }}>
                <p style={{ color: 'red' }}>Erro: {error}</p>
            </div>
        )}


          {pets.length > 0 && !error && 
            <DogCardsContainer>
              {showedPets.map((pet, index) => (
                <PetCardWrapper key={getPetId(pet, index)}>
                  <DogCard
                    imageUrl={pet.photos && pet.photos.length > 0 ? pet.photos[0] : DogForCard}
                    sex={formatString(pet.sex)}
                    size={formatString(formatSize(pet.size ?? ""))}
                    name={formatString(pet.name)}
                    race={formatString(formatSpecies(pet.species))}
                    breed={formatString(pet.breed || "")}
                    age={formatString(formatAge(pet.age))}
                    location={formatString(`${pet.city}, ${pet.state}`)}
                    id={getPetId(pet, index)}
                    onDelete={allowEdit? () => handleDeleteClick(pet) : undefined}
                    onEdit={allowEdit? () => handleEditClick(pet) : undefined}
                  />
                </PetCardWrapper>
              ))}
            </DogCardsContainer>
          }

        {!isLoadingPets && pets.length === 0 && !error &&

        <SectionWithEmptyStateContainer>
          <SectionWithEmptyState 
            title="Pets Disponíveis"
            subtitle={allowEdit? "Visualize e gerencie os pets disponíveis" : "Visualize os pets disponíveis"}
            emptyMessage="Nenhum Pet Encontrado"
            expandContainer={hideAnimalFilter}
            // Só mostra vazio se: NÃO está carregando E NÃO deu erro E lista está vazia
            emptyState={!isLoadingPets && !error && pets.length === 0}
            buttonText= {allowEdit? "+ Cadastrar Pet" : undefined}
            onButtonClick={() => {
               handleNavigation("/createAnimal"); 
            }}
          />
        </SectionWithEmptyStateContainer>
        }
          

          

          

        </SectionAndDogCardsContainer>
      </ContentContainer>

      <PaginationButtons
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsLength={pets.length}
        itemsPerPage={petsPerPage}
        buttonHeight="35px"
        buttonWidth="35px"
        containerHeight="160px"
        scrollTo="top-bar"
      />

      <Footer />
    </>
  );
};

export default ManageAnimals;