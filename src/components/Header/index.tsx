import { useEffect, useState } from "react";

import {HeaderContainer, 
        Image, 
        TextButton, 
        TextContainer, 
        ButtonsContainer,
        CompactedMenuButton,
        CompactMenu,
        SocialIconsDiv,
        Icon,
        HeaderWrapper,
        CompactGeneralOptionsContainer,
        CompactLoginSignupButtonsContainer,
        CompactUserOptionsContainer} from "./styles";


import PrimarySecondaryButton from "../PrimarySecondaryButton";
import DropdownButton from "../DropDownButton";


import Insta from "../../assets/OrangeInstagramPin.png";
import Facebook from "../../assets/OrangeFacebookPin.png";
import Youtube from "../../assets/OrangeYoutubePin.png";
import Tiktok from "../../assets/OrangeTiktokPin.png";

import InstaB from "../../assets/BrownInstagramPin.png";
import FacebookB from "../../assets/BrownFacebookPin.png";
import YoutubeB from "../../assets/BrownYoutubePin.png";
import TiktokB from "../../assets/BrownTiktokPin.png";

import { IHeader } from "./types"
import { useNavigate } from "react-router-dom";

const Header = ({color, user, Logo, options, optionsToAction}: IHeader) => {

// Lista de links para redes sociais
const socialMediaLinks = [
  {
    orange: Insta,
    brown: InstaB,
    alt: "Instagram",
    href: "https://www.instagram.com"
  },
  {
    orange: Facebook,
    brown: FacebookB,
    alt: "Facebook",
    href: "https://www.facebook.com"
  },
  {
    orange: Youtube,
    brown: YoutubeB,
    alt: "YouTube",
    href: "https://www.youtube.com"
  },
  {
    orange: Tiktok,
    brown: TiktokB,
    alt: "TikTok",
    href: "https://www.tiktok.com"
  }
];


// Define as opções e ações de usuário atuais (se o usuário estiver deslogado, assume que as ações possíveis são de cadastro e login)

const navigate = useNavigate();

const currentUserOptions = user
  ? user.userOptions
  : ["Cadastrar ONG ou Membro", "Fazer Login"];

const currentUserActions = user
  ? user.userOptionsToActions
  : (selected: string) => {
    if(selected === "Cadastrar ONG ou Membro") navigate("/signup");
    else if(selected === "Fazer Login")        navigate("/login");
  };

// Para as opções de usuário deslogado, define o tamanho de cada um dos botões no modo de exibição "full" (ver abaixo)
const standardUserOptionsButtonWidth = ["284px", "151px"];

// Monitora o tamanho da tela
const [windowWidth, setWindowWidth] = useState(window.innerWidth);

useEffect(() => {
  const handleResize = () => setWindowWidth(window.innerWidth);
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);


// Define o modo de exibição baseado no tamanho da tela. 
  // "full" quando largura >= 1480:   mostra todas as opções
  // "partial" quando largura >= 900: esconde todas as ações de usuário em um botão drop-down
  // "compact" quando largura < 900:  aglomera todas as opções genéricas e de usuário em um menu que pode ser aberto com um botão

type ResponsiveMode = "full" | "partial" | "compact";

const getResponsiveMode = (): ResponsiveMode => {
  if (windowWidth >= 1480) return "full";
  if (windowWidth >= 900) return "partial";
  return "compact";
};

const responsiveMode = getResponsiveMode();


// Controle do menu compacto - ao clicar no botão para abrir o menu, define esse state como true
const [showCompactMenu, setShowCompactMenu] = useState(false);

// Ao mudar o tamanho da tela, garante que o menu compacto feche caso não esteja mais no modo "compact"
useEffect(() => {
  if (showCompactMenu && responsiveMode !== "compact") {
    setShowCompactMenu(false);
  }
}, [windowWidth]);

// Ao clicar no botão para abrir/fechar o menu compacto, alterna o state que define que ele deve se ele é ou não aberto
const handleClickOnCompactButton = () => {
  setShowCompactMenu((prev) => !prev);
};



/**
 * Gera o conteúdo do menu compacto (modo de exibição "compact").
 * Exibe diferentes seções com base no estado do usuário (logado ou não). 
 * Quando o usuário está logado, exibe todas as opções de usuário como texto no menu e em seguida as genéricas
 * Quando o usuário está deslogado, exibe as opções padrões (login e cadastro) como botões, e então as opções genéricas
 */
const renderCompactMenu = () => {
  return (
    <>
      {user ? (
        <CompactUserOptionsContainer>
          {currentUserOptions.map((option) => (
            <TextButton key={option} onClick={() => currentUserActions(option)}>
              {option}
            </TextButton>
          ))}
        </CompactUserOptionsContainer>
      ) : (
        <CompactLoginSignupButtonsContainer>
          {currentUserOptions.map((option: string) => (
            <PrimarySecondaryButton
              key={option}
              width={`${90 / currentUserOptions.length}%`}
              buttonType="Primário"
              isDisabled={false}
              content={option}
              onClick={() => currentUserActions(option)}
            />
          ))}
        </CompactLoginSignupButtonsContainer>
      )}

      <CompactGeneralOptionsContainer>
        {options.map((option) => (
          <TextButton key={option} onClick={() => optionsToAction(option)}>
            {option}
          </TextButton>
        ))}
      </CompactGeneralOptionsContainer>


      <SocialIconsDiv>
        {socialMediaLinks.map((icon, index) => (
          <a key={index} href={icon.href} target="_blank" rel="noopener noreferrer">
            <Icon $orange={icon.orange} $brown={icon.brown} aria-label={icon.alt} />
          </a>
        ))}
      </SocialIconsDiv>
    </>
  );
};

/**
 * Gera os botões principais do menu de acordo com o modo responsivo.
 * "full":    mostra todos os botões
 * "partial": esconde opções de usuário
 * "compact": esconde todas as opções
 */
  const renderMenuButtons = () => {
    if (responsiveMode === "full") {
      if (user) {
        return (
          <DropdownButton
            buttonType="Secundário"
            content={`Olá, ${user.name}`}
            options={user.userOptions}
            onClick={user.userOptionsToActions}
          />
        );
      } else {
        return (
          <>
          {currentUserOptions.map((option : string, index) => (
            <PrimarySecondaryButton
              key={option}
              width= {standardUserOptionsButtonWidth[index]}
              buttonType="Primário"
              isDisabled={false}
              content= {option}
              onClick={(option : string) => currentUserActions(option)} />
          ))}
          </>
        );
      }
    }

    if (responsiveMode === "partial") {
      return (
        <DropdownButton
          buttonType= {user? "Secundário" : "Primário"}
          content={user ? `Olá, ${user.name}` :
                <svg width="17" height="24" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 13.5H15H2ZM2 7.5H15H2ZM2 1.5H15H2Z"/>
                <path d="M2 13.5H15M2 7.5H15M2 1.5H15" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>}

          onClick={currentUserActions}
          options={currentUserOptions}
          dropDownWidth="250px"
        />
      );
    }

    if (responsiveMode === "compact") {
      return (
      <CompactedMenuButton onClick={handleClickOnCompactButton} $highlighted={showCompactMenu}>
          <svg width="17" height="24" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 13.5H15H2ZM2 7.5H15H2ZM2 1.5H15H2Z"/>
            <path d="M2 13.5H15M2 7.5H15M2 1.5H15" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
      </CompactedMenuButton>
    );
    }}

    return(
      <HeaderWrapper $showCompactMenu={showCompactMenu} $color={color}>
        
        <HeaderContainer $backgroundColor = {"transparent"}>

          <Image src = {Logo}/>
            
          {/* Menu principal de navegação */}
          <TextContainer>

            { responsiveMode != "compact" &&
              options.map((option) => {
                return (
                  <TextButton key={option} onClick={() => optionsToAction(option)}>{option}</TextButton>
                )
              })
            }

          </TextContainer>

          {/* Botões de login/cadastro ou menu do usuário */}
          <ButtonsContainer>
            {renderMenuButtons()}
          </ButtonsContainer>

        </HeaderContainer>

        {/* Menu expandido (modo compacto) */}
        <CompactMenu $visible={showCompactMenu}>
          {showCompactMenu && renderCompactMenu()}
        </CompactMenu>
      
        
    </HeaderWrapper>
    );
};

export default Header;