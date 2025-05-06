import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {HeaderContainer, 
        Image, 
        TextButton, 
        TextContainer, 
        ButtonsContainer} from "./styles";

import { IHeader } from "./types"

import PrimarySecondaryButton from "../PrimarySecondaryButton";


const Header = ({color, user, Logo}: IHeader) => {
    const navigate = useNavigate();

    const handleScrollToSection = () => {
        const section = document.getElementById("about");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleLoginClick = () => {
        navigate("/login");
      };
    

    useEffect(() => {
        // A rolagem pode ser feita com base no ID diretamente no click, sem problemas com renderização
      }, []);

    return(
        <HeaderContainer $backgroundColor = {color}>
            
            <Image src = {Logo}/>
            
            <TextContainer>

                <TextButton onClick={handleScrollToSection}>Sobre Nós</TextButton>
                <TextButton>Animais Recém Adicionados</TextButton>
                <TextButton>Dicas</TextButton>
                <TextButton>Fale Conosco</TextButton>

            </TextContainer>

            <ButtonsContainer>
                <PrimarySecondaryButton width={"auto"} buttonType={"Primário"} isDisabled={false} content={"Cadastrar ONG ou Membro"} onClick={1} />
                <PrimarySecondaryButton width={"auto"} buttonType={"Primário"} isDisabled={false} content={"Fazer Login"} onClick={handleLoginClick} />
            </ButtonsContainer>

        </HeaderContainer>
    );
};

export default Header;