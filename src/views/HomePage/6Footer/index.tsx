import { useNavigate, useLocation } from "react-router-dom"; // 1. Importe os hooks
import { useEffect, useState } from "react";

import {
  GridContainer,
  FooterGrid,
  FooterDiv,
  FooterLinks,
  FooterSection,
  SocialIconsDiv,
  Image3,
  Rights,
  RightsContainer,
  Icon,
  SectionTitle,
  PrivacyLink,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from "./styles";

import Logo from "../../../assets/HorizontalLogo.png";
import Insta from "../../../assets/OrangeInstagramPin.png";
import Facebook from "../../../assets/OrangeFacebookPin.png";
import Youtube from "../../../assets/OrangeYoutubePin.png";

import InstaB from "../../../assets/BrownInstagramPin.png";
import FacebookB from "../../../assets/BrownFacebookPin.png";
import YoutubeB from "../../../assets/BrownYoutubePin.png";

const Footer = () => {
  const navigate = useNavigate(); // Hook para navegar
  const location = useLocation(); // Hook para saber onde estamos
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const links1 = [
    { label: "Sobre Nós", href: "about", isNavigation: false },
    { label: "Ver Animais", href: "/searchAnimals", isNavigation: true },
    { label: "Ver ONGs", href: "/listNGOs", isNavigation: true },
    { label: "Dicas", href: "hints", isNavigation: false },
    { label: "Fale Conosco", href: "contact", isNavigation: false },
  ];

  // Corrigido para caminhos absolutos (com / na frente)
  const links2 = [
    { label: "Entrar na conta", href: "/login" },
    { label: "Criar conta", href: "/signup" },
  ];

  const socialMediaLinks = [
    {
      orange: Insta,
      brown: InstaB,
      alt: "Instagram",
      href: "https://www.instagram.com/petcompufrgs/",
    },
    {
      orange: Facebook,
      brown: FacebookB,
      alt: "Facebook",
      href: "https://www.facebook.com/PETCompUFRGS",
    },
    {
      orange: Youtube,
      brown: YoutubeB,
      alt: "YouTube",
      href: "https://www.youtube.com/@PetCompUfrgs",
    }
  ];

  // Efeito para rolar a tela quando a URL mudar (ex: ao chegar na home vindo de outra pág)
  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace("#", "");
      const element = document.getElementById(elementId);
      if (element) {
        // Um pequeno timeout garante que a página montou antes de rolar
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  const handleScrollLink = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();

    if (targetId === "#") return;

    if (location.pathname === "/") {
      // Se já estamos na home, só rola até o elemento
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Se estamos em outra página, navega para a home com o hash
      navigate(`/#${targetId}`);
    }
  };

  const handlePageLink = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <GridContainer id="footer">
      <FooterGrid>
        <FooterDiv>
          <Image3 src={Logo} />
          <p>
            Nosso objetivo é <strong>Alcançar Finais Felizes</strong>,
            proporcionando lares amorosos e seguros para todos os animais.
          </p>
        </FooterDiv>

        <FooterLinks>
          <FooterSection>
            <SectionTitle>Navegação</SectionTitle>
            {links1.map((link, index) => (
              <a
                key={index}
                href={link.isNavigation ? link.href : `/#${link.href}`}
                onClick={(e) => link.isNavigation ? handlePageLink(e, link.href) : handleScrollLink(e, link.href)}
              >
                <p>{link.label}</p>
              </a>
            ))}
          </FooterSection>

          <FooterSection>
            <SectionTitle>Login</SectionTitle>
            {links2.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={(e) => handlePageLink(e, link.href)}
              >
                <p>{link.label}</p>
              </a>
            ))}
          </FooterSection>

          <FooterSection>
            <SectionTitle>Mídias Sociais</SectionTitle>
            <SocialIconsDiv>
              {socialMediaLinks.map((icon, index) => (
                <a
                  key={index}
                  href={icon.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon
                    $orange={icon.orange}
                    $brown={icon.brown}
                    aria-label={icon.alt}
                  />
                </a>
              ))}
            </SocialIconsDiv>
          </FooterSection>
        </FooterLinks>
      </FooterGrid>

      <RightsContainer>
        <Rights>
          <p>© 2024 Pet Adopt. Todos os direitos reservados.</p>
          
          <PrivacyLink onClick={() => setIsPrivacyModalOpen(true)}>
            Política de Privacidade
          </PrivacyLink>

          <p>Desenvolvido por: PET Computação</p>
        </Rights>
      </RightsContainer>

      <ModalOverlay
        $isOpen={isPrivacyModalOpen}
        onClick={() => setIsPrivacyModalOpen(false)}
      >
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <h2>Política de Privacidade</h2>

          <p>
            Na Pet Adopt, valorizamos sua privacidade e nos comprometemos em
            proteger suas informações pessoais. Esta Política de Privacidade
            descreve como coletamos, usamos e protegemos os dados que você
            compartilha conosco.
          </p>

          <h3
            style={{
              fontSize: "1.2em",
              color: "#553525",
              marginTop: "20px",
              marginBottom: "12px",
              fontWeight: 700,
            }}
          >
            Coleta de Informações
          </h3>
          <p>
            Coletamos informações como nome, email, telefone e dados
            relacionados à adoção de animais de estimação. Essas informações são
            fornecidas voluntariamente por você.
          </p>

          <h3
            style={{
              fontSize: "1.2em",
              color: "#553525",
              marginTop: "20px",
              marginBottom: "12px",
              fontWeight: 700,
            }}
          >
            Uso de Informações
          </h3>
          <p>Utilizamos suas informações para:</p>
          <ul>
            <li>Processar sua adoção de animais</li>
            <li>Manter contato sobre atualizações importantes</li>
            <li>Melhorar nossa plataforma e serviços</li>
            <li>Cumprir com obrigações legais</li>
          </ul>

          <h3
            style={{
              fontSize: "1.2em",
              color: "#553525",
              marginTop: "20px",
              marginBottom: "12px",
              fontWeight: 700,
            }}
          >
            Proteção de Dados
          </h3>
          <p>
            Implementamos medidas de segurança apropriadas para proteger suas
            informações contra acesso não autorizado, alteração, divulgação ou
            destruição.
          </p>

          <h3
            style={{
              fontSize: "1.2em",
              color: "#553525",
              marginTop: "20px",
              marginBottom: "12px",
              fontWeight: 700,
            }}
          >
            Contato
          </h3>
          <p>
            Se tiver dúvidas sobre esta Política de Privacidade, entre em
            contato conosco através do formulário "Fale Conosco" em nosso site.
          </p>

          <ModalCloseButton onClick={() => setIsPrivacyModalOpen(false)}>
            Fechar
          </ModalCloseButton>
        </ModalContent>
      </ModalOverlay>
    </GridContainer>
  );
};

export default Footer;
