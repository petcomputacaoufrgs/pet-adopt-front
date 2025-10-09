import React, { useState, useEffect } from "react";

import {  ListContainer, 
          TextContainer, 
          TextTitle2, 
          TextTitle, 
          DogContainter, 
          DogCardsContainer, 
          ButtonContainer } from "./styles";

import DogCard from "../../../components/DogCard";

import DogForCard from "../../../assets/HomePageCardDog.png";
import PrimarySecondaryButton from "../../../components/PrimarySecondaryButton";
import { useNavigate } from "react-router-dom";


const ListAnimals = () => {
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

  const getPetsToShow = () => {
    if (window.innerWidth <= 1260) 
      return pets.slice(0, 4); // Mostra apenas 4 cards    
    
    if(window.innerWidth <= 1612) 
      return pets.slice(0, 6); // Mostra apenas 6 cards

    return pets; // Mostra todos os 8 cards
    
  };
  
  // Estado para controlar quantos cards são exibidos
  const [visiblePets, setVisiblePets] = useState(getPetsToShow());

  // Função para atualizar a quantidade de cards com base na largura da tela
  useEffect(() => {
    const handleResize = () => {
      setVisiblePets(getPetsToShow());
    };

    window.addEventListener("resize", handleResize);

    // Remove o listener ao desmontar o componente
    return () => window.removeEventListener("resize", handleResize);
  }, [pets]);


  const navigate = useNavigate();
  

  return (
    <ListContainer id="listAnimals">

      <TextContainer>
        <TextTitle2>Não Perca os Animaizinhos</TextTitle2>
        <TextTitle>Recém Adicionados</TextTitle>
      </TextContainer>

      <DogContainter>
        <DogCardsContainer>
          {visiblePets.map((pet, index) => (
            <DogCard
              key={index}
              imageUrl={pet.image_url}
              sex={pet.sex}
              size={pet.size}
              name={pet.name}
              race={pet.race}
              age={pet.age}
              location={pet.location}
              id={""}
            />
          ))}
        </DogCardsContainer>
      </DogContainter>
      
      <ButtonContainer>
        <PrimarySecondaryButton content="Ver todos os Animais Disponíveis" onClick={() => navigate("/searchAnimals")} paddingH="20px" paddingV="10px"></PrimarySecondaryButton>
      </ButtonContainer>

    </ListContainer>
  );
};

export default ListAnimals;