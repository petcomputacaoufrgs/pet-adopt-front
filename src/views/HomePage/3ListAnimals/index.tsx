import React, { useState, useEffect } from "react";

import {  ListContainer, 
          TextContainer, 
          TextTitle2, 
          TextTitle, 
          DogContainter, 
          DogCardsContainer, 
          ButtonContainer, 
          OrangeButton } from "./styles";

import DogCard from "../../../components/DogCard";

import DogForCard from "../../../assets/HomePageCardDog.png";

const Actions = () => {
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

  // Estado para controlar quantos cards são exibidos
  const [visiblePets, setVisiblePets] = useState(pets);

  // Função para atualizar a quantidade de cards com base na largura da tela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1260) {
        setVisiblePets(pets.slice(0, 4)); // Mostra apenas 4 cards
      } 
      else if(window.innerWidth <= 1612) {
        setVisiblePets(pets.slice(0, 6)); // Mostra apenas 6 cards
      }
      else {
        setVisiblePets(pets); // Mostra todos os 8 cards
      }
    };

    // Executa a função ao carregar a página e ao redimensionar a tela
    handleResize();
    window.addEventListener("resize", handleResize);

    // Remove o listener ao desmontar o componente
    return () => window.removeEventListener("resize", handleResize);
  }, [pets]);

  return (
    <ListContainer>

      <TextContainer>
        <TextTitle2>Não Perca os Animaizinhos</TextTitle2>
        <TextTitle>Recém</TextTitle>
        <TextTitle>Adicionados</TextTitle>
      </TextContainer>

      <DogContainter>
        <DogCardsContainer>
          {visiblePets.map((pet, index) => (
            <DogCard
              key={index}
              image_url={pet.image_url}
              sex={pet.sex}
              size={pet.size}
              name={pet.name}
              race={pet.race}
              age={pet.age}
              location={pet.location}
              to={pet.to}
            />
          ))}
        </DogCardsContainer>
      </DogContainter>
      
      <ButtonContainer>
        <OrangeButton>Ver Todos os Animais Disponíveis</OrangeButton>
      </ButtonContainer>

    </ListContainer>
  );
};

export default Actions;