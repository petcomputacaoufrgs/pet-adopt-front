export interface IButton {
    width?: string;
    buttonType?: string;
    isDisabled?: boolean;
    highlighted?: boolean;
    content: React.ReactNode;
    onClick: any;
}