import {
  GridContainer,
  FooterGrid,
  FooterDiv,
  FooterLinks,
  FooterSection,
  SocialIconsDiv,
  Image3,
  Rights,
  Icon} from "./styles";

import Logo from "../../../assets/HorizontalLogo.png";
import Insta from "../../../assets/OrangeInstagramPin.png";
import Facebook from "../../../assets/OrangeFacebookPin.png";
import Youtube from "../../../assets/OrangeYoutubePin.png";
import Tiktok from "../../../assets/OrangeTiktokPin.png";

import InstaB from "../../../assets/BrownInstagramPin.png";
import FacebookB from "../../../assets/BrownFacebookPin.png";
import YoutubeB from "../../../assets/BrownYoutubePin.png";
import TiktokB from "../../../assets/BrownTiktokPin.png";

const Footer = () => {
  const links1 = [
    { label: "Institucional", href: "#" },
    { label: "Sobre Nós", href: "#" },
    { label: "Animais Recém Adicionados", href: "#" },
    { label: "Dicas", href: "#" },
    { label: "Fale Conosco", href: "#" },
    { label: "Cadastrar ONG", href: "#" },
    { label: "Política de Privacidade", href: "#" }
  ];

  const links2 = [
    { label: "Login", href: "#" },
    { label: "Sou Administrador", href: "#" },
    { label: "Sou uma ONG", href: "#" },
    { label: "Sou Membro de ONG", href: "#" }
  ];

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
  
  return (
    <GridContainer>
      <FooterGrid>
        <FooterDiv>
          <Image3 src={Logo} />
          <p>
            Nosso objetivo é <strong>Alcançar Finais Felizes</strong>, proporcionando lares amorosos e seguros para todos os animais.
          </p>
        </FooterDiv>

        <FooterLinks>
          <FooterSection>
            {links1.map((link, index) => (
              <a key={index} href={link.href}><p>{link.label}</p></a>
            ))}
          </FooterSection>

          <FooterSection>
            {links2.map((link, index) => (
              <a key={index} href={link.href}><p>{link.label}</p></a>
            ))}
          </FooterSection>

          <FooterSection>
            <p>Mídias Sociais</p>
            <SocialIconsDiv>
            {socialMediaLinks.map((icon, index) => (
              <a key={index} href={icon.href} target="_blank" rel="noopener noreferrer">
                <Icon $orange={icon.orange} $brown={icon.brown} aria-label={icon.alt} />
              </a>
            ))}
            </SocialIconsDiv>
          </FooterSection>
        </FooterLinks>
      </FooterGrid>

      <Rights>
        <p>© 2024 Pet Adopt. Todos os direitos reservados.</p>
        <p>Desenvolvido por: PET Computação</p>
      </Rights>
    </GridContainer>
  );
};

export default Footer;
