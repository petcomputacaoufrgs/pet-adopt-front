import AnimalFilter from "../../components/AnimalFilter";
import Header from "../../components/Header";
import BannerComponent from "../../components/BannerComponent";

import dog from "../../assets/ManageAnimalsDog.png";
import logo from "../../assets/HorizontalLogo.png";
import { useEffect, useState } from "react";
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
import { IManageAnimals } from "./types";
import { Pet } from "../../types/pets";
import { petService } from "../../services";
import { AxiosError } from "axios";


const ManageAnimals = ({ allowEdit }: IManageAnimals) => {
  // --- Estados e lógica do ManagePets ---
  const [pets, setPets] = useState<Pet[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Estados que representam os filtros aplicados aos animais.
   * Cada um armazena uma característica diferente usada para filtrar os pets.
   */
  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      setIsLoading(true);
      const response = await petService.getAll();
      setPets(response.data);
      console.log(response.data[0].photos);
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError && error.response) {
        setErrorMessage(error.response.data.message || 'Erro ao carregar Pets.');
      } else {
        setErrorMessage('Erro de conexão. Tente novamente mais tarde.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // --- Estados dos filtros ---
  const [selectedSpecie, setSelectedSpecie] = useState<number>(-1);
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedAge, setSelectedAge] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedSituation, setSelectedSituation] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [breed, setBreed] = useState<string>("");
  const [selectedSex, setSelectedSex] = useState<string>("");

  // --- Layout e paginação ---
  const [hideAnimalFilter, setHideAnimalFilter] = useState(window.innerWidth < 1240);


  // Define quando o filtro deve se mostrado no lado da tela (modo mobile ao clicar no botão "filtros").
  const [showAnimalFilterOnSide, setShowAnimalFilterOnSide] = useState(false);

  /**
   * Retorna a quantidade de pets que devem ser mostrados por página, de acordo com a largura atual da janela.
   */
  const getPetsPerPage = () => {
    if (window.innerWidth >= 1612) return 9;
    else if (window.innerWidth >= 800) return 6;
    else return 5;
  };

  const [petsPerPage, setPetsPerPage] = useState<number>(getPetsPerPage());
  const [currentPage, setCurrentPage] = useState(1);

  // Define os pets que serão mostrados com base na página atual
  const startIndexShowedPets = petsPerPage * (currentPage - 1);
  const showedPets = pets.slice(startIndexShowedPets, startIndexShowedPets + petsPerPage);

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
      if (newPetsPerPage * currentPage > pets.length) {
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
   * @param selected Opção clicada pelo usuário
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

  // Função utilitária para formatar strings
  const formatString = (str?: any) => {
    if (str === undefined || str === null) return "";
    const clean = String(str).replace(/['"]/g, "").trim();
    return clean.charAt(0).toUpperCase() + clean.slice(1);
  };

  // --- JSX do componente ---
  return (
    <>
      <Header
        options={headerOptions}
        optionsToAction={handleHeaderAction}
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
          />
        )}

        <DogCardsContainer>
          {showedPets.map((pet, index) => (
            <PetCardWrapper key={index}>
              <DogCard
                imageUrl={ DogForCard}
                sex={formatString(pet.sex)}
                size={formatString(pet.size) ||""}
                name={formatString(pet.name)}
                race={formatString(pet.species)}
                age={formatString(pet.age)}
                location={formatString(`${pet.city}, ${pet.state}`)}
                to={"/pet1}"}
              />

              {allowEdit &&
                <EditButtonWrapper>
                  <EditButton
                    width="34px"
                    height="34px"
                    options={[
                      { label: "Editar", onClick: () => {}, iconSrc: PencilIcon },
                      { label: "Excluir", onClick: () => {}, iconSrc: DeleteIcon },
                    ]}
                  />
                </EditButtonWrapper>
              }
            </PetCardWrapper>
          ))}
        </DogCardsContainer>
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


