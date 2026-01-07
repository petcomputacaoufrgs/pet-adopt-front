// imports
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { NGO } from "../../types/ngos";
import { ngoService } from "../../services";

 

import {
    Container, MiddleContainer, ProfileContainer, NgoCardContainer,
    NgoNameContainer, TextsContainer, ButtonsContainer,
    NgoInformationsContainer, InformationsContainer, SocialIconsDiv, Icon,
    NgoDescriptionContainer, NgoTextsContainer, FormsContainer, NgoFormsContainer,
    SectionWithEmptyStateContainer,
} from "./styles";

import Header from "../../components/Header";
import PrimarySecondaryButton from "../../components/PrimarySecondaryButton";
import Footer from "../HomePage/6Footer";
import SectionWithEmptyState from "../../components/SectionWithEmptyState";




import logo from "../../assets/HorizontalLogo.png";

// social icons
import FacebookIcon from "../../assets/OrangeFacebookPin.png"; 
import FacebookBrownIcon from "../../assets/BrownFacebookPin.png"; 
import InstagramPin from "../../assets/OrangeInstagramPin.png"; 
import InstagramBrownPin from "../../assets/BrownInstagramPin.png"; 
import TiktokIcon from "../../assets/OrangeTiktokPin.png"; 
import TiktokBrownIcon from "../../assets/BrownTiktokPin.png"; 
import XIcon from "../../assets/XIcon.png"
import XBrownIcon from "../../assets/XBrownIcon.png"

// component
const NgoProfile = () => {
    const { id } = useParams<{ id: string }>();
    const [ngo, setNgo] = useState<NGO | null>(null);
    const [isApprovedNGO, setIsApprovedNGO] = useState<boolean | null>(null);
    const navigate = useNavigate();
      
    

    const fetchNgoById = async (id: string) => {
        try {
            const response = await ngoService.getById(id);
            setNgo(response.data);

            const approvedResponse = await ngoService.isApproved(id);
            setIsApprovedNGO(approvedResponse.data.approved);
            console.log(isApprovedNGO)
        } catch (error) {
            console.error("Erro ao buscar ngo:", error);
        }
    };

    const handleAccept = async (id:string) =>{

    }

    const handleReject= async (id:string) =>{

    }

    const handleEdit = async (id:string) =>{

    }

    const handleDelete = async (id:string) =>{

    }




    useEffect(() => {
        if (id) {
            fetchNgoById(id);
        }
    }, [id]);


    const {isLoading, user, isLoggedIn} = useAuth();
    console.log(user);
    if(isLoading)
        return null;
    

      // Configurar links das redes sociais baseado nos dados da ONG
    const socialMediaLinks = [
        {
        orange: InstagramPin,
        brown: InstagramBrownPin,
        alt: "Instagram",
        href: ngo?.instagram,
        available: !!ngo?.instagram
        },
        {
        orange: FacebookIcon,
        brown: FacebookBrownIcon,
        alt: "Facebook",
        href: ngo?.facebook,
        available: !!ngo?.facebook
        },
        {
        orange: TiktokIcon,
        brown: TiktokBrownIcon,
        alt: "TikTok",
        href: ngo?.tiktok,
        available: !!ngo?.tiktok
        },
        {
            orange: XIcon,
            brown: XBrownIcon,
            alt: "X",
            href: ngo?.x,
            available: !!ngo?.x
        },
    ].filter(social => social.available); // Mostrar apenas redes sociais disponíveis


    return (
        <Container>
            <Header
                color="#FFF6E8"
                Logo={logo}
                isLoggedIn={isLoggedIn}
                user={user}
            />
            <MiddleContainer>
            {!isLoading && ngo && (
                    <div>
                    {(isApprovedNGO||(user!==null&&user.role==="ADMIN")) &&(
                        <ProfileContainer>
                            <NgoCardContainer>
                                <NgoNameContainer>
                                    <TextsContainer>
                                        {window.innerWidth > 768 && <p>ONG</p>}
                                        <h1>{ngo?.name}</h1>
                                        {ngo.website &&(<a href="{ngo.website}">Ver Site Institucional da ONG</a>)}
                                    </TextsContainer>
                                    
                                    
                                    {isApprovedNGO && (
                                        <ButtonsContainer>
                                            {user !== null && ((user.role === "NGO_ADMIN" && user.ngoId===ngo._id) || user.role==="ADMIN")&& (
                                                <PrimarySecondaryButton
                                                    width="100%"
                                                    paddingV="8px"
                                                    paddingH="25px"
                                                    buttonType="Secundário"
                                                    content="Excluir ONG"
                                                    onClick={handleDelete}
                                                />
                                            )}
                                            {user !== null && user.role === "NGO_ADMIN" && user.ngoId===ngo._id &&(
                                                <PrimarySecondaryButton
                                                    width="100%"
                                                    paddingV="8px"
                                                    paddingH="25px"
                                                    buttonType="Primário"
                                                    content="Editar ONG"
                                                    onClick={handleEdit}
                                                />
                                            )}
                                        </ButtonsContainer>
                                    )}
                                    {!isApprovedNGO && (
                                        <ButtonsContainer>
                                                <PrimarySecondaryButton
                                                    width="100%"
                                                    paddingV="8px"
                                                    paddingH="25px"
                                                    buttonType="Secundário"
                                                    content="Aceitar ONG"
                                                    onClick={handleAccept}
                                                />
                                            
                                                <PrimarySecondaryButton
                                                    width="100%"
                                                    paddingV="8px"
                                                    paddingH="25px"
                                                    buttonType="Primário"
                                                    content="Recusar ONG"
                                                    onClick={handleReject}
                                                />
                                            
                                        </ButtonsContainer>
                                    )}
                                                                     
                                </NgoNameContainer>
                                
                                <NgoInformationsContainer>
                                    <InformationsContainer>
                                        <p>{ngo.city}</p>
                                        <p>{ngo.email}</p>
                                        <p>{ngo.phone}</p>
                                        <p>{ngo.document}</p>
                                    </InformationsContainer>

                                    {socialMediaLinks.length > 0 && (
                                        <SocialIconsDiv>
                                        {socialMediaLinks.map(({ href, orange, brown, alt }, index) => (
                                            <a key={index} href={href} target="_blank" rel="noopener noreferrer">
                                            <Icon $orange={orange} $brown={brown} aria-label={alt} />
                                            </a>
                                        ))}
                                        </SocialIconsDiv>
                                    )}
                                </NgoInformationsContainer>
                            </NgoCardContainer>
                            
                            <NgoDescriptionContainer>
                                {ngo.description &&(
                                    <NgoTextsContainer>
                                        <h3>Descrição</h3>
                                        <p>{ngo.description}</p>
                                    </NgoTextsContainer>
                                )}
                                <NgoFormsContainer>
                                    <h3>Formulário da ONG</h3>
                                    <FormsContainer>
                                        {ngo.adoptionForm &&(
                                            <div>
                                                Adoção
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
                                        )}

                                        {ngo.temporaryHomeForm &&(
                                            <div>
                                                Lar Temporário
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
                                        )}

                                        {ngo.sponsorshipForm &&(
                                            <div>
                                                Apadrinhamento
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
                                        )}
                                        {ngo.claimForm &&(
                                            <div>
                                                Reivindicação
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
                                        )}
                                    </FormsContainer>
                                </NgoFormsContainer>
                            </NgoDescriptionContainer>
                        </ProfileContainer>
                    )}
                </div>
        )}
        { !isLoading && (!ngo || (!isApprovedNGO && (user!== null && user.role!=="ADMIN"))) &&(
            <div>
            <SectionWithEmptyStateContainer>
                <SectionWithEmptyState 
                    title="Procurando uma ong específica?"
                    subtitle=""
                    emptyMessage="A ONG não está disponível"
                    emptyState={true}
                    buttonText="Voltar para a página inicial"
                    onButtonClick={() => {
                        navigate("/")
                    console.log("Navegando para criar pet");
                    }}
                />
            </SectionWithEmptyStateContainer>
            </div>

        ) }
        </MiddleContainer>
            <Footer />
        </Container>
    );
};

export default NgoProfile;
