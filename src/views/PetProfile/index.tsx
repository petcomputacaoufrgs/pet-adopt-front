import React from "react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
    Container,
    Main,
    PetProfileDiv,
    InfosAction,
    Buttons,
    BackButtonContainer,
    InfoCard,
    CardHeader,
    Title,
    TagsContainer,
    InfoContainer,
    InfoElement,
    CardAbout,
    SocialContainer,
    Cards,
    Icon,
    SocialIconsDiv,
    ViewerContainer,
    ThumbnailGallery,
    ThumbnailWrapper,
    ThumbnailBadge,
    Thumbnail,
    MainImageContainer,
    MainImage,
} from "./styles";

import { ChevronLeft, Info } from 'lucide-react';
import { CircleCheck } from 'lucide-react';
import { PawPrint } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Phone } from 'lucide-react';


import Header from "../../components/Header";
import Footer from "../HomePage/6Footer";
import ActionText from "../../components/ActionText";
import Tag from "../../components/Tags";
import ConfirmModal from "../../components/ConfirmModal";
import SuccessToast from "../../components/SuccessToast";
import GalleryModal from "../../components/GalleryModal";

import loginPageLogo from "../../assets/HorizontalLogo.png";
import DogForCard from "../../assets/HomePageCardDog.png";
import Insta from "../../assets/OrangeInstagramPin.png";
import Facebook from "../../assets/OrangeFacebookPin.png";
import Youtube from "../../assets/OrangeYoutubePin.png";
import Tiktok from "../../assets/OrangeTiktokPin.png";
import InstaB from "../../assets/BrownInstagramPin.png";
import FacebookB from "../../assets/BrownFacebookPin.png";
import YoutubeB from "../../assets/BrownYoutubePin.png";
import TiktokB from "../../assets/BrownTiktokPin.png";
import PrimarySecondaryButton from "../../components/PrimarySecondaryButton";

//importando fotos para galeria
import Image1 from "./images/mel.jpeg";
import Image2 from "./images/mutano1.jpeg";
import Image3 from "./images/salem1.jpeg";
import Image4 from "./images/salem2.jpeg";
import Image5 from "./images/mel2.jpeg";
import Image6 from "./images/mutano2.jpeg";


type ModalAction = { tipo: "excluir"; petId: string } | null;
type GalleryModalAction = { isOpen: boolean; imageIndex: number } | null;

const PetProfile: React.FC = () => {
    /* Dados temporários dos animais a serem exibidos na tela.
    * Idealmente, no futuro devem ser carregados do backend conforme a página atual.
    */
    const pet = { 
        id: "-1",
        image_url: DogForCard, 
        flag: true, 
        specie: "Cachorro", 
        sex: "Fêmea", 
        size: "Porte Médio", 
        name: "Mel", 
        race: "Vira-lata", 
        age: "2", 
        location: "São Paulo, SP", 
        description: "Mel é uma cachorrinha muito carinhosa e brincalhona. Ela adora correr e brincar com outros animais. Está pronta para encontrar um lar cheio de amor e carinho."
    };

    const ong = {
        name: "ONG Adoção Feliz",
        location: "São Paulo, SP",
        contact: "(11) 1234-5678",
        email: "contato@amorpetong.org",
        description: "O Cão Sem Dono é uma ONG (Organização Não Governamental), sem fins lucrativos, e que nasceu de um grande sonho do seu atual presidente: tirar o maior número possível de animais das ruas, dar tratamento adequado e integrá-los a famílias que lhes deem amor, carinho e uma vida digna. /n/nFoi criada informalmente em 2005 na cidade de São Paulo. Seu estatuto foi lançado e registrado em 23 de Abril de 2008, mesmo dia em que obteve seu CNPJ./n/nAtualmente a ONG mantém 2 abrigos (a sede fica em Itapecerica da Serra, SP) com 450 animais que são constantemente tratados por veterinários, alimentados com ração de boa qualidade, bebem água potável, dormem em abrigos especialmente construídos e são tratados com muito amor e carinho por todos os funcionários e voluntários que estão sempre visitando as instalações onde ficam os cães./n/nSua equipe é formada por Presidente, Diretores e 33 colaboradores entre tratadores, veterinários, auxiliares de veterinária, equipe do Bazar, equipe de resgate e a equipe do escritório.",
        social_media: {
            facebook: "https://www.facebook.com",
            instagram: "https://www.instagram.com",
            twitter: "https://twitter.com",
        }
    }

    const petImages = [
        Image1,
        Image2,
        Image3,
        Image4,
        Image5,
        Image6,
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

    const [activeImageIndex, setActiveImageIndex] = useState(0);
    
    const headerOptions = [
    "Sobre Nós",
    "Animais Recém Adicionados",
    "Dicas",
    "Fale Conosco",
    ];

    const handleHeaderAction = (selected: string) => {
    // Ação a ser definida
    };

    const navigate = useNavigate();

    const handleUserAction = (selected: string) => {
        if (selected === "Manage Infos") navigate("/manageInfo");
    };

    const currentUserOptions = ["Manage Infos"];

    const currentUserActions = handleUserAction;

    const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const fullCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [modalAction, setModalAction] = useState<ModalAction>(null);
    const [toastType, setToastType] = useState< "excluir" | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);

    const resetToast = () => {
        setToastVisible(false);

        if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        if (fullCloseTimeoutRef.current) clearTimeout(fullCloseTimeoutRef.current);

        setShowToast(false);
        setToastType(null);
    };

    // Abrir modal (e fechar toast se estiver aberto)
    const abrirModal = (tipo: "excluir", petId: string) => {
        resetToast();
        setModalAction({ tipo, petId });
    };

    // Confirmar ação
    const handleConfirm = () => {
        if (!modalAction) return;
        

        resetToast();
        setToastType(modalAction.tipo);
        setShowToast(true);

        showTimeoutRef.current = setTimeout(() => setToastVisible(true), 50);
        hideTimeoutRef.current = setTimeout(() => setToastVisible(false), 3000);
        fullCloseTimeoutRef.current = setTimeout(() => {
        setShowToast(false);
        setToastType(null);
        }, 3500);

        setModalAction(null);
    };

    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [GalleryModalAction, setGalleryModalAction] = useState<GalleryModalAction>(null);

    const handleIndicatorClick = (index: number) => {
        setCurrentPhotoIndex(index);
        // Aqui você também adicionaria a lógica para trocar a imagem exibida
    };

    const abrirGalleryModal = (isOpen: boolean, imageIndex: number) => {
        setGalleryModalAction({isOpen, imageIndex})
    };

    return (
        <Container>

            <Header
                options={headerOptions}
                optionsToAction={handleHeaderAction}
                color="#FFF6E8"
                Logo={loginPageLogo}
            />

            <Main>

                <BackButtonContainer>
                    <ActionText
                        key={currentUserOptions[0]}
                        fontSize="1rem"
                        textColor="#553525"
                        onClick={() => currentUserActions(currentUserOptions[0])}
                        underlineOnHover={true}
                    >
                        <ChevronLeft size={20}/>
                        <h2> Voltar </h2>

                    </ActionText>
                </BackButtonContainer>

                <PetProfileDiv>

                    <ViewerContainer>
                        <ThumbnailGallery>
                            {petImages.map((image, index) => {
                                if (index < 4) {
                                    return (
                                    <Thumbnail
                                        key={index}
                                        src={image}
                                        alt={`Thumbnail ${index + 1}`}
                                        isActive={index === activeImageIndex}
                                        index={index}
                                        onClick={() => setActiveImageIndex(index)}
                                    />
                                    );
                                }
                                if (index === 4) {
                                    const remaining = petImages.length - 4;
                                    return (
                                    <ThumbnailWrapper key={index}>

                                        <ThumbnailBadge 
                                            onClick={() => {
                                                abrirGalleryModal(true, currentPhotoIndex);
                                                setCurrentPhotoIndex(index);
                                        }}>
                                            <h6>+{remaining}</h6>
                                        </ThumbnailBadge>

                                        <Thumbnail
                                        src={image}
                                        alt={`Thumbnail ${index}`}
                                        isActive={index === activeImageIndex}
                                        index={index}
                                        />
                                    </ThumbnailWrapper>
                                    );
                                }
                                
                                return null;
                                })}
                        </ThumbnailGallery>

                        <MainImageContainer>
                            <MainImage
                                src={petImages[activeImageIndex]}
                            />
                        </MainImageContainer>

                        <GalleryModal
                            isOpen={GalleryModalAction !== null}
                            image={petImages[currentPhotoIndex]}
                            onClose={() => setGalleryModalAction(null)}
                            totalItems={petImages.length}
                            activeIndex={currentPhotoIndex}
                            onIndicatorClick={setCurrentPhotoIndex}
                        />
                        
                    </ViewerContainer>

                    <InfosAction>

                        <Cards>

                            <InfoCard>

                                <CardHeader>
                                    
                                    <Title>
                                        <h1> {pet.name}</h1>

                                        <TagsContainer>

                                            <Tag $text={pet.specie} type={"light"} fontSize={"14px"} />

                                            <Tag $text={pet.sex} type={"light"} fontSize={"14px"} />

                                            <Tag $text={pet.size} type={"light"} fontSize={"14px"} />
                                            <Tag $text={pet.race} type={"light"} fontSize={"14px"} />

                                        </TagsContainer>
                                    </Title>

                                    <InfoContainer>

                                        <InfoElement>
                                            <CircleCheck size={20} color= "#FFFFFF" fill="#FF9944"/>
                                            <h4> Disponivel </h4>
                                        </InfoElement>

                                        <InfoElement>
                                            <PawPrint size={20} color="#FF9944" fill = "#FF9944"/>
                                            <h4> {pet.age} Anos de Idade </h4>
                                        </InfoElement>

                                        <InfoElement>
                                            <PawPrint size={20} color="#FF9944" fill = "#FF9944"/>
                                            <h4> {pet.location} </h4>
                                        </InfoElement>

                                    </InfoContainer>

                                </CardHeader>

                                <CardAbout>
                                    <h2> Sobre o Pet </h2>
                                    <h3> {pet.description} </h3>
                                </CardAbout>

                            </InfoCard>

                            <InfoCard>

                                <CardHeader>
                                    <Title>
                                        <h2> {ong.name} </h2>
                                    </Title>

                                    <InfoContainer>
                                        
                                        <InfoElement>
                                            <MapPin size={20} color="#FFFFFF" fill = "#FF9944"/>
                                            <h4> {ong.location} </h4>
                                        </InfoElement>

                                        <InfoElement>
                                            <Mail size={20} color="#FFFFFF" fill = "#FF9944"/>
                                            <h4> {ong.email} </h4>
                                        </InfoElement>

                                        <InfoElement>
                                            <Phone size={20} color="#FFFFFF" fill = "#FF9944"/>
                                            <h4> {ong.contact} </h4>
                                        </InfoElement>

                                    </InfoContainer>

                                    <h3> 
                                        
                                        {ong.description.length > 280
                                            ? ong.description.slice(0, 280) + "..."
                                            : ong.description
                                        } 

                                        <span
                                            style={{
                                            color: "#563526",
                                            fontWeight: 700,
                                            cursor: "pointer",
                                            marginLeft: 4,
                                            textDecoration: "underline"
                                            }}
                                            onClick={() => navigate("/validateNgoProfile")}
                                        >
                                            Saber Mais
                                        </span>
                                        
                                    </h3>
                                        
                                </CardHeader>  
                                    
                                <SocialContainer>
                                    <h5> Acompanhe a ONG nas Redes Sociais: </h5>
                                    <SocialIconsDiv>

                                        {socialMediaLinks.map((icon, index) => (
                                            <a key={index} href={icon.href} target="_blank" rel="noopener noreferrer">
                                            <Icon $orange={icon.orange} $brown={icon.brown} aria-label={icon.alt} />
                                            </a>
                                        ))}
                                    </SocialIconsDiv>
                                </SocialContainer>

                            </InfoCard>

                        </Cards>
                        
                        <Buttons /*Utilizar o role pra renderizar ou nao os botões*/>
                            <PrimarySecondaryButton width="100%" buttonType="Secundario" content="Excluir" onClick={() => abrirModal("excluir", pet.id)} isDisabled={false}/>
                            <PrimarySecondaryButton width="100%" buttonType="Secundario" content="Editar" onClick={() => navigate("/editAnimal")} isDisabled={false}/>
                        </Buttons>

                        <ConfirmModal
                            isOpen={modalAction !== null}
                            title= "Tem certeza que deseja excluir este pet?"
                            message="Esta ação não poderá ser desfeita. O pet será removido permanentemente do sistema."
                            confirmLabel="Sim, excluir"
                            cancelLabel="Cancelar"
                            onConfirm={handleConfirm}
                            onClose={() => setModalAction(null)}
                        />

                        {showToast && toastType && (
                            <SuccessToast
                                message= "Pet excluído com sucesso!"
                                description= "O pet foi removido do sistema."
                                onClose={() => {
                                    setToastVisible(false);
                                    setTimeout(() => setShowToast(false), 300);
                                }}
                                isVisible={toastVisible}
                            />
                        )}

                    </InfosAction>
                </PetProfileDiv>

            </Main>

            <Footer />

        </Container>
    );
};

export default PetProfile;