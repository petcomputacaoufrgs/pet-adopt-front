export interface IHeader {
    color: string;
    user: string;
    Logo: string;
    options: string[];
    optionsToAction: (selected: string) => void;
  }