import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
    Container,
    Main,
    BackButtonContainer,
    InfoCard,
    CardHeader,
    Title,
    TagsContainer,
    InfoContainer,
    InfoElement,
    CardAbout,
    Cards,
    Icon,
    SocialIconsDiv,
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

/* Dados temporários dos animais a serem exibidos na tela.
* Idealmente, no futuro devem ser carregados do backend conforme a página atual.
*/
const pet = { 
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


const PetProfile: React.FC = () => {

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
        if (selected === "Manage Infors") navigate("/manageInfo");
    };

    const currentUserOptions = ["Manage Infors"];

    const currentUserActions = handleUserAction;

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
                            
                        <SocialIconsDiv>

                            <h3> Acompanhe a ONG nas Redes Sociais: </h3>

                            {socialMediaLinks.map((icon, index) => (
                                <a key={index} href={icon.href} target="_blank" rel="noopener noreferrer">
                                <Icon $orange={icon.orange} $brown={icon.brown} aria-label={icon.alt} />
                                </a>
                            ))}
                        </SocialIconsDiv>

                    </InfoCard>

                </Cards>

            </Main>

            <Footer />

        </Container>
    );
};

export default PetProfile;