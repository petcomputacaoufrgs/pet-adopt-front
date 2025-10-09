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


type ModalAction = { tipo: "aprovar" | "recusar"; membroId: string } | null;

// Interface para definir a estrutura do membro
interface MEMBER {
  id: string;
  name: string;
  email: string;
  ngoId?: string;
}

const ApproveNGOMembers = () => {

  /*estados que guardam informações da ong*/
  const { user, isLoggedIn} = useAuth();
  const ngoId = useAuth().user?.ngoId;

    
  /**
   * Estados que representam os filtros aplicados às ONGs.
   * Cada um armazena uma característica diferente usada para filtrar as ONGs.
   */
  const [name, setName] = useState<string>("");


  // Controla a exibição do filtro. Se for `true`, o filtro será ocultado (versões menores da tela) e o botão "filtros" deve ser apertado para mostrá-lo no lado da tela.
  // Se for false ele aparecerá na tela mesmo.
  const [hideMemberFilter, sethideMemberFilter] = useState(window.innerWidth < 1240);


  // Define quando o filtro deve se mostrado no lado da tela (modo mobile ao clicar no botão "filtros").
  const [showMembersFilter, setshowMembersFilter] = useState(false);

  // Estado para armazenar as ONGs
  const [members, setMembers] = useState<MEMBER[]>([]);
  const [allMembers, setAllMembers] = useState<MEMBER[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
   * Função para buscar todas as ONGs do backend
   */
  const fetchMembers = async (filters?: UserFilters) => {
    
    try {
      
      if (!ngoId) {
        setError("ID da ONG não encontrado");
        return;
      }
      setIsLoading(true);
      setError("");
      
       const response = await userService.getUnapprovedMembers(ngoId, filters);
      // Mapear os dados para garantir que tenham o campo 'id'
      const mappedMembers = response.data.map((member: any) => ({
        ...member,
        id: member._id || member.id,
      }));
      
      setMembers(mappedMembers);

      if (!filters || Object.keys(filters).length === 0) {
          setAllMembers(mappedMembers); // salva lista completa para autocomplete
      }
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        setError(err.response.data?.message || 'Erro ao carregar Membros.');
      } else {
        setError('Erro de conexão. Tente novamente mais tarde.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
       * Callback para quando o usuário pesquisar
       */
      const handleSearch = (filters: { name: string}) => {
        const userFilters: UserFilters = {};
        
        if (filters.name) userFilters.name = filters.name;
        
        console.log('🔍 Aplicando filtros:', userFilters);
        fetchMembers(userFilters);
        setCurrentPage(1); // Resetar para primeira página
      };
    
      /**
       * Callback para quando o usuário limpar filtros
       */
      const handleClearFilters = () => {
        console.log('🧹 Limpando filtros');
        fetchMembers(); // Buscar sem filtros
        setCurrentPage(1); // Resetar para primeira página
      };
    
  

  /**
   * Função para aprovar ONG
   */
  const ApproveMember = async (memberId: string) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await userService.approve(memberId);

      // Atualiza a lista de ONGs removendo a ONG aprovada
      setMembers(prevMembers => prevMembers.filter(member => member.id !== memberId));

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
      setMembers(prevMembers => prevMembers.filter(member => member.id !== memberId));

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
   * Efeito para buscar ONGs quando o componente for montado
   */
   useEffect(() => {
    console.log(ngoId);
    if (ngoId) fetchMembers();
  }, [ngoId]);

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
      if (showedMembers.length > 0 && newmembersPerPage * currentPage > members.length) {
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

  /**
   * Opções exibidas no header da aplicação
   */
  const headerOptions = ["Sobre Nós", "Animais Recém Adicionados", "Dicas", "Fale Conosco"];


  return (
    <>
      <Header color="#FFF6E8" Logo={HorizontalLogo} user={user} isLoggedIn={isLoggedIn} />
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
          <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Aprovar Membros" }]} />
        </TopBarContent>
      </TopBarContainer>

      {showMembersFilter && (
        <Overlay>
          <CloseButton onClick={() => setshowMembersFilter(false)}>x</CloseButton>
          <MembersFilter
            members={members.map(member => member.name)}
            name={name}
            setName={setName}
            hasBorder={false}
            onSearch={handleSearch}
            onClearFilters={handleClearFilters}
          />
        </Overlay>
      )}

      <ContentContainer>
         {!hideMemberFilter && showedMembers.length > 0 && (
            <MembersFilter
              members={members.map(member => member.name)}
              name={name}
              setName={setName}
              hasBorder={false}
              onSearch={handleSearch}
              onClearFilters={handleClearFilters}
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
                key={member.id}
                member={member}
                showApproveButtons={true}
                showEditOptions = {false}
                onApproveClick={() => openModal("aprovar", member.id)}
                onRejectClick={() => openModal("recusar", member.id)}
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
        setCurrentPage={setCurrentPage}
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
