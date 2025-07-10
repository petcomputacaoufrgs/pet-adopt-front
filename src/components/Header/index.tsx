import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {HeaderContainer, 
        Image, 
        TextButton, 
        TextContainer, 
        ButtonsContainer,
        CompactedMenuButton,
        CompactMenu,
        SocialIconsDiv,
        Icon} from "./styles";

import { IHeader } from "./types"

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




const Header = ({color, user, Logo, options, optionsToAction}: IHeader) => {
    const navigate = useNavigate();



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



    const handleLoginClick = () => {
        navigate("/login");
      };
    
    const handleSignupClick = () => {
        navigate("/signup");
    };

  
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);




  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  const getResponsiveMode = () => {
    if (windowWidth >= 1480) return "full";
    if (windowWidth >= 900) return "partial";
    return "compact";
  };

  const responsiveMode = getResponsiveMode();

  const [showCompactMenu, setShowCompactMenu] = useState(false)

  useEffect(() => {
    if(showCompactMenu)
      setShowCompactMenu(responsiveMode == "compact")
  }, [windowWidth])


  const handleClickOnCompactButton = () => {
    setShowCompactMenu(!showCompactMenu);
  }

    return(
      <div style={{backgroundColor: showCompactMenu? "white" : color, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", width: "100%"}}>
        <HeaderContainer $backgroundColor = {"transparent"}>
            
            <Image src = {Logo}/>
            
            <TextContainer>

                { responsiveMode != "compact" &&
                  options.map((option) => {
                    return (
                      <TextButton onClick={() => optionsToAction(option)}>{option}</TextButton>
                    )
                  })
                }

            </TextContainer>

            <ButtonsContainer>
            {(responsiveMode == "full")? 

            <>
                <PrimarySecondaryButton width={"284px"} buttonType={"Primário"} isDisabled={false} content={"Cadastrar ONG ou Membro"} onClick={handleSignupClick} />
                <PrimarySecondaryButton width={"151px"} buttonType={"Primário"} isDisabled={false} content={"Fazer Login"} onClick={handleLoginClick} />
            </>
    
            :

            (responsiveMode == "partial")?

            <DropdownButton content={<svg width="17" height="24" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 13.5H15H2ZM2 7.5H15H2ZM2 1.5H15H2Z"/>
                <path d="M2 13.5H15M2 7.5H15M2 1.5H15" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>} onClick={() => {}} options={["Cadastrar ONG ou Membro", "Fazer Login"]} dropDownWidth="250px"/>

              :

            <CompactedMenuButton onClick={handleClickOnCompactButton}>
              <svg width="17" height="24" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 13.5H15H2ZM2 7.5H15H2ZM2 1.5H15H2Z"/>
                <path d="M2 13.5H15M2 7.5H15M2 1.5H15" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </CompactedMenuButton>

            }

            </ButtonsContainer>

        </HeaderContainer>


        <CompactMenu $visible={showCompactMenu}>

          {showCompactMenu &&
          <>
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", width: "100%" }}>
            <PrimarySecondaryButton
              width="45%"
              buttonType="Primário"
              isDisabled={false}
              content="Cadastrar ONG ou Membro"
              onClick={handleSignupClick}
            />
            <PrimarySecondaryButton
              width="45%"
              buttonType="Primário"
              isDisabled={false}
              content="Fazer Login"
              onClick={handleLoginClick}
            />
          </div>

          <div style={{display: "flex", flexDirection: "column", gap: "24px", width: "100%", alignItems: "center"}}>
          {options.map((option) => (
            <TextButton key={option} onClick={() => optionsToAction(option)}>
              {option}
            </TextButton>
          ))}
          </div>


        <SocialIconsDiv>
        {socialMediaLinks.map((icon, index) => (
          <a key={index} href={icon.href} target="_blank" rel="noopener noreferrer">
            <Icon $orange={icon.orange} $brown={icon.brown} aria-label={icon.alt} />
          </a>
        ))}
        </SocialIconsDiv>

        </>}
        </CompactMenu>
      
        
      </div>
    );
};

export default Header;