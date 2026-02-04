import React, { useState, useEffect } from "react";
import { useLoaderData, useSearchParams, useFetcher, useNavigation } from "react-router-dom";

// Componentes
import Header from "../../components/Header";
import BannerComponent from "../../components/BannerComponent";
import Breadcrumb from "../../components/BreadCrumb";
import PaginationButtons from "../../components/PaginationButtons";
import PrimarySecondaryButton from "../../components/PrimarySecondaryButton";
import Toast from "../../components/Toast";
import MemberInfoCard from '../../components/MemberInfoCard';
import Footer from "../HomePage/6Footer";
import ConfirmModal from "../../components/ConfirmModal";
import SectionWithEmptyState from "../../components/SectionWithEmptyState";
import MembersFilter from "../../components/MembersFilter"; // Seu novo filtro refatorado

// Assets e Estilos
import ManageMembersHamster from "../../assets/ManageMembersHamster.png";
import {
  CloseButton, ContentContainer, NGOCardsContainer, Overlay,
  TopBarContainer, TopBarContent, Msg
} from "./styles";
import { User } from "../../types/user";
import { useToast } from "../../contexts/ToastContext";

// Tipagem do Loader Data
interface LoaderData {
  members: User[];
  user: User;
  totalItems: number;
  error?: string;
  meta: {
    total: number;
    lastPage: number;
    page: number;
    limit: number;
  };

}

const ManageNGOMembers: React.FC = () => {

  // DADOS: Vêm do Loader
  const { members: membersData, user: userData, meta } = useLoaderData() as LoaderData;

  // HOOKS DO ROUTER
  const [searchParams, setSearchParams] = useSearchParams();
  const fetcher = useFetcher(); 
  const navigation = useNavigation();
  
  // Loading global (ao navegar/filtrar) ou local (ao deletar)
  const isLoadingPage = navigation.state === "loading";
  const isDeleting = fetcher.state !== "idle";

  // LÓGICA DE PAGINAÇÃO & RESPONSIVIDADE
  const currentPage = Number(searchParams.get("page") || "1");

  // State local apenas para controlar layout UI
  const [hideMembersFilter, setHideMembersFilter] = useState(window.innerWidth < 1240);
  const [showMembersFilterOnSide, setShowMembersFilterOnSide] = useState(false);

  // lISTTENER DE RESIZE PARA O FILTRO
  useEffect(() => {
    const handleResize = () => {
      const isWindowSmall = window.innerWidth < 1240;
      setHideMembersFilter(isWindowSmall);
      
      if (!isWindowSmall && showMembersFilterOnSide) {
        setShowMembersFilterOnSide(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Bloqueio de scroll do filtro no mobile
  useEffect(() => {
    document.body.style.overflow = showMembersFilterOnSide ? "hidden" : "";
  }, [showMembersFilterOnSide]);


  // LÓGICA DE DELEÇÃO (VIA FETCHER)
  const [memberToDelete, setMemberToDelete] = useState<User | null>(null);

  const { showToast } = useToast();

  // Monitora a resposta da Action de Delete
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      if (fetcher.data.success) {

        showToast({
          success: true,
          message: "Administrador excluído com sucesso!",
          description: "O administrador foi removido do sistema."
        });

        setMemberToDelete(null); // Fecha o modal
      } else if (fetcher.data.error) {
        showToast({
          success: false,
          message: "Erro ao excluir administrador.",
          description: fetcher.data.error
        });

        setMemberToDelete(null); // Fecha o modal
      }
    }
  }, [fetcher.state, fetcher.data]);

  const handleDeleteConfirm = () => {
    if (!memberToDelete) return;
    // Dispara o POST para a action
    fetcher.submit(
      { intent: "delete", memberId: memberToDelete.id }, 
      { method: "post" }
    );
  };


  return (
    <div>
      <BannerComponent 
        limitWidthForImage="850px" 
        color="rgba(178, 243, 255, 1)"  
        title="Gerencie sua equipe dos sonhos!" 
        subTitle="Veja, organize e acompanhe sua equipe de um jeito simples e prático."   
        imageUrl={ManageMembersHamster}
      />
      
      <Msg>
        {isLoadingPage && <p>Carregando...</p>}
      </Msg>

      <TopBarContainer id="top-bar">
        <TopBarContent>
          {hideMembersFilter && (
            <PrimarySecondaryButton 
              onClick={() => setShowMembersFilterOnSide(true)} 
              content="Filtros"  
              height={"48px"} 
              paddingH={"26px"} 
            />
          )}
          <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Gerenciar ONGs" }]} />
        </TopBarContent>
      </TopBarContainer>

      {/* Filtro Mobile (Overlay) */}
      {showMembersFilterOnSide && (
        <Overlay>
          <CloseButton onClick={() => setShowMembersFilterOnSide(false)}>x</CloseButton>
          <MembersFilter hasBorder={false} />
        </Overlay>
      )}

      <ContentContainer>
        {/* Filtro Desktop */}
        {!hideMembersFilter && (
          <MembersFilter hasBorder={true} />
        )}

        <div style={{
            minWidth: hideMembersFilter ? "60%" : "50%", 
            width: hideMembersFilter ? "80%" : "auto", 
            display: "flex", flexDirection: "column", gap: "36px"
        }}>
           
           <SectionWithEmptyState 
              title="Administradores"
              subtitle="Veja quem está como administrador no momento"
              emptyMessage="Nenhum Administrador Encontrado"
              expandContainer={hideMembersFilter}
              emptyState={membersData.length === 0 && !isLoadingPage}
           />
           
           <NGOCardsContainer>
             {membersData.map((member) => (
               <MemberInfoCard
                 key={member.id}
                 member={member}
                 showEditOptions={true}
                 onDeleteClick={() => setMemberToDelete(member)}
               />
             ))}
           </NGOCardsContainer>

        </div>
      </ContentContainer>

      {/* PAGINAÇÃO CONECTADA AO TOTAL ITEMS DO BACKEND */}
      {meta.total > 0 && (
        <PaginationButtons
            currentPage={currentPage}
            itemsLength={meta.total}
            itemsPerPage={meta.limit}
            buttonHeight="30px"
            buttonWidth="30px"
            containerHeight="160px"
            scrollTo="top-bar"
        />
      )}

      <Footer />

      {/* MODAL DE CONFIRMAÇÃO */}
      {memberToDelete && (
        <ConfirmModal
          isOpen={true}
          title={"Só confirmando, deseja mesmo excluir esse administrador?"}
          message={"Tem certeza? Ao excluir, o administrador será removido do sistema permanentemente."}
          confirmLabel={isDeleting ? "Excluindo..." : "Sim, excluir"}
          cancelLabel="Cancelar"
          onConfirm={handleDeleteConfirm}
          onClose={() => !isDeleting && setMemberToDelete(null)}
        />
      )}

    </div>
  ); 
};

export default ManageNGOMembers;