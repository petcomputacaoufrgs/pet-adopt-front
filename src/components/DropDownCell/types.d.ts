export interface IDropDown {
  options: string[];
  onSelect: (selected: string) => void;
  width: string;
  fontSize: string;
  highlight?: number;
  numCellsShowed: number;
}