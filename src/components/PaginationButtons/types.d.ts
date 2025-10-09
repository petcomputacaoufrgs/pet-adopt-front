export interface IPaginationButtonsProps {
  buttonWidth: string;
  buttonHeight: string;
  containerHeight: string;
  itemsLength: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (newPage: number) => void;
  scrollTo: string;
}