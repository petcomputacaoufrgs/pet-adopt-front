// imports
import { useEffect, useState, useRef } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { NGO } from "../../types/ngos";
import { ngoService, userService } from "../../services";
import { AxiosError } from "axios";

 
import { useToast } from "../../contexts/ToastContext";

import {
    Container, MiddleContainer, ProfileContainer, NgoCardContainer,
    NgoNameContainer, TextsContainer, ButtonsContainer,
    NgoInformationsContainer, InformationsContainer, SocialIconsDiv, Icon,
    NgoDescriptionContainer, NgoTextsContainer, FormsContainer, NgoFormsContainer,
    SectionWithEmptyStateContainer,EditModalContainer,
    Backdrop, Wrapper
} from "./styles";

import Header from "../../components/Header";
import PrimarySecondaryButton from "../../components/PrimarySecondaryButton";
import Footer from "../HomePage/6Footer";
import SectionWithEmptyState from "../../components/SectionWithEmptyState";
import Toast from "../../components/Toast";
import ConfirmModal from "../../components/ConfirmModal";
import ManageInfoForm from "../../components/ManageNGOInfoForm";

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
    const {ngo: ngoData, isApproved}= useLoaderData() as { ngo: NGO | null, isApproved: boolean | null };


    const {showToast} = useToast();

    const [ngo, setNgo] = useState<NGO | null>(ngoData);
    const navigate = useNavigate();
    const [error, setError] = useState<string>("");
    const {isLoading, user, isLoggedIn, logout} = useAuth();
    const [ModalType, setModalType] =  useState<"excluir" | "recusar" | "aprovar" | null>(null);
    const [isEditModalOpen, setIsEditModalOpen]=useState(false);

    const fetchNgoById = async (id: string) => {
        try {
            const response = await ngoService.getById(id);
            setNgo(response.data);
            console.log(response.data);

            const approvedResponse = await ngoService.isApproved(id);
        } catch (error) {
            console.error("Erro ao buscar ngo:", error);
        }
    };

    const handleApprove = async (id:string) =>{
        setModalType("aprovar");
    }
    const approveNGO = async (ngoId: string) => {
        try {
            const response = await ngoService.approve(ngoId);

        } catch (err) {
            if (err instanceof AxiosError && err.response) {
                setError(err.response.data?.message || 'Erro ao aprovar ONG.');
        } else {
            setError('Erro de conexão. Tente novamente mais tarde.');
        }
        throw err; //Propagar o erro
        }
    };
    const handleApproveConfirm = async () => {
        if (!id) return;
        await approveNGO(id);
        setModalType(null);
    };




    const handleReject= async (id:string) =>{
        setModalType("recusar");
    }
    const rejectNGO = async (ngoId: string) => {
        try {
            await ngoService.delete(ngoId);
            setNgo(null);
        // Atualiza a lista de ONGs removendo a ONG rejeitada
        } catch (err) {
            if (err instanceof AxiosError && err.response) {
                setError(err.response.data?.message || 'Erro ao rejeitar ONG.');
        } else {
            setError('Erro de conexão. Tente novamente mais tarde.');
        }
            throw err; // Propagar o erro
        }
    };
    const handleRejectConfirm = async () => {
        if (!id) return;
        await rejectNGO(id);
        setModalType(null);
    };


    const handleDelete = () => {
        setModalType("excluir");
    };
    const deleteNGO = async (ngoId: string) => {
        try {  
          if(user!=null&&id==user.ngoId){
            
            const id_user = user.id;
            await ngoService.delete(ngoId);
            logout()
          }else{
            await ngoService.delete(ngoId);
          }
          
          showToast({
            success: true,
            message: "ONG excluída com sucesso!",
            description: "A ONG foi removida do sistema.",
          })
          
          
        } catch (err) {
          if (err instanceof AxiosError && err.response) {
            setError(err.response.data?.message || 'Erro ao deletar ONG.');
            showToast({
                success: false,
                message: "Erro ao excluir ONG",
                description: err.response.data?.message || 'Erro ao deletar ONG.',
              })

          } else {
            setError('Erro de conexão. Tente novamente mais tarde.');
            showToast({
                success: false,
                message: "Erro ao excluir ONG",
                description: 'Erro de conexão. Tente novamente mais tarde.',
              })
          }
        }
    };
    const handleDeleteConfirm = async () => {
        if (!id) return;
        await deleteNGO(id);
        setModalType(null);
        setNgo(null);
       
    };

    const handleEdit =() =>{
        setIsEditModalOpen(false);
        if(!id) return;
        fetchNgoById(id);
    }
    
  
    
    useEffect(() => {
    document.body.style.overflow = isEditModalOpen ? "hidden" : "";
    }, [isEditModalOpen]);
    const modalMessages = {
        excluir: {
            title: "Só confirmando, deseja mesmo excluir esse administrador?",
            message: "Tem certeza? Ao excluir, o administrador será removido do sistema permanentemente.",
            confirmLabel: "Sim, excluir",
            onConfirm: handleDeleteConfirm,
        },
        aprovar: {
            title: "Que bom que gostou! Deseja aprovar esta ONG?",
            message: "Tem certeza de que deseja aprovar esta ONG? Caso mude de ideia, você poderá removê-la depois na área de gerenciamento de ONGs.",
            confirmLabel: "Sim, aprovar",
            onConfirm: handleApproveConfirm,
        },
        recusar: {
            title: "Poxa, tem certeza que deseja recusar essa ONG?",
            message: "Tem certeza que quer recusar esta ONG? Após essa ação, não será mais possível visualizá-la.",
            confirmLabel: "Sim, recusar",
            onConfirm: handleRejectConfirm,
        },
        null: {
            title:"",
            message: "",
            confirmLabel:""
        }

    };
    

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
            <MiddleContainer>
            {!isLoading && ngo && (
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
                                                    onClick={handleDelete}
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
                                                    onClick={handleApprove}
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

                </div>
        )}
        { !isLoading && !ngo &&(
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
            {ModalType && (
                <ConfirmModal
                    isOpen={true}
                    title={modalMessages[ModalType].title}
                    message={modalMessages[ModalType].message}
                    confirmLabel={modalMessages[ModalType].confirmLabel}
                    cancelLabel="Cancelar"
                    onConfirm={modalMessages[ModalType].onConfirm}
                    onClose={() => setModalType(null)}
                />
            )}

            {isEditModalOpen && id && (
                
                    <Backdrop>
                    <Wrapper>
                        <EditModalContainer>
                            <ManageInfoForm ngoId={id} onClose={handleEdit} />
                        </EditModalContainer>
                    </Wrapper>
                    </Backdrop>
                )}

            
        </Container>
    );
};

export default NgoProfile;
