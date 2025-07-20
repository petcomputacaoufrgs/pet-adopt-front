import {Container,
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

import logo from "../../assets/HorizontalLogo.png";
import Insta from "../../assets/OrangeInstagramPin.png";
import Facebook from "../../assets/OrangeFacebookPin.png";
import Youtube from "../../assets/OrangeYoutubePin.png";
import Tiktok from "../../assets/OrangeTiktokPin.png";
import InstaB from "../../assets/BrownInstagramPin.png";
import FacebookB from "../../assets/BrownFacebookPin.png";
import YoutubeB from "../../assets/BrownYoutubePin.png";
import TiktokB from "../../assets/BrownTiktokPin.png";

import Header from "../../components/Header";
import Footer from "../HomePage/6Footer";
import PrimarySecondaryButton from "../../components/PrimarySecondaryButton";

const ManageNgoProfile = () => {
    const headerOptions = ["Sobre Nós", "Animais Recém Adicionados", "Dicas", "Fale Conosco"]
    const handleHeaderAction = (selected: string) => {} 

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
       <Container>
            <Header options={headerOptions} optionsToAction={handleHeaderAction} color="rgba(0, 0, 0, 0)" Logo={logo} />

            <MiddleContainer>
                <Voltar>Voltar</Voltar>

                <ProfileContainer>
                    <NgoCardContainer>
                        <NgoNameContainer>
                            <TextsContainer>
                                <p>Ong</p>
                                <h1>Nome da ONG</h1>
                                <a href="">Ver Site Institucional da ONG</a>
                            </TextsContainer>

                            <ButtonsContainer>
                                <PrimarySecondaryButton
                                    width="100%"
                                    buttonType="Secundário"
                                    content="Recusar"
                                    onClick=""
                                />
                                <PrimarySecondaryButton
                                    width="100%"
                                    buttonType="Primário"
                                    content="Aprovar"
                                    onClick=""
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
                                {socialMediaLinks.map((icon, index) => (
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
                                <div>
                                    Adoção
                                    <PrimarySecondaryButton
                                        width="170px"
                                        buttonType="Ver Formulário"
                                        content="Excluir ONG"
                                        onClick=""
                                    />
                                </div>
                                <div>
                                    Apadrinhamento
                                    <PrimarySecondaryButton
                                        width="170px"
                                        buttonType="Ver Formulário"
                                        content="Excluir ONG"
                                        onClick=""
                                    />
                                </div>
                                <div>
                                    Lar Temporário
                                    <PrimarySecondaryButton
                                        width="170px"
                                        buttonType="Ver Formulário"
                                        content="Excluir ONG"
                                        onClick=""
                                    />
                                </div>
                                <div>
                                    Reinvidicação
                                    <PrimarySecondaryButton
                                        width="170px"
                                        buttonType="Ver Formulário"
                                        content="Excluir ONG"
                                        onClick=""
                                    />
                                </div>
                            </FormsContainer>

                        </NgoFormsContainer>
                    </NgoDescriptionContainer>
                </ProfileContainer>
            </MiddleContainer>
            <Footer/>
       </Container> 
    )}



export default ManageNgoProfile;