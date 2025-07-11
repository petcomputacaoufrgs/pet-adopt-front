
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
  itemsLength: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (newPage: number) => void;

}

const PaginationButtons = ({buttonWidth, buttonHeight, containerHeight, itemsLength, itemsPerPage, currentPage, setCurrentPage} : IPaginationButtons) => {

    const totalPages = Math.ceil(itemsLength / itemsPerPage);
    console.log(totalPages);

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
        window.scrollTo({top: 100});
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
