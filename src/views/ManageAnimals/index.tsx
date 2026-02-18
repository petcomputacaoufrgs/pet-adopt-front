import AnimalFilter from "../../components/AnimalFilter";
import BannerComponent from "../../components/BannerComponent";

import dog from "../../assets/ManageAnimalsDog.png";
import { useEffect, useState, useTransition } from "react";
import { formatAge, formatSize, formatString, formatSpecies } from "../../services";
import Footer from "../HomePage/6Footer";
import { CloseButton, ContentContainer, DogCardsContainer, Overlay, PetCardWrapper, SectionAndDogCardsContainer, SectionWithEmptyStateContainer, TopBarContainer, TopBarContent } from "./styles";
import { useToast } from "../../contexts/ToastContext";
import DogCard from "../../components/DogCard";
import DogForCard from "../../assets/HomePageCardDog.png";

import PaginationButtons from "../../components/PaginationButtons";
import PrimarySecondaryButton from "../../components/PrimarySecondaryButton";
import Breadcrumb from "../../components/BreadCrumb";
import SectionWithEmptyState from "../../components/SectionWithEmptyState";

import type { IManageAnimals, ModalAction } from "./types";
import type { Pet } from "../../types/pets";
import ConfirmModal from "../../components/ConfirmModal";
import { useFetcher, useLoaderData, useNavigate } from "react-router-dom";

const ManageAnimals = ({ allowEdit }: IManageAnimals) => {

  const fetcher = useFetcher();


  // Estados dos pets
  const {items: petsData, meta} = useLoaderData() as { items: Pet[]; meta: any };

  const currentPage = meta?.page || 1;
  const petsPerPage = meta?.limit || 12;
  const totalPets = meta?.total || 0;


  const pets = petsData || [];

  const [error, setError] = useState<string>("");

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
    
    // Enviamos o intent e o ID para a action
    fetcher.submit(
      { intent: 'delete', petId: modalAction.petId }, 
      { method: 'post' }
    );
    
    // Note: Não fechamos o modal aqui e nem mostramos o Toast ainda.
    // Esperamos a confirmação da action.
  };


  useEffect(() => {
    // Verificamos se o fetcher terminou de rodar (idle) e se tem dados
    if (fetcher.state === 'idle' && fetcher.data) {
      
      // Acessando o retorno da Action
      if (fetcher.data.success) {
        showToast({ 
          success: true,
          message: "Pet excluído com sucesso!",
          description: "O pet foi removido do sistema."
        });
        setModalAction(null); // Agora sim fechamos o modal
      }  
      
      else if (fetcher.data.error) {
        showToast({ 
          success: false,
          message: "Erro ao excluir pet.",
          description: fetcher.data.error
        });

        setModalAction(null); // Fechamos o modal mesmo em caso de erro
      }
    }
  }, [fetcher.state, fetcher.data]);


  // Layout e paginação
  const [hideAnimalFilter, setHideAnimalFilter] = useState(window.innerWidth < 1240);
  const [showAnimalFilterOnSide, setShowAnimalFilterOnSide] = useState(false);


  const handleDeleteClick = (pet: Pet) => {
    abrirModal("success", pet._id as string);
  };

  const handleEditClick = (pet: Pet) => {
    const petId = pet.id || pet._id;
    if (!petId) return;
    
    handleNavigation(`/editAnimal/${petId}`);
  };

  const getPetId = (pet: Pet, index: number): string => {
    return pet.id || pet._id || `pet-${index}`;
  };


  useEffect(() => {
    document.body.style.overflow = showAnimalFilterOnSide ? "hidden" : "";
  }, [showAnimalFilterOnSide]);


  useEffect(() => {
    const handleResize = () => {
      const isWindowSmall = window.innerWidth < 1240;

      setHideAnimalFilter(isWindowSmall);

      // Fecha o filtro no lado da tela se a janela for redimensionada para modo desktop
      if (!isWindowSmall && showAnimalFilterOnSide) {
        setShowAnimalFilterOnSide(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showAnimalFilterOnSide]);



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
            hasBorder={false}

          />
        </Overlay>
      )}

      <ContentContainer>
        {!hideAnimalFilter && (
          <AnimalFilter
          />
        )}

        <SectionAndDogCardsContainer hideAnimalFilter={hideAnimalFilter}>

        {/* Se tiver erro */}
          {error && (
            <div style={{ padding: '20px', textAlign: 'center', width: '100%' }}>
                <p style={{ color: 'red' }}>Erro: {error}</p>
            </div>
        )}


          {pets.length > 0 && !error && 
            <DogCardsContainer>
              {pets.map((pet, index) => (
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

        {pets.length === 0 && !error &&

        <SectionWithEmptyStateContainer>
          <SectionWithEmptyState 
            title="Pets Disponíveis"
            subtitle={allowEdit? "Visualize e gerencie os pets disponíveis" : "Visualize os pets disponíveis"}
            emptyMessage="Nenhum Pet Encontrado"
            // Só mostra vazio se: NÃO está carregando E NÃO deu erro E lista está vazia
            emptyState={!error && pets.length === 0}
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
        itemsLength={totalPets}
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