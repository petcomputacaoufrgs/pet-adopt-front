import AnimalFilter from "../../components/AnimalFilter";
import Header from "../../components/Header";
import BannerComponent from "../../components/BannerComponent";

import dog from "../../assets/ManageAnimalsDog.png";
import logo from "../../assets/HorizontalLogo.png";
import { useEffect, useState } from "react";
import Footer from "../HomePage/6Footer";
import { CloseButton, ContentContainer, DogCardsContainer, FixedFilterButton, Overlay } from "./styles";


import DogCard from "../../components/DogCard";
import DogForCard from "../../assets/HomePageCardDog.png";
import EditButton from "../../components/EditButton";

import DeleteIcon from "../../assets/DeleteIcon.svg"
import PencilIcon from "../../assets/PencilIcon.svg";
import PaginationButtons from "../../components/PaginationButtons";
import PrimarySecondaryButton from "../../components/PrimarySecondaryButton";
import Breadcrumb from "../../components/BreadCrumb";


const ManageAnimals = () => {
  const [selectedSpecie, setSelectedSpecie] = useState<number>(-1);
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedAge, setSelectedAge] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedSituation, setSelectedSituation] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [breed, setBreed] = useState<string>("");
  const [selectedSex, setSelectedSex] = useState<string>("");


    // Array com 8 objetos pet
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


  const [hideAnimalFilter, setHideAnimalFilter] = useState(window.innerWidth < 1240);
  const [showAnimalFilterFullScreen, setShowAnimalFilterFullScreen] = useState(false);


  useEffect(() => {
    const handleResize = () => {

      const isWindowSmall = window.innerWidth < 1240; 
      
      setHideAnimalFilter(isWindowSmall);

      if(!isWindowSmall && showAnimalFilterFullScreen)
        setShowAnimalFilterFullScreen(false);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  })


  useEffect(() => {
  if (showAnimalFilterFullScreen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}, [showAnimalFilterFullScreen]);



  const headerOptions = ["Sobre Nós", "Animais Recém Adicionados", "Dicas", "Fale Conosco"]


  const handleHeaderAction = (selected: string) => {
  } 



  return (
    <>

    <Header options={headerOptions} optionsToAction={handleHeaderAction} color="#FFF6E8" Logo={logo} />
    <BannerComponent limitWidthForImage="850px" color="#F5ABA2" title="Encontre seu novo melhor amigo!" subTitle="Conheça aqui peludinhos cheios de amor, esperando por um lar para chamar de seu!" image_url={dog}  />
    
    
    <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "160px"}}>
      <div style={{display: "flex", width: "80%", gap: "20px", alignItems: "center", justifyContent: "center"}}>
    {hideAnimalFilter && <PrimarySecondaryButton onClick={() => setShowAnimalFilterFullScreen(true)} content={"Filtros"}></PrimarySecondaryButton>}
    <Breadcrumb items={[{label: "Home", to:"/"}, {label: "Gerenciar Animais"}]}></Breadcrumb>

      </div>
    </div>

        {showAnimalFilterFullScreen && 
    
        <Overlay>

        <CloseButton onClick={() => setShowAnimalFilterFullScreen(false)}>x</CloseButton>


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
    
    }


    <ContentContainer>
    
      {!hideAnimalFilter  && 
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
      }

      <DogCardsContainer>

        {pets.map((pet, index) => {
          return (
            <div style={{position: "relative"}}>
            <DogCard 
              key = {index}
              image_url = {pets[index].image_url}
              sex = {pets[index].sex}
              size = {pets[index].size}
              name = {pets[index].name}
              race = {pets[index].race}
              age = {pets[index].age}
              location = {pets[index].location}
              to = {pets[index].to}
              />

              <div style={{position: "absolute", top: "24px", left: "40px"}}> {/* ORIGINAL COM LEFT 310px */}
                  <EditButton width="34px" height="34px" options = {[{label: "Editar", onClick: () => {}, iconSrc: PencilIcon}, {label: "Excluir", onClick: () => {}, iconSrc: DeleteIcon}]}/> 
              </div>
              
              
            </div>
          )
        })}

      </DogCardsContainer>
      

    </ContentContainer>


      <PaginationButtons buttonHeight="30px" buttonWidth="30px" containerHeight="160px"/>
    
    <Footer />

    </>

  );
};


export default ManageAnimals;


