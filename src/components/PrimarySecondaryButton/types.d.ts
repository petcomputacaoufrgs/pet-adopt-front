export interface IButton {
    width?: string;
    maxHeight?: string;
    buttonType?: string;
    isDisabled?: boolean;
    highlighted?: boolean;
    content: React.ReactNode;
    onClick: any;
    $flex?: boolean;
}