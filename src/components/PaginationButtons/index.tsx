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

// A interface Pet foi mantida aqui apenas para referência,
// mas o ideal é movê-la para um arquivo de tipos global (ex: src/types/common.d.ts)
// e importá-la apenas onde for realmente utilizada.
/*type Pet = {
  imageUrl: string;
  sex: string;
  size: string;
  name: string;
  race: string;
  age: string;
  location: string;
  heightMobile?: string;
  to: string;
};*/

const PaginationButtons = ({
  buttonWidth,
  buttonHeight,
  containerHeight,
  itemsLength,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}: IPaginationButtonsProps) => {
  const totalPages = Math.ceil(itemsLength / itemsPerPage);

  const getVisiblePages = (
    currentPageParam: number,
    totalPagesParam: number,
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

    // Adiciona reticências se a primeira página visível não for 1 ou 2
    if (visiblePagesArray[0] > 2) {
      visiblePagesArray.unshift(-1); // -1 para representar a elipse
    }
    // Adiciona reticências se a última página visível não for a penúltima ou última
    if (visiblePagesArray[visiblePagesArray.length - 1] < totalPagesParam - 1) {
      visiblePagesArray.push(-1); // -1 para representar a elipse
    }

    return visiblePagesArray;
  };

  const visiblePageNumbers = getVisiblePages(currentPage, totalPages);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    window.scrollTo({ top: 100, behavior: "smooth" });
  };

  return (
    <PaginationContainer
      $buttonWidth={buttonWidth}
      $buttonHeight={buttonHeight}
      $containerHeight={containerHeight}
    >
      <PassPageButton
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img src={LeftArrowIcon} alt="Página Anterior" />
      </PassPageButton>

      <NumericPassPageButtons>
        {/* Renderiza o botão da primeira página se não estiver visível */}
        {visiblePageNumbers[0] !== 1 && (
          <PaginationButton
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            $highlighted={currentPage === 1}
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
            >
              {page}
            </PaginationButton>
          );
        })}

        {/* Renderiza o botão da última página se não estiver visível */}
        {visiblePageNumbers[visiblePageNumbers.length - 1] !== totalPages && (
          <PaginationButton
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            $highlighted={currentPage === totalPages}
          >
            {totalPages}
          </PaginationButton>
        )}
      </NumericPassPageButtons>

      <PassPageButton
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <img src={RightArrowIcon} alt="Próxima Página" />
      </PassPageButton>
    </PaginationContainer>
  );
};

export default PaginationButtons;