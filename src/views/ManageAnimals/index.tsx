import AnimalFilter from "../../components/AnimalFilter";
import Header from "../../components/Header";
import BannerComponent from "../../components/BannerComponent";

import dog from "../../assets/ManageAnimalsDog.png";
import logo from "../../assets/HorizontalLogo.png";
import { useState } from "react";
import Footer from "../HomePage/6Footer";
import { ContentContainer, DogCardsContainer } from "./styles";


import DogCard from "../../components/DogCard";
import DogForCard from "../../assets/HomePageCardDog.png";
import EditButton from "../../components/EditButton";

import DeleteIcon from "../../assets/DeleteIcon.svg"
import PencilIcon from "../../assets/PencilIcon.svg";


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



  return (
    <>
    <Header color="#FFF6E8" user="not in" Logo={logo} />
    <BannerComponent color="#F5ABA2" title="Encontre seu novo melhor amigo!" subTitle="Conheça aqui peludinhos cheios de amor, esperando por um lar para chamar de seu!" image_url={dog}  />
    
    <ContentContainer>
    
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

              <div style={{position: "absolute", top: "24px", left: "310px"}}>
                  <EditButton width="34px" height="34px" options = {[{label: "Editar", onClick: () => {}, iconSrc: PencilIcon}, {label: "Excluir", onClick: () => {}, iconSrc: DeleteIcon}]}/> 
              </div>
              
              
            </div>
          )
        })}

      </DogCardsContainer>
      

    </ContentContainer>

    
    <Footer />
    </>
  );
};


export default ManageAnimals;


