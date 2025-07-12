import AnimalFilter from "../../components/AnimalFilter";
import Header from "../../components/Header";
import BannerComponent from "../../components/BannerComponent";

import dog from "../../assets/ManageAnimalsDog.png";
import logo from "../../assets/HorizontalLogo.png";
import { useEffect, useState } from "react";
import Footer from "../HomePage/6Footer";
import { CloseButton, ContentContainer, DogCardsContainer, EditButtonWrapper, FixedFilterButton, Overlay, PetCardWrapper, TopBarContainer, TopBarContent } from "./styles";


import DogCard from "../../components/DogCard";
import DogForCard from "../../assets/HomePageCardDog.png";
import EditButton from "../../components/EditButton";

import DeleteIcon from "../../assets/DeleteIcon.svg"
import PencilIcon from "../../assets/PencilIcon.svg";
import PaginationButtons from "../../components/PaginationButtons";
import PrimarySecondaryButton from "../../components/PrimarySecondaryButton";
import Breadcrumb from "../../components/BreadCrumb";


const ManageAnimals = () => {

  /**
   * Estados que representam os filtros aplicados aos animais.
   * Cada um armazena uma característica diferente usada para filtrar os pets.
   */
  const [selectedSpecie, setSelectedSpecie] = useState<number>(-1);
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedAge, setSelectedAge] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedSituation, setSelectedSituation] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [breed, setBreed] = useState<string>("");
  const [selectedSex, setSelectedSex] = useState<string>("");

  /**
   * Dados temporários dos animais a serem exibidos na tela.
   * Idealmente, no futuro devem ser carregados do backend conforme a página atual.
   */
  const pets = [
    { image_url: DogForCard, sex: "Fêmea", size: "Porte Médio", name: "Mel", race: "Vira-lata", age: "2", location: "São Paulo, SP", to: "/pet1" },
    { image_url: DogForCard, sex: "Macho", size: "Porte Grande", name: "Rex", race: "Pastor Alemão", age: "4", location: "Rio de Janeiro, RJ", to: "/pet2" },
    { image_url: DogForCard, sex: "Fêmea", size: "Porte Pequeno", name: "Luna", race: "Poodle", age: "1", location: "Belo Horizonte, MG", to: "/pet3" },
    { image_url: DogForCard, sex: "Macho", size: "Porte Médio", name: "Thor", race: "Bulldog", age: "3", location: "Curitiba, PR", to: "/pet4" },
    { image_url: DogForCard, sex: "Fêmea", size: "Porte Grande", name: "Bela", race: "Labrador", age: "5", location: "Porto Alegre, RS", to: "/pet5" },
    { image_url: DogForCard, sex: "Macho", size: "Porte Pequeno", name: "Max", race: "Chihuahua", age: "2", location: "Salvador, BA", to: "/pet6" },
    { image_url: DogForCard, sex: "Fêmea", size: "Porte Médio", name: "Nina", race: "Golden Retriever", age: "3", location: "Recife, PE", to: "/pet7" },
    { image_url: DogForCard, sex: "Macho", size: "Porte Grande", name: "Bob", race: "Rottweiler", age: "4", location: "Fortaleza, CE", to: "/pet8" }
  ];


  // Controla a exibição do filtro. Se for `true`, o filtro será ocultado (versões menores da tela) e o botão "filtros" deve ser apertado para mostrá-lo no lado da tela.
  // Se for false ele aparecerá na tela mesmo.
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
  }, [showAnimalFilterOnSide]);

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
    image_url={dog}
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
            image_url={pet.image_url}
            sex={pet.sex}
            size={pet.size}
            name={pet.name}
            race={pet.race}
            age={pet.age}
            location={pet.location}
            to={pet.to}
          />

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
  )
};


export default ManageAnimals;


