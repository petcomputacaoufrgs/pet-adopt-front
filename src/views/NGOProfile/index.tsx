// imports
import { useEffect, useState } from "react";
import { useFetcher, useLoaderData, useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
 
import { useToast } from "../../contexts/ToastContext";

import {
    Container, MiddleContainer, ProfileContainer, NgoCardContainer,
    NgoNameContainer, TextsContainer, ButtonsContainer,
    NgoInformationsContainer, InformationsContainer, SocialIconsDiv, Icon,
    NgoDescriptionContainer, NgoTextsContainer, FormsContainer, NgoFormsContainer,
    SectionWithEmptyStateContainer,EditModalContainer,
    Backdrop, Wrapper,
    ButtonLink
} from "./styles";

import PrimarySecondaryButton from "../../components/PrimarySecondaryButton";
import Footer from "../HomePage/6Footer";
import SectionWithEmptyState from "../../components/SectionWithEmptyState";
import ConfirmModal from "../../components/ConfirmModal";
import ManageInfoForm from "../../components/ManageNGOInfoForm";


// social icons
import FacebookIcon from "../../assets/OrangeFacebookPin.png"; 
import FacebookBrownIcon from "../../assets/BrownFacebookPin.png"; 
import InstagramPin from "../../assets/OrangeInstagramPin.png"; 
import InstagramBrownPin from "../../assets/BrownInstagramPin.png"; 
import TiktokIcon from "../../assets/OrangeTiktokPin.png"; 
import TiktokBrownIcon from "../../assets/BrownTiktokPin.png"; 
import XIcon from "../../assets/XIcon.png"
import XBrownIcon from "../../assets/XBrownIcon.png"

import type { NGO } from "../../types/ngos";

import { useRevalidator } from "react-router-dom";
import type { User } from "../../types/user";


type ModalTypes = "excluir" | "recusar" | "aprovar";

// component
const NgoProfile = () => {
    const { id } = useParams<{ id: string }>();
    const {ngo, isApproved}= useLoaderData() as { ngo: NGO | null, isApproved: boolean | null };
    const { user } = useRouteLoaderData("root") as { user: User | null }; 

    
    const fetcher = useFetcher();


    const {showToast} = useToast();

    const navigate = useNavigate();
    const {logout} = useAuth();
    const [modalType, setModalType] =  useState<ModalTypes | null>(null);
    const [isEditModalOpen, setIsEditModalOpen]=useState(false);


    // Isso aqui serve para revalidar os dados da ONG após a edição.
    // Isso só é necessário porque nosso componente ManageInfoForm é isolado e lida com a requisição de update por conta própria
    // (faz a requisição diretamente, sem passar pela Action do React Router).
    // Se quiséssemos evitar isso, teríamos que mover a lógica de update para uma Action
    const revalidator = useRevalidator();

    const isSubmitting = fetcher.state !== "idle";

// Escuta a resposta da Action Factory (createCrudAction)
    useEffect(() => {
        if (fetcher.state === 'idle' && fetcher.data) {
            
            // Tratamento de Erro vindo da Action
            if (fetcher.data.error) {
                showToast({
                    success: false,
                    message: "Erro na operação",
                    description: fetcher.data.error
                });
                setModalType(null); // Fecha o modal mesmo com erro
                return;
            }

            // Tratamento de Sucesso
            if (fetcher.data.success) {
                setModalType(null); // Fecha o modal

                switch (fetcher.data.type) {
                    case 'aprovar':
                        showToast({
                            success: true,
                            message: "ONG aprovada!",
                            description: "A ONG agora está ativa no sistema."
                        });

                        fetcher.reset();
                        break;

                    case 'recusar':
                        showToast({
                            success: true,
                            message: "ONG recusada.",
                            description: "A solicitação foi removida."
                        });

                        fetcher.reset();
                        navigate('/approveNgo'); // Redireciona após recusar
                        break;

                    case 'delete': // "delete" é o intent que sua factory retorna
                        showToast({
                            success: true,
                            message: "ONG excluída.",
                            description: "Registro removido com sucesso."
                        });
                        
                        fetcher.reset();
                        
                        // Lógica especial de Logout se o usuário deletou a própria ONG
                        if (user && id === user.ngoId) {
                            logout();
                        } else {
                            navigate('/listNGOs'); // Ou para onde quiser voltar
                        }
                        break;
                }
            }
        }
    }, [fetcher.state, fetcher.data, navigate, showToast, user, id, logout]);

    // 5. HANDLER ÚNICO
    // Mapeia o tipo do modal para o "intent" que sua Factory espera
    const handleConfirm = () => {
        if (!modalType || !id) return;

        const intentMap: Record<ModalTypes, string> = {
            aprovar: "aprovar",
            recusar: "recusar",
            excluir: "delete" // Sua factory espera "delete" para exclusão
        };

        fetcher.submit(
            { intent: intentMap[modalType], id: id },
            { method: "post" }
        );
    };

    // Configuração dos textos do Modal (Mantive a sua lógica, só organizada)
    const getModalConfig = () => {
        switch (modalType) {
            case "excluir":
                return {
                    title: "Só confirmando, deseja mesmo excluir esta ONG?",
                    message: "Tem certeza? Ao excluir, ela será removida permanentemente.",
                    confirmLabel: isSubmitting ? "Excluindo..." : "Sim, excluir",
                    cancelLabel: "Cancelar"
                };
            case "aprovar":
                return {
                    title: "Que bom que gostou! Deseja aprovar esta ONG?",
                    message: "Tem certeza? Ela ficará visível publicamente.",
                    confirmLabel: isSubmitting ? "Aprovando..." : "Sim, aprovar",
                    cancelLabel: "Cancelar"
                };
            case "recusar":
                return {
                    title: "Poxa, tem certeza que deseja recusar essa ONG?",
                    message: "Após essa ação, não será mais possível visualizá-la.",
                    confirmLabel: isSubmitting ? "Recusando..." : "Sim, recusar",
                    cancelLabel: "Cancelar"
                };
            default:
                return null;
        }
    };

    const modalConfig = getModalConfig();


    const handleEdit =() =>{
        setIsEditModalOpen(false);
        if(!id) return;
        revalidator.revalidate();
    }
    
    
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
            <MiddleContainer>
            {ngo && (
                    <div>
                        <ProfileContainer>
                            <NgoCardContainer>
                                <NgoNameContainer>
                                    <TextsContainer>
                                        {window.innerWidth > 768 && <p>ONG</p>}
                                        <h1>{ngo?.name}</h1>
                                        {ngo.website &&(<a href={ngo.website}>Ver Site Institucional da ONG</a>)}
                                    </TextsContainer>
                                    
                                    
                                    
                                        <ButtonsContainer>
                                            {user !== null && ((user.role === "NGO_ADMIN" && user.ngoId===ngo._id) || user.role==="ADMIN") && isApproved && (
                                                <PrimarySecondaryButton
                                                    width="100%"
                                                    paddingV="8px"
                                                    paddingH="25px"
                                                    buttonType="Secundário"
                                                    content="Excluir ONG"
                                                    onClick={() => {setModalType("excluir")}}
                                                />
                                            )}
                                            {user !== null && user.role === "NGO_ADMIN" && user.ngoId===ngo._id && isApproved && (
                                                <PrimarySecondaryButton
                                                    width="100%"
                                                    paddingV="8px"
                                                    paddingH="25px"
                                                    buttonType="Primário"
                                                    content="Editar ONG"
                                                    onClick={() => {setIsEditModalOpen(true)}}
                                                />
                                            )}
                                        </ButtonsContainer>

                                    { user !== null && user.role === "ADMIN" && !isApproved &&
                                        <ButtonsContainer>
                                                <PrimarySecondaryButton
                                                    width="100%"
                                                    paddingV="8px"
                                                    paddingH="25px"
                                                    buttonType="Secundário"
                                                    content="Aceitar ONG"
                                                    onClick={() => setModalType("aprovar")}
                                                />
                                            
                                                <PrimarySecondaryButton
                                                    width="100%"
                                                    paddingV="8px"
                                                    paddingH="25px"
                                                    buttonType="Primário"
                                                    content="Recusar ONG"
                                                    onClick={() => setModalType("recusar")}
                                                />
                                            
                                        </ButtonsContainer>

                                    }
                                                                     
                                </NgoNameContainer>
                                
                                <NgoInformationsContainer>
                                    <InformationsContainer>
                                        <p>{ngo.city ? `${ngo.city}, ` : ''} {ngo.state}</p>
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
                                    <h3>Formulários da ONG</h3>
                                    <FormsContainer>
{ngo.adoptionForm &&(
                                            <div>
                                                Adoção
                                                <ButtonLink href={ngo.adoptionForm} target="_blank" rel="noopener noreferrer">
                                                    <PrimarySecondaryButton
                                                        width="100%"
                                                        height="34px"
                                                        paddingV="0px"
                                                        paddingH="0px"
                                                        buttonType="Secundário"
                                                        content="Ver Formulário"
                                                        onClick={() => {}}
                                                    />
                                                </ButtonLink>
                                            </div>
                                        )}

                                        {ngo.temporaryHomeForm &&(
                                            <div>
                                                Lar Temporário
                                                <ButtonLink href={ngo.temporaryHomeForm} target="_blank" rel="noopener noreferrer">
                                                    <PrimarySecondaryButton
                                                        width="100%"
                                                        height="34px"
                                                        paddingV="0px"
                                                        paddingH="0px"
                                                        buttonType="Secundário"
                                                        content="Ver Formulário"
                                                        onClick={() => {}}
                                                    />
                                                </ButtonLink>
                                            </div>
                                        )}

                                        {ngo.sponsorshipForm &&(
                                            <div>
                                                Apadrinhamento
                                                <ButtonLink href={ngo.sponsorshipForm} target="_blank" rel="noopener noreferrer">
                                                    <PrimarySecondaryButton
                                                        width="100%"
                                                        height="34px"
                                                        paddingV="0px"
                                                        paddingH="0px"
                                                        buttonType="Secundário"
                                                        content="Ver Formulário"
                                                        onClick={() => {}}
                                                    />
                                                </ButtonLink>
                                            </div>
                                        )}
                                        
                                        {ngo.claimForm &&(
                                            <div>
                                                Reivindicação
                                                <ButtonLink href={ngo.claimForm} target="_blank" rel="noopener noreferrer">
                                                    <PrimarySecondaryButton
                                                        width="100%"
                                                        height="34px"
                                                        paddingV="0px"
                                                        paddingH="0px"
                                                        buttonType="Secundário"
                                                        content="Ver Formulário"
                                                        onClick={() => {}}
                                                    />
                                                </ButtonLink>
                                            </div>
                                        )}
                                    </FormsContainer>
                                </NgoFormsContainer>
                            </NgoDescriptionContainer>
                        </ProfileContainer>

                </div>
        )}
        { !ngo &&(
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
                    }}
                />
            </SectionWithEmptyStateContainer>
            </div>

        ) }
        </MiddleContainer>

            <Footer />
            {modalConfig && modalType && (
                <ConfirmModal
                    isOpen={true}
                    title={modalConfig.title}
                    message={modalConfig.message}
                    confirmLabel={modalConfig.confirmLabel}
                    cancelLabel={modalConfig.cancelLabel}
                    onConfirm={handleConfirm}
                    onClose={() => setModalType(null)}
                    disabled={isSubmitting}
                />
            )}

            {isEditModalOpen && ngo && user && (
                
                    <Backdrop>
                    <Wrapper>
                        <EditModalContainer>
                           {<ManageInfoForm initialData={ngo} user={user} onClose={handleEdit}  />}
                        </EditModalContainer>
                    </Wrapper>
                    </Backdrop>
                )}

            
        </Container>
    );
};

export default NgoProfile;
