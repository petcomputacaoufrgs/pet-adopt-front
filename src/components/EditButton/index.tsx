import { useEffect, useRef, useState } from 'react';
import editIcon from '../../assets/SystemIcon.svg';
import { EditButtonContainer, OptionContentContainer, OptionsContainer, StyledEditButton, StyledOptionButton } from './styles';
import { containerClasses } from '@mui/material';


type Option = {
    label: string;
    onClick: () => void;
    iconSrc?: string;
}

interface IEditButton {
    options: Option[];
    width: string;
    height: string;
}

const EditButton = ({options, width, height} : IEditButton) => {
    const [showOptions, setShowOptions] = useState(false);
  
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (showOptions && buttonRef.current != event.target) setShowOptions(false);
        };

        document.addEventListener("mousedown", handleClick);
    
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [showOptions]);


    return(

        <EditButtonContainer $width = {width} $height = {height}>
        <StyledEditButton ref = {buttonRef} $backgroundImage = {editIcon} $width = {width} $height = {height} $clicked = {showOptions} onClick={() => setShowOptions(!showOptions)} /> 
        
        {showOptions && (

            <OptionsContainer>

                {options.map((option, index) => (
                    <StyledOptionButton>
                        <OptionContentContainer>
                            {option.iconSrc && <img src={option.iconSrc} alt={option.label}></img>}
                            {option.label}
                        </OptionContentContainer>
                    </StyledOptionButton>
                ))}

            </OptionsContainer>
        )}

        </EditButtonContainer>
    )
};

export default EditButton;