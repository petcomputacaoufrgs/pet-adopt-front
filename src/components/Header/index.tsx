import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  ButtonsContainer,
  CompactedMenuButton,
  CompactGeneralOptionsContainer,
  CompactLoginSignupButtonsContainer,
  CompactMenu,
  CompactUserOptionsContainer,
  HeaderContainer,
  HeaderWrapper,
  Icon,
  Image,
  SocialIconsDiv,
  TextButton,
  TextContainer,
} from "./styles";
import { IHeader } from "./types";

import DropdownButton from "../DropDownButton";
import PrimarySecondaryButton from "../PrimarySecondaryButton";

import BrownFacebookPin from "../../assets/BrownFacebookPin.png";
import BrownInstagramPin from "../../assets/BrownInstagramPin.png";
import BrownTiktokPin from "../../assets/BrownTiktokPin.png";
import BrownYoutubePin from "../../assets/BrownYoutubePin.png";
import OrangeFacebookPin from "../../assets/OrangeFacebookPin.png";
import OrangeInstagramPin from "../../assets/OrangeInstagramPin.png";
import OrangeTiktokPin from "../../assets/OrangeTiktokPin.png";
import OrangeYoutubePin from "../../assets/OrangeYoutubePin.png";
import { useAuth } from "../../hooks/useAuth";
import { User } from "../../types/user";
import { useHeaderOptions } from "./useHeaderOptions";
import { ChevronDown, ChevronUp, Home, HomeIcon } from "lucide-react";


const Header = ({ color, Logo, user, isLoggedIn }: IHeader) => {

  const { accountOptions, navigationOptions, handleAction } = useHeaderOptions();


  const socialMediaLinks = [
    {
      orange: OrangeInstagramPin,
      brown: BrownInstagramPin,
      alt: "Instagram",
      href: "https://www.instagram.com",
    },
    {
      orange: OrangeFacebookPin,
      brown: BrownFacebookPin,
      alt: "Facebook",
      href: "https://www.facebook.com",
    },
    {
      orange: OrangeYoutubePin,
      brown: BrownYoutubePin,
      alt: "YouTube",
      href: "https://www.youtube.com",
    },
    {
      orange: OrangeTiktokPin,
      brown: BrownTiktokPin,
      alt: "TikTok",
      href: "https://www.tiktok.com",
    },
  ];



  const standardUserOptionsButtonWidth = ["151px", "284px"];

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  type ResponsiveMode = "full" | "partial" | "compact";

  const getResponsiveMode = (): ResponsiveMode => {
    if(!isLoggedIn){
      if (windowWidth >= 1560) return "full";
      if (windowWidth >= 980) return "partial";
      return "compact";
    }

    if(user){
      if(user.role === "NGO_ADMIN"){
        return windowWidth >= 1200 ? "full" : "compact";
      }
      if(user.role === "NGO_ADMIN_PENDING"){
        return windowWidth >= 1200 ? "full" : "compact";
      }
      if(user.role === "NGO_MEMBER"){
        return windowWidth >= 1200 ? "full" : "compact";
      }
      if(user.role === "ADMIN"){
        return windowWidth >= 1280 ? "full" : windowWidth >= 680 ? "partial" : "compact";
      }
    }

    return windowWidth >= 1280 ? "full" : windowWidth >= 680 ? "partial" : "compact";
  };

  const responsiveMode = getResponsiveMode();

  const [showCompactMenu, setShowCompactMenu] = useState(false);

  useEffect(() => {
    if (showCompactMenu && responsiveMode !== "compact") {
      setShowCompactMenu(false);
    }
  }, [windowWidth, showCompactMenu, responsiveMode]);

  const handleClickOnCompactButton = () => {
    setShowCompactMenu((prev) => !prev);
  };

  const MenuIcon = (
    <svg
      width="17"
      height="24"
      viewBox="0 0 17 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 13.5H15H2ZM2 7.5H15H2ZM2 1.5H15H2Z" />
      <path
        d="M2 13.5H15M2 7.5H15M2 1.5H15"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const navigate = useNavigate();


  const renderCompactMenu = () => (
    <>
      {/* Se o usuário estiver logado, mostra as opções de navegação e conta */}
      {isLoggedIn ? (
        <CompactUserOptionsContainer>
          <TextButton key="home" onClick={() => navigate("/")}>
            Home
          </TextButton>

          {navigationOptions.concat(accountOptions).map((option) => (
            <TextButton key={option} onClick={() => handleAction(option)}>
              {option}
            </TextButton>
          ))}
        </CompactUserOptionsContainer>

      
      ) : (
      <>
        {/* Se o usuário não estiver logado, mostra botões de login/cadastro e as opções de navegação */}
        <CompactLoginSignupButtonsContainer>
          {accountOptions.map((option: string) => (
            <PrimarySecondaryButton
              key={option}
              width={`${90 / accountOptions.length}%`}
              buttonType="Primário"
              isDisabled={false}
              content={option}
              onClick={() => handleAction(option)}
              paddingH="5px"
              paddingV="10px"
            />
          ))}
        </CompactLoginSignupButtonsContainer>
      

      <CompactGeneralOptionsContainer>
        {navigationOptions.map((option) => (
          <TextButton key={option} onClick={() => handleAction(option)}>
            {option}
          </TextButton>
        ))}
      </CompactGeneralOptionsContainer>

      </>
      )}

      <SocialIconsDiv>
        {socialMediaLinks.map((icon, index) => (
          <a key={index} href={icon.href} target="_blank" rel="noopener noreferrer">
            <Icon $orange={icon.orange} $brown={icon.brown} aria-label={icon.alt} />
          </a>
        ))}
      </SocialIconsDiv>
    </>
  );

  const toggleButtonRef = useRef<HTMLButtonElement>(null);


  const renderMenuButtons = () => {

    // Se estiver no modo "full" 
    if (responsiveMode === "full") {

      // Se o usuário estiver logado, mostra as opções de conta em um DropDown e as opções de navegação direto no Header
      return user ? (

        <DropdownButton
          buttonType="Secundário"
          fontSize={"clamp(16px, 1.2vw, 18px)"}
          content={`Olá, ${user.name}`}
          options={accountOptions}
          paddingH="20px"
          onClick={handleAction}
          indicator={(isOpen: boolean) => isOpen ? (
            <ChevronDown size={30} color="#553525"/>
                    ) : (
            <ChevronUp size={30} color="#553525" />
          )}
        />
        
      // Se o usuário não estiver logado, mostra as opções de conta como botões e as opções de navegação direto no Header
        ) : (
        <>
          {accountOptions.map((option: string, index) => (
            <PrimarySecondaryButton
              key={option}
              width={standardUserOptionsButtonWidth[index]}
              buttonType={index === 0 ? "Secundário" : "Primário"}
              isDisabled={false}
              content={option}
              onClick={() => handleAction(option)}
              paddingH="5px"
              paddingV="10px"
            />
          ))}
        </>
      );
    }

    // Se estiver no modo "partial"
    if (responsiveMode === "partial") {
      // Se o usuário estiver logado e for ADMIN, mostra todas as opções no DropDown (navegação + conta)
      return (user && user.role === "ADMIN") ? (

          <DropdownButton
          buttonType="Secundário"
          fontSize={"clamp(16px, 1.2vw, 18px)"}
          content={`Olá, ${user.name}`}
          options={["Home"].concat(navigationOptions.concat(accountOptions))}
          paddingH="20px"
          onClick={handleAction}
          indicator={(isOpen: boolean) => isOpen ? (
            <ChevronDown size={30} color="#553525"/>
                    ) : (
            <ChevronUp size={30} color="#553525" />
          )}
          />

        // Se o usuário não for ADMIN, mostra apenas as opções de conta no DropDown, e as opções de navegação direto no Header
        ) : (
        
        <DropdownButton
          buttonType={user ? "Secundário" : "Primário"}
          fontSize={"clamp(16px, 1.2vw, 18px)"}
          content={user ? `Olá, ${user.name}` : MenuIcon}
          onClick={handleAction}
          options={accountOptions}
          paddingH="20px"
          dropDownWidth="250px"
          indicator={isLoggedIn ? (isOpen: boolean) => isOpen ? (
            <ChevronDown size={30} color="#553525"/>
          ) : (
            <ChevronUp size={30} color="#553525" />
          ) : undefined}
        />
        );
    }


    if (responsiveMode === "compact") {
      return (
        <CompactedMenuButton ref={toggleButtonRef} onClick={handleClickOnCompactButton} $highlighted={showCompactMenu}>
          {MenuIcon}
        </CompactedMenuButton>
      );
    }
  };

  const [isScrolled, setScrolled] = useState(false);

  
  const handleScroll = () => {
    const scrollY = window.pageYOffset;
    if (scrollY > 60) setScrolled(true);
    else if (scrollY < 10) setScrolled(false);
  };


  useEffect(() => {
      window.addEventListener('scroll', handleScroll);

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);


  const visibleOptionsOnHeader = (responsiveMode == "partial" && user && user.role === "ADMIN")? []: navigationOptions;

  // Hook para detectar cliques fora do menu compacto quando ele está aberto e esconder ele de novo
  const compactMenuRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {

      if (compactMenuRef.current && !compactMenuRef.current.contains(e.target as Node) && toggleButtonRef.current && !toggleButtonRef.current.contains(e.target as Node))
        setShowCompactMenu(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  return (

    <HeaderWrapper $shrink={isScrolled} $showCompactMenu={showCompactMenu} $color={color}>
      <HeaderContainer $shrink={isScrolled} $backgroundColor={"transparent"}>
        <Image src={Logo} />

        <TextContainer>
          {responsiveMode !== "compact" &&
          <>

          {isLoggedIn && visibleOptionsOnHeader.length > 0 && (
          <TextButton key={"home"} onClick={() => navigate("/")}>
            Home
          </TextButton>
          )
          }

          {visibleOptionsOnHeader.map((option) => (
              <TextButton key={option} onClick={() => handleAction(option)}>
                {option}
              </TextButton>
            ))}
          </>
        }
      </TextContainer>

        <ButtonsContainer>{renderMenuButtons()}</ButtonsContainer>
      </HeaderContainer>

    {showCompactMenu && responsiveMode === "compact" && (
      <CompactMenu ref={compactMenuRef}>
        {renderCompactMenu()}

      </CompactMenu>
    )}
    </HeaderWrapper>
  );
};

export default Header;