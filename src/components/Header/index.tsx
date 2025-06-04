import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {HeaderContainer, 
        Image, 
        TextButton, 
        TextContainer, 
        ButtonsContainer} from "./styles";

import { IHeader } from "./types"

import PrimarySecondaryButton from "../PrimarySecondaryButton";
import DropdownButton from "../DropDownButton";


const Header = ({color, user, Logo}: IHeader) => {
    const navigate = useNavigate();

    const handleScrollToSection = () => {
        const section = document.getElementById("about");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleManageAnimalsClick = () => {
        navigate("/manageAnimals");
      };
    const handleLoginClick = () => {
        navigate("/login");
      };
    
    const handleSignupClick = () => {
        navigate("/signup");
    };

    useEffect(() => {
        // A rolagem pode ser feita com base no ID diretamente no click, sem problemas com renderização
      }, []);

    

  
  const isWideEnoughForStandardButtons = () => window.innerWidth >= 1260;

  // Estado para controlar os botões exibidos
  const [showStandardButtons, setShowStandardButtons] = useState(isWideEnoughForStandardButtons());


  // Função para atualizar os botões exibidos com base na largura da tela
  useEffect(() => {
    const handleResize = () => {
      setShowStandardButtons(isWideEnoughForStandardButtons());
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  })


    return(
        <HeaderContainer $backgroundColor = {color}>
            
            <Image src = {Logo}/>
            
            <TextContainer>

                <TextButton onClick={handleScrollToSection}>Sobre Nós</TextButton>
                <TextButton onClick={handleManageAnimalsClick}>Animais Recém Adicionados</TextButton>
                <TextButton>Dicas</TextButton>
                <TextButton>Fale Conosco</TextButton>

            </TextContainer>

            <ButtonsContainer>
            {(showStandardButtons)? 

            <>
                <PrimarySecondaryButton width={"284px"} buttonType={"Primário"} isDisabled={false} content={"Cadastrar ONG ou Membro"} onClick={handleSignupClick} />
                <PrimarySecondaryButton width={"151px"} buttonType={"Primário"} isDisabled={false} content={"Fazer Login"} onClick={handleLoginClick} />
            </>
    
            :

            <DropdownButton content={<svg width="17" height="24" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 13.5H15H2ZM2 7.5H15H2ZM2 1.5H15H2Z"/>
                <path d="M2 13.5H15M2 7.5H15M2 1.5H15" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>} onClick={() => {}} options={["Cadastrar ONG ou Membro", "Fazer Login"]} dropDownWidth="250px"/>
            }

            </ButtonsContainer>

        </HeaderContainer>
    );
};

export default Header;