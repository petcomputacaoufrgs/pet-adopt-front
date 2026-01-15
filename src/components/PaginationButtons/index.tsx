import {
  PaginationContainer,
  PassPageButton,
  NumericPassPageButtons,
  PaginationButton,
  Ellipsis,
} from "./styles";

import { IPaginationButtonsProps } from "./types";
import LeftArrowIcon from "../../assets/LeftArrow.svg";
import RightArrowIcon from "../../assets/RightArrow.svg";
import { useEffect, useState } from "react";

const PaginationButtons = ({
  buttonWidth,
  buttonHeight,
  containerHeight,
  itemsLength,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  scrollTo,
}: IPaginationButtonsProps) => {
  // Garante pelo menos 1 página
  const totalPages = itemsLength === 0 ? 1 : Math.ceil(itemsLength / itemsPerPage);

  const [scrollAfterRender, setScrollAfterRender] = useState(false);

  const getVisiblePages = (
    currentPageParam: number,
    totalPagesParam: number
  ): number[] => {
    const visiblePagesArray: number[] = [];
    const maxVisible = 5;

    let startPage = Math.max(1, currentPageParam - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPagesParam, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      visiblePagesArray.push(i);
    }

    if (visiblePagesArray[0] > 2) {
      visiblePagesArray.unshift(-1);
    }
    if (visiblePagesArray[visiblePagesArray.length - 1] < totalPagesParam - 1) {
      visiblePagesArray.push(-1);
    }

    return visiblePagesArray;
  };

  const visiblePageNumbers = getVisiblePages(currentPage, totalPages);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    setScrollAfterRender(true);
  };

  // CORREÇÃO DO SCROLL
  useEffect(() => {
    if (scrollAfterRender && scrollTo) {
      const element = document.getElementById(scrollTo);
      if (element) {
        // Cálculo manual para garantir que pule o CSS global
        const y = element.getBoundingClientRect().top + window.scrollY;
        
        // Tenta usar 'instant' (padrão novo), fallback para 'auto'
        window.scrollTo({ 
            top: y, 
            behavior: 'instant' as any // Cast para evitar erro de TS em versões antigas
        });
      }
      setScrollAfterRender(false);
    }
  }, [currentPage, scrollAfterRender, scrollTo]);

  return (
    <PaginationContainer $containerHeight={containerHeight}>
      
      {/* Botão ANTERIOR (Retangular com Texto) */}
      <PassPageButton
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        $buttonHeight={buttonHeight}
      >
        <img src={LeftArrowIcon} alt="" />
        <span>Anterior</span>
      </PassPageButton>

      <NumericPassPageButtons>
        {visiblePageNumbers[0] !== 1 && (
          <PaginationButton
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            $highlighted={currentPage === 1}
            $buttonWidth={buttonWidth}
            $buttonHeight={buttonHeight}
          >
            1
          </PaginationButton>
        )}

        {visiblePageNumbers.map((page, index) => {
          if (page === -1) {
            return <Ellipsis key={`ellipsis-${index}`}>...</Ellipsis>;
          }

          return (
            <PaginationButton
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={currentPage === page}
              $highlighted={currentPage === page}
              $buttonWidth={buttonWidth}
              $buttonHeight={buttonHeight}
            >
              {page}
            </PaginationButton>
          );
        })}

        {visiblePageNumbers[visiblePageNumbers.length - 1] !== totalPages && (
          <PaginationButton
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            $highlighted={currentPage === totalPages}
            $buttonWidth={buttonWidth}
            $buttonHeight={buttonHeight}
          >
            {totalPages}
          </PaginationButton>
        )}
      </NumericPassPageButtons>

      {/* Botão PRÓXIMO (Retangular com Texto) */}
      <PassPageButton
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        $buttonHeight={buttonHeight}
      >
        <span>Próximo</span>
        <img src={RightArrowIcon} alt="" />
      </PassPageButton>
      
    </PaginationContainer>
  );
};

export default PaginationButtons;