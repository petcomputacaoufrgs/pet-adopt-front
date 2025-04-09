import React, { useEffect } from "react";

import {HeaderContainer, 
        Image, 
        TextButton, 
        TextContainer, 
        ButtonsContainer} from "./styles";

import { IHeader } from "./types"

import PrimarySecondaryButton from "../PrimarySecondaryButton";


const Header = ({color, user, Logo}: IHeader) => {
    
    const handleScrollToSection = () => {
        const section = document.getElementById("about");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        // A rolagem pode ser feita com base no ID diretamente no click, sem problemas com renderização
      }, []);

    return(
        <HeaderContainer background_color = {color}>
            
            <Image src = {Logo}/>
            
            <TextContainer>

                <TextButton onClick={handleScrollToSection}>Sobre Nós</TextButton>
                <TextButton>Animais Recém Adicionados</TextButton>
                <TextButton>Dicas</TextButton>
                <TextButton>Fale Conosco</TextButton>

            </TextContainer>

            <ButtonsContainer>
                <PrimarySecondaryButton width={"50px"} buttonType={"Primário"} isDisabled={false} content={"Cadastrar ONG ou Membro"} onClick={1} />
                <PrimarySecondaryButton width={"50px"} buttonType={"Primário"} isDisabled={false} content={"Fazer Login"} onClick={1} />
            </ButtonsContainer>

        </HeaderContainer>
    );
};

export default Header;