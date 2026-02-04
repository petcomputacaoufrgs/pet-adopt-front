import { useEffect, useState, useRef } from "react";
import { userService, UserFilters } from "../../services";
import { useAuth } from "../../hooks/useAuth";
import { AxiosError } from "axios";
import {
  CloseButton,
  ContentContainer,
  MemberCardsContainer,
  Overlay,
  TopBarContainer,
  TopBarContent,
} from "./styles";

import BannerComponent from "../../components/BannerComponent";
import Breadcrumb from "../../components/BreadCrumb";
import Header from "../../components/Header";
import MembersFilter from "../../components/MembersFilter";
import PaginationButtons from "../../components/PaginationButtons";
import PrimarySecondaryButton from "../../components/PrimarySecondaryButton";
import Toast from "../../components/Toast";
import SectionWithEmptyState from "../../components/SectionWithEmptyState";
import MemberInfoCard from "../../components/MemberInfoCard";


import Footer from "../HomePage/6Footer";
import ConfirmModal from "../../components/ConfirmModal";
import HorizontalLogo from "../../assets/HorizontalLogo.png";
import ManageMembersHamster from "../../assets/ManageMembersHamster.png";
import { useLoaderData } from "react-router-dom";


type ModalAction = { tipo: "aprovar" | "recusar"; membroId: string } | null;

// Interface para definir a estrutura do membro
interface MEMBER {
  _id: string;
  name: string;
  email: string;
  ngoId?: string;
}

const ApproveNGOMembers = () => {


  const { members: membersData, user: userData, meta } = useLoaderData() as { members: MEMBER[]; user: any; meta: { total: number; lastPage: number; page: number; limit: number }; error?: string };

  console.log("Dados do Loader:", { membersData, userData, meta });

  /*estados que guardam informações da ong*/
  const ngoId = userData?.ngoId;

  // Controla a exibição do filtro. Se for `true`, o filtro será ocultado (versões menores da tela) e o botão "filtros" deve ser apertado para mostrá-lo no lado da tela.
  // Se for false ele aparecerá na tela mesmo.
  const [hideMemberFilter, sethideMemberFilter] = useState(window.innerWidth < 1240);


  // Define quando o filtro deve se mostrado no lado da tela (modo mobile ao clicar no botão "filtros").
  const [showMembersFilter, setshowMembersFilter] = useState(false);

  // Estado para armazenar as ONGs
  const [members, setMembers] = useState<MEMBER[]>(membersData || []);
  const [allMembers, setAllMembers] = useState<MEMBER[]>(membersData || []);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Estados para modais e toasts
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fullCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [modalAction, setModalAction] = useState<ModalAction>(null);
  
  // Toast de sucesso
  const [toastType, setToastType] = useState<"aprovar" | "recusar" | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  
  // Toast de erro
  const [errorToast, setErrorToast] = useState<string | null>(null);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorToastVisible, setErrorToastVisible] = useState(false);

 

  /**
   * Função para aprovar ONG
   */
  const ApproveMember = async (memberId: string) => {
    try {
      setIsLoading(true);
      setError("");

      console.log(members);
      console.log("Aprovando membro com ID:", memberId);
      const response = await userService.approve(memberId);

      // Atualiza a lista de ONGs removendo a ONG aprovada
      setMembers(prevMembers => prevMembers.filter(member => member._id !== memberId));

    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        setError(err.response.data?.message || 'Erro ao aprovar Membro.');
      } else {
        setError('Erro de conexão. Tente novamente mais tarde.');
      }
      throw err; //Propagar o erro
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Função para rejeitar membro
   */
  const rejectMember = async (memberId: string) => {
    try {
      setIsLoading(true);
      setError("");

      await userService.delete(memberId);

      // Atualiza a lista de membros removendo o membro rejeitado
      setMembers(prevMembers => prevMembers.filter(member => member._id !== memberId));

    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        setError(err.response.data?.message || 'Erro ao rejeitar Membro.');
        console.log(err);
      } else {
        setError('Erro de conexão. Tente novamente mais tarde.');
      }
      throw err; // Propagar o erro
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Retorna a quantidade de membros que devem ser mostrados por página, de acordo com a largura atual da janela.
   */
  const getMembersPerPage = () => {
    if (window.innerWidth >= 1612) return 9;
    else if (window.innerWidth >= 800) return 6;
    else return 5;
  };

  const [membersPerPage, setPetsPerPage] = useState<number>(getMembersPerPage());
  const [currentPage, setCurrentPage] = useState(1);

  // Define os membros que serão mostradas com base na página atual
  const startIndexShowedMembers = membersPerPage * (currentPage - 1);
  const showedMembers = members.slice(startIndexShowedMembers, startIndexShowedMembers + membersPerPage);
  console.log("Membros para mostrar na página atual:", showedMembers);

  /**
   * Função para resetar toast de sucesso
   */
  const resetToast = () => {
    setToastVisible(false);

    if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    if (fullCloseTimeoutRef.current) clearTimeout(fullCloseTimeoutRef.current);

    setShowToast(false);
    setToastType(null);
  };

  /**
   * Função para mostrar toast de erro
   */
  const showErrorToastMessage = (message: string) => {
    setErrorToast(message);
    setShowErrorToast(true);
    setErrorToastVisible(true);

    // Auto-hide após 4 segundos
    setTimeout(() => {
      setErrorToastVisible(false);
      setTimeout(() => {
        setShowErrorToast(false);
        setErrorToast(null);
      }, 300);
    }, 4000);
  };

  /**
   * Função para mostrar toast de sucesso
   */
  const showSuccessToast = (tipo: "aprovar" | "recusar") => {
    resetToast();
    setToastType(tipo);
    setShowToast(true);

    showTimeoutRef.current = setTimeout(() => setToastVisible(true), 50);
    hideTimeoutRef.current = setTimeout(() => setToastVisible(false), 3000);
    fullCloseTimeoutRef.current = setTimeout(() => {
      setShowToast(false);
      setToastType(null);
    }, 3500);
  };


  console.log(modalAction);

  /**
   * Abrir modal (e fechar toast se estiver aberto)
   */
  const openModal = (tipo: "aprovar" | "recusar", membroId: string) => {
    resetToast();
    setModalAction({ tipo, membroId: membroId });
  };

  /**
   * Confirmar ação
   *
   */
  const handleConfirm = async () => {
    if (!modalAction) return;

    try {
      if (modalAction.tipo === "aprovar") {
        await ApproveMember(modalAction.membroId);
      } else if (modalAction.tipo === "recusar") {
        await rejectMember(modalAction.membroId);
      }
      showSuccessToast(modalAction.tipo);

    } catch (error) {
      // Se der erro, mostra toast de erro
      console.error("Erro na operação:", error);
      
      const errorMessage = modalAction.tipo === "aprovar" 
        ? "Erro ao aprovar Membro. Tente novamente." 
        : "Erro ao rejeitar Membro. Tente novamente.";
      
      showErrorToastMessage(errorMessage);
    } finally {
      setModalAction(null);
    }
  };


  /**
   * Atualiza o estado do layout e quantidade de ONGs por página ao redimensionar a tela
   */
  useEffect(() => {
    const handleResize = () => {
      const isWindowSmall = window.innerWidth < 1240;
      const newmembersPerPage = getMembersPerPage();

      setPetsPerPage(newmembersPerPage);
      sethideMemberFilter(isWindowSmall);

      // Corrige página atual se necessário
      if (allMembers.length > 0 && newmembersPerPage * currentPage > members.length) {
        setCurrentPage(Math.ceil(members.length / newmembersPerPage));
      }

      // Fecha o filtro no lado da tela se a janela for redimensionada para modo desktop
      if (!isWindowSmall && showMembersFilter) {
        setshowMembersFilter(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showMembersFilter, currentPage, members.length]);

  /**
   * Efeito que desativa o scroll do `body` quando o filtro estiver ocupando a tela toda
   */
  useEffect(() => {
    document.body.style.overflow = showMembersFilter ? "hidden" : "";
  }, [showMembersFilter]);


  console.log("Renderizando ApproveNGOMembers");
  console.log(userData);

  return (
    <>
      <BannerComponent limitWidthForImage="850px" color="rgba(178, 243, 255, 1)"  title="Gerencie sua equipe dos sonhos!" subTitle="Veja, organize e acompanhe sua equipe de um jeito simples e prático."   imageUrl={ManageMembersHamster}/>
           
      <TopBarContainer>
        <TopBarContent>
          {hideMemberFilter && (
            <PrimarySecondaryButton 
              onClick={() => setshowMembersFilter(true)} 
              content="Filtros"  
              height = {"48px"} 
              paddingH= {"26px"} />
          )}
          <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Validar Membros" }]} />
        </TopBarContent>
      </TopBarContainer>

      {showMembersFilter && (
        <Overlay>
          <CloseButton onClick={() => setshowMembersFilter(false)}>x</CloseButton>
          <MembersFilter
            hasBorder={false}
          />
        </Overlay>
      )}

      <ContentContainer>
         {!hideMemberFilter && allMembers.length > 0 && (
            <MembersFilter
              hasBorder={true}
          />
          )}

        <div style={{minWidth: hideMemberFilter? "60%" : "50%", width: hideMemberFilter? "80%" : "auto", display: "flex", flexDirection: "column", gap: "36px"}}>
        
           <SectionWithEmptyState 
                title="Administradores"
                subtitle="Escolha os administradores que farão parte da sua ONG"
                emptyMessage="Nenhum Administrador Encontrado"
                expandContainer={hideMemberFilter}
                emptyState={showedMembers.length == 0}
                
            />

          <MemberCardsContainer>

            {showedMembers.length > 0 && showedMembers.map((member) => (
              <MemberInfoCard
                key={member._id}
                member={member}
                showApproveButtons={true}
                showEditOptions = {false}
                onApproveClick={() => openModal("aprovar", member._id)}
                onRejectClick={() => openModal("recusar", member._id)}
              />
            ))}
          </MemberCardsContainer>

        </div>

        {/* Modal de Confirmação */}
        <ConfirmModal
          isOpen={modalAction !== null}
          title={
            modalAction?.tipo === "aprovar"
              ? "Que bom que gostou! Deseja aprovar este Administrador?"
              : "Tem certeza que deseja recusar este Administrador?"
          }
          message={
            modalAction?.tipo === "aprovar"
              ? "Tem certeza de que deseja aprovar este Administrador? Caso mude de ideia, você poderá removê-la depois."
              : "Uma vez recusado, o Administrador sairá da lista de avaliação."
          }
          confirmLabel={modalAction?.tipo === "aprovar" ? "Sim, Aprovar" : "Sim, Recusar"}
          cancelLabel="Cancelar"
          onConfirm={handleConfirm}
          onClose={() => setModalAction(null)}
        />

        {/* Toast de Sucesso */}
        {showToast && toastType && (
          <Toast
            type="success"
            message={`Administrador ${toastType === "aprovar" ? "aprovado" : "recusado"} com sucesso!`}
            description={`${toastType === "aprovar" ? "Você pode ver esse Administrador em Gerenciar Administradores." : "O Administrador foi removido da sua lista de validação."}`}
            onClose={() => {
              setToastVisible(false);
              setTimeout(() => setShowToast(false), 300);
            }}
            isVisible={toastVisible}
          />
        )}

        {/* Toast de Erro */}
        {showErrorToast && errorToast && (
          <Toast
            type="error"
            message="Erro na operação"
            description={errorToast}
            onClose={() => {
              setErrorToastVisible(false);
              setTimeout(() => {
                setShowErrorToast(false);
                setErrorToast(null);
              }, 300);
            }}
            isVisible={errorToastVisible}
          />
        )}
      </ContentContainer>

      <PaginationButtons
        currentPage={currentPage}
        itemsLength={members.length}
        itemsPerPage={membersPerPage}
        buttonHeight="30px"
        buttonWidth="30px"
        containerHeight="160px"
        scrollTo="top-bar"
      />
      
      <Footer />
    </>
  );
};

export default ApproveNGOMembers;
