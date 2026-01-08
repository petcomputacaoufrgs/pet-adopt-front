import React, { useState, useEffect, useTransition } from "react";

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
import { petService } from "../../../services";
import { useCallback } from "react";
import { Pet } from "../../../types/pets"

const ListAnimals = () => {
  const [pets, setPets] = useState<Pet[]>([]);

  const fetchRecentAnimals = useCallback(async () => {
    try {
      const response = await petService.getRecentPets();
      const petsData = response.data;
      console.log('Dados recebidos da API:', petsData);
      setPets(petsData);
    } catch (error) {
      console.error('Error fetching recent animals:', error);
    }
  }, []); // array vazio aqui é ok pois a função não tem dependências externas
  
  useEffect(() => {
    fetchRecentAnimals();
  }, [fetchRecentAnimals]);

  useEffect(() => {
    console.log('Pets atualizados:', pets);
    if (pets.length > 0) {
      console.log('Primeira foto do primeiro pet:', pets[0].photos);
    }
  }, [pets]);

  const getPetsToShow = useCallback(() => {
    if (window.innerWidth <= 1260) 
      return pets.slice(0, 4); // Mostra apenas 4 cards
    
    if(window.innerWidth <= 1612) 
      return pets.slice(0, 6); // Mostra apenas 6 cards

    return pets; // Mostra todos os 8 cards
    
  }, [pets]);
  
  // Estado para controlar quantos cards são exibidos
  const [visiblePets, setVisiblePets] = useState(getPetsToShow());

  // Função para atualizar a quantidade de cards com base na largura da tela
  useEffect(() => {
    const handleResize = () => {
      setVisiblePets(getPetsToShow());
    };

    // Configura o estado inicial
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getPetsToShow]);

  useEffect(() => {
    setVisiblePets(getPetsToShow());
  }, [pets]);

  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const handleNavigation = (to: string, options?: { state?: any }) => {
    startTransition(() => {
      navigate(to, options);
    });
  };
  

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
              key={pet.id || index}
              imageUrl={pet.photos && pet.photos.length > 0 ? pet.photos[0] : DogForCard}
              sex={pet.sex}
              size={pet.size || ''}
              name={pet.name }
              race={pet.breed || ''}
              age={pet.age}
              location={pet.city}
              id={pet.id || pet._id || ''}

            />
          ))}
        </DogCardsContainer>
      </DogContainter>
      
      <ButtonContainer>
        <PrimarySecondaryButton content="Ver todos os Animais Disponíveis" onClick={() => handleNavigation("/searchAnimals")} paddingH="20px" paddingV="10px"></PrimarySecondaryButton>
      </ButtonContainer>

    </ListContainer>
  );
};

export default ListAnimals;