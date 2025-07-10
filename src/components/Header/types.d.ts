type User = {
  name: string;
  userOptions: string[];
  userOptionsToActions: (selected: string) => void;
};

export interface IHeader {
    color: string;
    user?: User;
    Logo: string;
    options: string[];
    optionsToAction: (selected: string) => void;
  }