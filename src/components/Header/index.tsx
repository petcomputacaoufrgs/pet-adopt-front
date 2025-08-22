import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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

const Header = ({ color, user, Logo, options, optionsToAction }: IHeader) => {
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

  const navigate = useNavigate();

  const handleUserAction = (selected: string) => {
    if (selected === "Cadastrar ONG ou Membro") navigate("/signup");
    else if (selected === "Fazer Login") navigate("/login");
  };

  const currentUserOptions = user
    ? user.userOptions
    : ["Cadastrar ONG ou Membro", "Fazer Login"];

  const currentUserActions = user
    ? user.userOptionsToActions
    : handleUserAction;

  const standardUserOptionsButtonWidth = ["284px", "151px"];

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  type ResponsiveMode = "full" | "partial" | "compact";

  const getResponsiveMode = (): ResponsiveMode => {
    if (windowWidth >= 1480) return "full";
    if (windowWidth >= 900) return "partial";
    return "compact";
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

  const renderCompactMenu = () => (
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
              paddingH="5px"
              paddingV="10px"
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

  const renderMenuButtons = () => {
    if (responsiveMode === "full") {
      return user ? (
        <DropdownButton
          buttonType="Secundário"
          content={`Olá, ${user.name}`}
          options={user.userOptions}
          onClick={user.userOptionsToActions}
        />
      ) : (
        <>
          {currentUserOptions.map((option: string, index) => (
            <PrimarySecondaryButton
              key={option}
              width={standardUserOptionsButtonWidth[index]}
              buttonType={index === 0 ? "Secundário" : "Primário"}
              isDisabled={false}
              content={option}
              onClick={() => currentUserActions(option)}
              paddingH="5px"
              paddingV="10px"
            />
          ))}
        </>
      );
    }

    if (responsiveMode === "partial") {
      return (
        <DropdownButton
          buttonType={user ? "Secundário" : "Primário"}
          content={user ? `Olá, ${user.name}` : MenuIcon}
          onClick={currentUserActions}
          options={currentUserOptions}
          dropDownWidth="250px"
        />
      );
    }

    if (responsiveMode === "compact") {
      return (
        <CompactedMenuButton onClick={handleClickOnCompactButton} $highlighted={showCompactMenu}>
          {MenuIcon}
        </CompactedMenuButton>
      );
    }
  };

  const [isScrolled, setScrolled] = useState(false);
  const isScrolledRef = useRef(false);

  useEffect(() => {
    isScrolledRef.current = isScrolled;
  }, [isScrolled]);
  

  const handleScroll = () => {
    const scrollY = window.pageYOffset;
    const currentlyScrolled = isScrolledRef.current;

    if (!currentlyScrolled && scrollY > 60) {
      setScrolled(true);
    } else if (currentlyScrolled && scrollY < 10) {
      setScrolled(false);
    }
  };

  useEffect(() => {
      window.addEventListener('scroll', handleScroll);

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);


  return (

    <HeaderWrapper $shrink={isScrolled} $showCompactMenu={showCompactMenu} $color={color}>
      <HeaderContainer $shrink={isScrolled} $backgroundColor={"transparent"}>
        <Image src={Logo} />

        <TextContainer>
          {responsiveMode !== "compact" &&
            options.map((option) => (
              <TextButton key={option} onClick={() => optionsToAction(option)}>
                {option}
              </TextButton>
            ))}
        </TextContainer>

        <ButtonsContainer>{renderMenuButtons()}</ButtonsContainer>
      </HeaderContainer>

      <CompactMenu $visible={showCompactMenu}>
        {showCompactMenu && renderCompactMenu()}
      </CompactMenu>
    </HeaderWrapper>
  );
};

export default Header;