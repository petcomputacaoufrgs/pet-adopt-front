
import { useState } from "react";
import DogForCard from "../../assets/HomePageCardDog.png";
import { Ellipsis, NumericPassPageButtons, PaginationButton, PaginationContainer, PassPageButton } from "./styled";

import LeftArrow from "../../assets/LeftArrow.svg";
import RightArrow from "../../assets/RightArrow.svg";


type Pet = {
    image_url: string;
    sex: string;
    size: string;
    name: string;
    race: string;
    age: string;
    location: string;
    height_mobile?: string;
    to: string;
};


interface IPaginationButtons {
  buttonWidth: string;
  buttonHeight: string;
  containerHeight: string;
}

const PaginationButtons = ({buttonWidth, buttonHeight, containerHeight} : IPaginationButtons) => {

    const [pets, setPets] = useState<Pet[]>([
    { image_url: DogForCard, sex: "Fêmea", size: "Porte Médio", name: "Mel", race: "Vira-lata", age: "2", location: "São Paulo, SP", to: "/pet1" },
    { image_url: DogForCard, sex: "Macho", size: "Porte Grande", name: "Rex", race: "Pastor Alemão", age: "4", location: "Rio de Janeiro, RJ", to: "/pet2" },
    { image_url: DogForCard, sex: "Fêmea", size: "Porte Pequeno", name: "Luna", race: "Poodle", age: "1", location: "Belo Horizonte, MG", to: "/pet3" },
    { image_url: DogForCard, sex: "Macho", size: "Porte Médio", name: "Thor", race: "Bulldog", age: "3", location: "Curitiba, PR", to: "/pet4" },
    { image_url: DogForCard, sex: "Fêmea", size: "Porte Grande", name: "Bela", race: "Labrador", age: "5", location: "Porto Alegre, RS", to: "/pet5" },
    { image_url: DogForCard, sex: "Macho", size: "Porte Pequeno", name: "Max", race: "Chihuahua", age: "2", location: "Salvador, BA", to: "/pet6" },
    { image_url: DogForCard, sex: "Fêmea", size: "Porte Médio", name: "Nina", race: "Golden Retriever", age: "3", location: "Recife, PE", to: "/pet7" },
    { image_url: DogForCard, sex: "Macho", size: "Porte Grande", name: "Bob", race: "Rottweiler", age: "4", location: "Fortaleza, CE", to: "/pet8" }
  ]);
    const [currentPage, setCurrentPage] = useState(1);
    const petsPerPage = 9;
    const [totalPages, setTotalPages] = useState(Math.ceil(pets.length / petsPerPage));
    


    const getVisiblePages = (currentPage: number, totalPages: number) => {
        const visiblePages = [];
        const maxVisible = 5;

        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);

        if (endPage - startPage < maxVisible - 1) 
            startPage = Math.max(1, endPage - maxVisible + 1);
        

        for (let i = startPage; i <= endPage; i++)
            visiblePages.push(i);
        
            
        if(visiblePages[0] > 2)
            visiblePages.unshift(-1);
        if(visiblePages[visiblePages.length - 1] < totalPages - 1)
            visiblePages.push(-1);

        return visiblePages;
    }


    const visiblePages = getVisiblePages(currentPage, totalPages);

    const handlePageChange = (newPage: number) => {
        if (newPage < 1) return;
        setCurrentPage(newPage);
        window.scrollTo({top: 0});
    }


  
  return (
  
  <PaginationContainer $buttonWidth = {buttonWidth} $buttonHeight = {buttonHeight} $containerHeight = {containerHeight}>

  
  <PassPageButton onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} disabled={currentPage === 1}>
    <img src={LeftArrow} alt="Go back one page"></img>
  </PassPageButton>
  
  <NumericPassPageButtons>

  {visiblePages[0] != 1 && 
    <PaginationButton onClick={() => handlePageChange(1)} disabled={currentPage === 1} $highlighted={currentPage === 1}>1</PaginationButton>
  }


  
{visiblePages.map((page, index) => {
  if (page === -1) {
    return (
      <Ellipsis key={`ellipsis-${index}`}>
        ...
      </Ellipsis>
    );
  }

  return (
    <PaginationButton
      key={page}
      onClick={() => handlePageChange(page)}
      disabled={currentPage === page}
      $highlighted={currentPage === page}
    >
      {page}
    </PaginationButton>
  );
})}

  
  {visiblePages[visiblePages.length - 1] != totalPages && 
    <PaginationButton onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} $highlighted={currentPage === totalPages}>{totalPages}</PaginationButton>
  }

  </NumericPassPageButtons>

  <PassPageButton onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages}>
    <img src={RightArrow} alt="Pass Page"></img>
  </PassPageButton>



</PaginationContainer>

  );
};

export default PaginationButtons;
