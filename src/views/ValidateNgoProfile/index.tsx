import {
    Container,
    MiddleContainer,
    Voltar,
    ProfileContainer,
    NgoCardContainer,
    NgoNameContainer,
    TextsContainer,
    ButtonsContainer,
    NgoInformationsContainer,
    InformationsContainer,
    SocialIconsDiv,
    Icon,
    NgoDescriptionContainer,
    NgoTextsContainer,
    FormsContainer,
    NgoFormsContainer
} from "./styles";

import Header from "../../components/Header";
import PrimarySecondaryButton from "../../components/PrimarySecondaryButton";
import Footer from "../HomePage/6Footer";

import logo from "../../assets/HorizontalLogo.png";

import FacebookIcon from "../../assets/OrangeFacebookPin.png"; 
import FacebookBrownIcon from "../../assets/BrownFacebookPin.png"; 
import InstagramPin from "../../assets/OrangeInstagramPin.png"; 
import InstagramBrownPin from "../../assets/BrownInstagramPin.png"; 
import TiktokIcon from "../../assets/OrangeTiktokPin.png"; 
import TiktokBrownIcon from "../../assets/BrownTiktokPin.png"; 
import YoutubePin from "../../assets/OrangeYoutubePin.png"; 
import YoutubeBrownPin from "../../assets/BrownYoutubePin.png"; 


const HEADER_OPTIONS = ["Sobre Nós", "Animais Recém Adicionados", "Dicas", "Fale Conosco"];
const FORM_TYPES = ["Adoção", "Apadrinhamento", "Lar Temporário", "Reinvidicação"];

const SOCIAL_MEDIA_LINKS = [
    { orange: InstagramPin, brown: InstagramBrownPin, alt: "Instagram", href: "https://www.instagram.com" },
    { orange: FacebookIcon, brown: FacebookBrownIcon, alt: "Facebook", href: "https://www.facebook.com" },
    { orange: YoutubePin, brown: YoutubeBrownPin, alt: "YouTube", href: "https://www.youtube.com" },
    { orange: TiktokIcon, brown: TiktokBrownIcon, alt: "TikTok", href: "https://www.tiktok.com" }
];

const ManageNgoProfile = () => {
    const handleHeaderAction = (selected: string) => { }

    return (
        <Container>
            <Header
                options={HEADER_OPTIONS}
                optionsToAction={handleHeaderAction}
                color="rgba(0, 0, 0, 0)"
                Logo={logo}
            />

            <MiddleContainer>
                <Voltar>Voltar</Voltar>

                <ProfileContainer>
                    <NgoCardContainer>
                        <NgoNameContainer>
                            <TextsContainer>
                                <p>Ong</p>
                                <h1>Nome da ONG</h1>
                                <a href="#">Ver Site Institucional da ONG</a>
                            </TextsContainer>

                            <ButtonsContainer>
                                <PrimarySecondaryButton
                                    width="100%"
                                    buttonType="Secundário"
                                    content="Recusar"
                                    onClick={() => {}}
                                />
                                <PrimarySecondaryButton
                                    width="100%"
                                    buttonType="Primário"
                                    content="Aceitar"
                                    onClick={() => {}}
                                />
                            </ButtonsContainer>
                        </NgoNameContainer>

                        <NgoInformationsContainer>
                            <InformationsContainer>
                                <p>São Pedro da Água Branca</p>
                                <p>contato@amorpetong.org</p>
                                <p>(51) 98765-4321</p>
                                <p>CPF/CNPJ</p>
                            </InformationsContainer>

                            <SocialIconsDiv>
                                {SOCIAL_MEDIA_LINKS.map((icon, index) => (
                                    <a key={index} href={icon.href} target="_blank" rel="noopener noreferrer">
                                        <Icon $orange={icon.orange} $brown={icon.brown} aria-label={icon.alt} />
                                    </a>
                                ))}
                            </SocialIconsDiv>
                        </NgoInformationsContainer>
                    </NgoCardContainer>

                    <NgoDescriptionContainer>
                        <NgoTextsContainer>
                            <h3>Descrição</h3>
                            <p>Texto aqui</p>
                        </NgoTextsContainer>

                        <NgoFormsContainer>
                            <h3>Formulário da ONG</h3>

                            <FormsContainer>
                                {FORM_TYPES.map((formType, index) => (
                                    <div key={index}>
                                        {formType}
                                        <PrimarySecondaryButton
                                            width="170px"
                                            buttonType="Secundário"
                                            content="Ver Formulário"
                                            onClick={() => {}}
                                        />
                                    </div>
                                ))}
                            </FormsContainer>
                        </NgoFormsContainer>
                    </NgoDescriptionContainer>
                </ProfileContainer>
            </MiddleContainer>

            <Footer />
        </Container>
    );
};

export default ManageNgoProfile;