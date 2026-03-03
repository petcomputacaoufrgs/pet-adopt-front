import { useState, useEffect } from "react";

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
import { formatAge, formatSpecies, formatString, petService } from "../../../services";
import { useCallback } from "react";
import type { Pet } from "../../../types/pets"

const ListAnimals = () => {
  const [pets, setPets] = useState<Pet[]>([]);

  const fetchRecentAnimals = useCallback(async () => {
    try {
      const response = await petService.getRecentPets();
      const petsData = response.data;
      setPets(petsData);
    } catch (error) {
      console.error('Error fetching recent animals:', error);
    }
  }, []); // array vazio aqui é ok pois a função não tem dependências externas
  
  useEffect(() => {
    fetchRecentAnimals();
  }, [fetchRecentAnimals]);

  useEffect(() => {
    if (pets.length > 0) {
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
  
  if (pets && pets.length === 0) {
    return null;
  }

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
              sex={formatString(pet.sex)}
              size={formatString(pet.size)}
              name={formatString(pet.name)}
              race={formatSpecies(pet.species)}
              breed={formatString(pet.breed)}
              age={formatAge(pet.age)}
              location={formatString(pet.city) + ", " + pet.state}
              id={pet.id || pet._id || ''}

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