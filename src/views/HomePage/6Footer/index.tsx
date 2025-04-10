import {
    GridContainer,
    FooterGrid,
    FooterDiv,
    FooterLinks,
    FooterSection,
    SocialIconsDiv,
    Image3,
    Rights,
    Image
  } from "./styles";
    
  import Logo from "../../../assets/HorizontalLogo.png";
  import Insta from "../../../assets/InstaPin.png";
  import Facebook from "../../../assets/FacebookPin.png";
  import Youtube from "../../../assets/YoutubePin.png";
  import Tiktok from "../../../assets/TiktokPin.png";
  
  const Footer = () => {
    const links1 = [
      "Institucional",
      "Sobre Nós",
      "Animais Recém Adicionados",
      "Dicas",
      "Fale Conosco",
      "Cadastrar ONG",
      "Política de Privacidade"
    ];
  
    const links2 = [
      "Login",
      "Sou Administrador",
      "Sou uma ONG",
      "Sou Membro de ONG"
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
              {links1.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </FooterSection>
    
            <FooterSection>
              {links2.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </FooterSection>
    
            <FooterSection>
              <p>Mídias Sociais</p>
              <SocialIconsDiv>
                <Image src={Insta}/>
                <Image src={Facebook}/>
                <Image src={Youtube}/>
                <Image src={Tiktok}/>
              </SocialIconsDiv>
            </FooterSection>
          </FooterLinks>
        </FooterGrid>
            
        <Rights>
          <p>© 2024 Pet Adopt. Todos os direitos reservados.</p>
          <p>Desenvolvido por: Pet Computação</p>
        </Rights>
      </GridContainer>
    );
  };
  
  export default Footer;
  