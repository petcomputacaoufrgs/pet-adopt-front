import {
  GridContainer,
  Image1Div,
  Image2Div,
  CardDiv,
  Image1,
  Image2,
  ContactContent,
  ContactText,
  ContactSection,
  ContactSectionTitle,
  ContactLink,
  SocialIconsDiv,
  SocialIcon,
} from "./styles";

import ContactCard from "../../../components/ContactCard";

import Gatinhos from "../../../assets/HomePageCat.png";
import Lines from "../../../assets/HomePageLinesContact.png";
import Insta from "../../../assets/OrangeInstagramPin.png";
import Facebook from "../../../assets/OrangeFacebookPin.png";
import Youtube from "../../../assets/OrangeYoutubePin.png";

const socialMediaLinks = [
  {
    href: "https://www.instagram.com/petcompufrgs/",
    alt: "Instagram",
    icon: Insta,
  },
  {
    href: "https://www.facebook.com/PETCompUFRGS",
    alt: "Facebook",
    icon: Facebook,
  },
  {
    href: "https://www.youtube.com/@PetCompUfrgs",
    alt: "YouTube",
    icon: Youtube,
  },
];

const Contact = () => {
  return (
    <GridContainer id="contact">
      <Image1Div>
        <Image1 src={Gatinhos} />
      </Image1Div>

      <Image2Div>
        <Image2 src={Lines} />
      </Image2Div>

      <CardDiv>
        <ContactCard
          title="Fale Conosco"
          subtitle=""
          position="center"
          backgroundColor="#FFF6E8"
        >
          <ContactContent>
            <ContactText>
              Entre em contato com o PET Computação UFRGS por meio dos canais abaixo.
            </ContactText>

            <ContactSection>
              <ContactSectionTitle>E-mail</ContactSectionTitle>
              <ContactLink href="mailto:petcompufrgs@gmail.com">
                petcompufrgs@gmail.com
              </ContactLink>
            </ContactSection>

            <ContactSection>
              <ContactSectionTitle>Site do PET Computação</ContactSectionTitle>
              <ContactLink href="https://petcompufrgs.com.br/" target="_blank" rel="noopener noreferrer">
                petcompufrgs.com.br
              </ContactLink>
            </ContactSection>

            <ContactSection>
              <ContactSectionTitle>Mídias Sociais</ContactSectionTitle>
              <SocialIconsDiv>
                {socialMediaLinks.map((item) => (
                  <a key={item.alt} href={item.href} target="_blank" rel="noopener noreferrer">
                    <SocialIcon src={item.icon} alt={item.alt} />
                  </a>
                ))}
              </SocialIconsDiv>
            </ContactSection>
          </ContactContent>
        </ContactCard>
      </CardDiv>
    </GridContainer>
  );
};

export default Contact;