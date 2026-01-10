import React, { useTransition } from "react";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
    ButtonLink,
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
import SuccessToast from "../../components/Toast";
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


import { useAuth } from "../../hooks/useAuth";
import { Pet } from "../../types/pets";
import { petService } from "../../services";
import { ngoService } from "../../services";
import { useToast } from "../../contexts/ToastContext";
import { imageHelper } from '../../services/helpers/imageHelper';
import Breadcrumb from "../../components/BreadCrumb";

type ModalAction = { tipo: "excluir"; petId: string } | null;
type GalleryModalAction = { isOpen: boolean; imageIndex: number } | null;

const PetProfile: React.FC = () => {




    const { id } = useParams<{ id: string }>();
    const [pet, setPet] = useState<Pet | null>(null);
    const [ngo, setNgo] = useState<any>(null);

    const [finalImages, setFinalImages] = useState<string[]>([]); // Use State para a tela atualizar

    console.log(pet);
    const { showToast } = useToast();

     const breadcrumbItems = [
    { label: 'Home', to: '/' },
    { label: 'Animais', to: '/searchAnimals' }, // O "Pai" oficial dessa página
    { label: pet ? pet.name : 'Detalhes' }  // A página atual
    ];

    const fetchPetById = async (id: string) => {
        try {
            const response = await petService.getById(id);
            setPet(response.data);

        } catch (error) {
            console.error("Erro ao buscar pet:", error);
        }
    };

    const fetchNgoById = async (id: string) => {
        try {
            const response = await ngoService.getById(id);
            setNgo(response.data);
        } catch (error) {
            console.error("Erro ao buscar ong:", error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchPetById(id);
        }
    }, [id]);

    useEffect(() => {
    if (pet && pet.ngoId && pet.photos && pet.photos.length > 0) {
        
        // Função auxiliar para checar uma única imagem (Lógica igual ao useImage, mas com Promise)
        const checkImage = (photoPath: string): Promise<string> => {
            return new Promise((resolve) => {
                const fullUrl = imageHelper.getFullImageUrl(photoPath);
                const img = new Image();

                img.onload = () => resolve(fullUrl); // Sucesso: retorna URL completa
                img.onerror = () => resolve(DogForCard); // Erro: retorna Fallback
                
                img.src = fullUrl;
            });
        };

        // Processa todas as imagens em paralelo
        const processAllImages = async () => {
            const promises = pet.photos.map(photo => checkImage(photo));
            const results = await Promise.all(promises);
            
            setFinalImages(results); // Atualiza o estado com as URLs válidas
        };

        processAllImages();

        fetchNgoById(pet.ngoId);
    }
}, [pet]);

    

    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const navigate = useNavigate();
    const [isPending, startTransition] = useTransition();
    const handleNavigation = (to: string) => {
        startTransition(() => {
        navigate(to);
        });
    }

    const handleUserAction = (selected: string) => {
        if (selected === "Manage Infos") handleNavigation("/manageInfo");
    };

    const currentUserOptions = ["Manage Infos"];

    const currentUserActions = handleUserAction;


    const [modalAction, setModalAction] = useState<ModalAction>(null);

    // Abrir modal (e fechar toast se estiver aberto)
    const abrirModal = (tipo: "excluir", petId: string) => {
        setModalAction({ tipo, petId });
    };

    // Confirmar ação
    const handleConfirm = () => {

        if (!modalAction) return;

        petService.delete(modalAction.petId as string).then(
            () => {
            console.log("Pet excluído com sucesso");

            showToast({ 
                success: true,
                message: "Pet excluído com sucesso!",
                description: "O pet foi removido do sistema."
            }
            );

            handleNavigation("/manageAnimals");
            },
            (error) => {
            console.error("Erro ao excluir pet:", error);
            showToast({ 
                success: false,
                message: "Erro ao excluir pet",
                description: error || "Ocorreu um erro ao tentar excluir o pet."
            }
            );
            }
        );

        setModalAction(null);
    };

    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [GalleryModalAction, setGalleryModalAction] = useState<GalleryModalAction>(null);


    const abrirGalleryModal = (isOpen: boolean, imageIndex: number) => {
        setGalleryModalAction({isOpen, imageIndex})
    };

    const {isLoading, user, isLoggedIn} = useAuth();
    if(isLoading)
        return null;

    if (!pet) {
        return <div>Carregando...</div>;
    }

    const specieLookUpTable : Record<string, string> = {
        "DOG": "Cachorro",
        "CAT": "Gato",
        "OTHER": "Outro"
    }

    const sexLookUpTable : Record<string, string> = {
        "M": "Macho",
        "F": "Fêmea",
        "O": "Outro"
    }

    const sizeLookUpTable : Record<string, string> = {
        "P": "Pequeno",
        "M": "Médio",
        "G": "Grande"
    }
    
    console.log(pet);
    console.log(ngo);


    return (
        <Container>

            <Header
                color="#FFF6E8"
                Logo={loginPageLogo}
                user={user}
                isLoggedIn={isLoggedIn}
            />

            <Main>

                <BackButtonContainer>
                    <Breadcrumb items={breadcrumbItems} />
                </BackButtonContainer>

                <PetProfileDiv>

                    <ViewerContainer>
                        <ThumbnailGallery>
                            {finalImages.map((image, index) => {
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
                                    const remaining = finalImages.length - 4;
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
                                src={finalImages[activeImageIndex]}
                                style={{cursor: 'pointer'}}
                                onClick={() => {abrirGalleryModal(true, activeImageIndex); setCurrentPhotoIndex(activeImageIndex);}}
                            />



                            {pet && ngo && (
                        <>
                            {(() => {
                            // Condição para Adotar: Pet disponível E ONG tem formulário
                            const showAdoptionBtn = pet.forAdoption && ngo.adoptionForm;
                            
                            // Condição para Lar Temporário: Pet disponível E ONG tem formulário
                            const showTempHomeBtn = pet.forTempHome && ngo.temporaryHomeForm;

                            // Se nenhum dos dois estiver disponível, não renderiza o container <Buttons>
                            if (!showAdoptionBtn && !showTempHomeBtn) return null;

                            // Função auxiliar para abrir o link externo
                            const openForm = (url: string) => {
                                if (url) window.open(url, '_blank');
                            };

                            return (
                                <Buttons>
                                {showAdoptionBtn && (
                                    <ButtonLink href={ngo.adoptionForm} target="_blank" rel="noopener noreferrer">
                                        <PrimarySecondaryButton 
                                        width="100%" 
                                        buttonType="Primário"
                                        content="Quero Adotar" 
                                        onClick={() => {}} 
                                        isDisabled={false}
                                        paddingV="10px"
                                        />
                                    </ButtonLink>
                                )}

                                {showTempHomeBtn && (
                                    <PrimarySecondaryButton 
                                    width="100%" 
                                    buttonType="Secundario" 
                                    content="Lar Temporário" 
                                    onClick={() => openForm(ngo.temporaryHomeForm)} 
                                    isDisabled={false}
                                    paddingV="10px"
                                    />
                                )}
                                </Buttons>
                            );
                            })()}
                        </>
                        )}



                        </MainImageContainer>

                        <GalleryModal
                            isOpen={GalleryModalAction !== null}
                            image={finalImages[currentPhotoIndex]}
                            onClose={() => setGalleryModalAction(null)}
                            totalItems={finalImages.length}
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

                                            <Tag $text={specieLookUpTable[pet.species]} type={"light"} fontSize={"14px"} />

                                            <Tag $text={sexLookUpTable[pet.sex]} type={"light"} fontSize={"14px"} />

                                            {pet.size && <Tag $text={sizeLookUpTable[pet.size]} type={"light"} fontSize={"14px"} />}
                                            {pet.breed && <Tag $text={pet.breed} type={"light"} fontSize={"14px"} />}

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
                                            <h4> {pet.city}, {pet.state}</h4>
                                        </InfoElement>

                                    </InfoContainer>

                                </CardHeader>

                                <CardAbout>
                                    <h2> Sobre o Pet </h2>
                                    <h3> {pet.characteristics} </h3>
                                </CardAbout>

                            </InfoCard>

                            <InfoCard>

                                <CardHeader>
                                    <Title>
                                        <h2> {ngo?.name} </h2>
                                    </Title>

                                    <InfoContainer>
                                        
                                        <InfoElement>
                                            <MapPin size={20} color="#FFFFFF" fill = "#FF9944"/>
                                            <h4> {ngo?.location} </h4>
                                        </InfoElement>

                                        <InfoElement>
                                            <Mail size={20} color="#FFFFFF" fill = "#FF9944"/>
                                            <h4> {ngo?.email} </h4>
                                        </InfoElement>

                                        <InfoElement>
                                            <Phone size={20} color="#FFFFFF" fill = "#FF9944"/>
                                            <h4> {ngo?.contact} </h4>
                                        </InfoElement>

                                    </InfoContainer>

                                    <h3>{ngo?.description}</h3>
                                        
                                </CardHeader>  
                                
                                {
                                <SocialContainer>
                                    <h5> Acompanhe a ONG nas Redes Sociais: </h5>
                                    <SocialIconsDiv>

                                        {
                                            ngo && (ngo.facebook || ngo.instagram) && (

                                            <>
                                            
                                            {
                                                ngo.instagram && (
                                                    <a href={`${ngo.instagram}`} target="_blank" rel="noopener noreferrer">
                                                        <Icon $orange={Insta} $brown={InstaB} aria-label="Instagram" />
                                                    </a>
                                                )
                                            }

                                            {
                                                ngo.facebook && (
                                                    <a href={`${ngo.facebook}`} target="_blank" rel="noopener noreferrer">
                                                        <Icon $orange={Facebook} $brown={FacebookB} aria-label="Facebook" />
                                                    </a>
                                                )
                                            }
     
                                            </>

                                            )
                                        }

                                    </SocialIconsDiv>
                                </SocialContainer>
                            }


                                    <a
                                        style={{
                                        color: "#563526",
                                        fontWeight: 700,
                                        cursor: "pointer",
                                        marginLeft: 4,
                                        textDecoration: "underline",
                                        width: "fit-content"
                                        }}

                                        href={`/ngoProfile/${ngo?._id}`}
                                    >
                                        Saber Mais ➙
                                    </a>

                            </InfoCard>

                        </Cards>

                        {(((user?.role === "NGO_MEMBER" || user?.role === "NGO_ADMIN") && user.ngoId == pet.NGO) || user?.role === "ADMIN") &&

                        

                        <Buttons /*Utilizar o role pra renderizar ou nao os botões*/>
                            <PrimarySecondaryButton width="100%" buttonType="Secundario" content="Excluir" onClick={() => abrirModal("excluir", pet._id as string)} isDisabled={false}/>
                            <PrimarySecondaryButton width="100%" buttonType="Secundario" content="Editar" onClick={() => handleNavigation(`/editAnimal/${pet._id}`)} isDisabled={false}/>
                        </Buttons>
                        }

                        

                        <ConfirmModal
                            isOpen={modalAction !== null}
                            title= "Tem certeza que deseja excluir este pet?"
                            message="Esta ação não poderá ser desfeita. O pet será removido permanentemente do sistema."
                            confirmLabel="Sim, excluir"
                            cancelLabel="Cancelar"
                            onConfirm={handleConfirm}
                            onClose={() => setModalAction(null)}
                        />


                    </InfosAction>
                </PetProfileDiv>

            </Main>

            <Footer />

        </Container>
    );
};

export default PetProfile;