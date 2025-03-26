import ButtonComponent from "../button1";
import { HeaderContainer, Image, TextButton, TextContainer, ButtonsContainer} from "./styles";
import { IHeader } from "./types"
import React, { useEffect } from "react";

const HeaderComponent = ({color, user, Logo}: IHeader) => {
    
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
                <ButtonComponent title="Cadastrar ONG ou Membro" to="/teste" background = "rgb(0,0,0,0)" border="2px solid #553525"/>            
                <ButtonComponent title="Fazer Login" to="/teste" background = "#FF9944" border="none"/>            
            </ButtonsContainer>

        </HeaderContainer>
    );
};

export default HeaderComponent;