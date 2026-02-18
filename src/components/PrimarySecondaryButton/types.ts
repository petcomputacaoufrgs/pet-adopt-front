export interface IButton {
    width?: string;
    height?: string;
    buttonType?: string;
    isDisabled?: boolean;
    highlighted?: boolean;
    content: React.ReactNode;
    onClick: any;
    $flex?: boolean;
    paddingV?: string; 
    paddingH?: string;
    fontSize?: string;
}