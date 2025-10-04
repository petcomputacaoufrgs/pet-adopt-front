// imports
import {
    Container, MiddleContainer, ProfileContainer, NgoCardContainer,
    NgoNameContainer, TextsContainer, ButtonsContainer,
    NgoInformationsContainer, InformationsContainer, SocialIconsDiv, Icon,
    NgoDescriptionContainer, NgoTextsContainer, FormsContainer, NgoFormsContainer
} from "./styles";

import Breadcrumb from "../../components/BreadCrumb";
import Header from "../../components/Header";
import PrimarySecondaryButton from "../../components/PrimarySecondaryButton";
import Footer from "../HomePage/6Footer";

import logo from "../../assets/HorizontalLogo.png";

// social icons
import FacebookIcon from "../../assets/OrangeFacebookPin.png"; 
import FacebookBrownIcon from "../../assets/BrownFacebookPin.png"; 
import InstagramPin from "../../assets/OrangeInstagramPin.png"; 
import InstagramBrownPin from "../../assets/BrownInstagramPin.png"; 
import TiktokIcon from "../../assets/OrangeTiktokPin.png"; 
import TiktokBrownIcon from "../../assets/BrownTiktokPin.png"; 
import YoutubePin from "../../assets/OrangeYoutubePin.png"; 
import YoutubeBrownPin from "../../assets/BrownYoutubePin.png"; 
import { useAuth } from "../../hooks/useAuth";

// constants
const HEADER_OPTIONS = ["Sobre Nós", "Animais Recém Adicionados", "Dicas", "Fale Conosco"];
const FORM_TYPES = ["Adoção", "Apadrinhamento", "Lar Temporário", "Reinvidicação"];

const SOCIAL_MEDIA_LINKS = [
    { orange: InstagramPin, brown: InstagramBrownPin, alt: "Instagram", href: "https://www.instagram.com" },
    { orange: FacebookIcon, brown: FacebookBrownIcon, alt: "Facebook", href: "https://www.facebook.com" },
    { orange: YoutubePin, brown: YoutubeBrownPin, alt: "YouTube", href: "https://www.youtube.com" },
    { orange: TiktokIcon, brown: TiktokBrownIcon, alt: "TikTok", href: "https://www.tiktok.com" }
];

const NGO_INFO = [
    "São Pedro da Água Branca",
    "kamille.kpimentel@gmail.com.org",
    "(51) 98765-4321",
    "CPF/CNPJ"
];

const NGO_DESCRIPTION_PARAGRAPHS = [
    "O Cão Sem Dono é uma ONG (Organização Não Governamental), sem fins lucrativos, e que nasceu de um grande sonho do seu atual presidente: tirar o maior número possível de animais das ruas, dar tratamento adequado e integrá-los a famílias que lhes deem amor, carinho e uma vida digna.",
    "Foi criada informalmente em 2005 na cidade de São Paulo. Seu estatuto foi lançado e registrado em 23 de Abril de 2008, mesmo dia em que obteve seu CNPJ.",
    "Atualmente a ONG mantém 2 abrigos (a sede fica em Itapecerica da Serra, SP) com 450 animais que são constantemente tratados por veterinários, alimentados com ração de boa qualidade, bebem água potável, dormem em abrigos especialmente construídos e são tratados com muito amor e carinho por todos os funcionários e voluntários que estão sempre visitando as instalações onde ficam os cães.",
    "Sua equipe é formada por Presidente, Diretores e 33 colaboradores entre tratadores, veterinários, auxiliares de veterinária, equipe do Bazar, equipe de resgate e a equipe do escritório."
];

// component
const ManageNgoProfile = () => {
    const {isLoading, user, isLoggedIn} = useAuth();
    if(isLoading)
        return null;
    
    return (
        <Container>
            <Header
                color="#FFF6E8"
                Logo={logo}
                isLoggedIn={isLoggedIn}
                user={user}
            />

            <MiddleContainer>
                <Breadcrumb items={[{ label: "< Voltar", to: "/" }]} /> 

                <ProfileContainer>
                    <NgoCardContainer>
                        <NgoNameContainer>
                            <TextsContainer>
                                {window.innerWidth > 768 && <p>Ong</p>}
                                <h1>Nome da ONG</h1>
                                <a href="#">Ver Site Institucional da ONG</a>
                            </TextsContainer>

                            <ButtonsContainer>
                                <PrimarySecondaryButton
                                    width="100%"
                                    paddingV="8px"
                                    paddingH="25px"
                                    buttonType="Secundário"
                                    content="Recusar"
                                    onClick={() => {}}
                                />
                                <PrimarySecondaryButton
                                    width="100%"
                                    paddingV="8px"
                                    paddingH="25px"
                                    buttonType="Primário"
                                    content="Aceitar"
                                    onClick={() => {}}
                                />
                            </ButtonsContainer>
                        </NgoNameContainer>

                        <NgoInformationsContainer>
                            <InformationsContainer>
                                {NGO_INFO.map((info, i) => <p key={i}>{info}</p>)}
                            </InformationsContainer>

                            <SocialIconsDiv>
                                {SOCIAL_MEDIA_LINKS.map(({ href, orange, brown, alt }, index) => (
                                    <a key={index} href={href} target="_blank" rel="noopener noreferrer">
                                        <Icon $orange={orange} $brown={brown} aria-label={alt} />
                                    </a>
                                ))}
                            </SocialIconsDiv>
                        </NgoInformationsContainer>
                    </NgoCardContainer>

                    <NgoDescriptionContainer>
                        <NgoTextsContainer>
                            <h3>Descrição</h3>
                            {NGO_DESCRIPTION_PARAGRAPHS.map((text, idx) => <p key={idx}>{text}</p>)}
                        </NgoTextsContainer>

                        <NgoFormsContainer>
                            <h3>Formulário da ONG</h3>
                            <FormsContainer>
                                {FORM_TYPES.map((formType, index) => (
                                    <div key={index}>
                                        {formType}
                                        <PrimarySecondaryButton
                                            width="100%"
                                            height="24px"
                                            paddingV="0px"
                                            paddingH="0px"
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
