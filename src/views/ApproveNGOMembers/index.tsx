import { useEffect, useState } from "react";
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
import MembersFilter from "../../components/MembersFilter";
import PaginationButtons from "../../components/PaginationButtons";
import PrimarySecondaryButton from "../../components/PrimarySecondaryButton";
import SectionWithEmptyState from "../../components/SectionWithEmptyState";
import MemberInfoCard from "../../components/MemberInfoCard";
import AuthorizationToast from "../../components/AuthorizationToast";


import Footer from "../HomePage/6Footer";
import ConfirmModal from "../../components/ConfirmModal";
import ManageMembersHamster from "../../assets/ManageMembersHamster.png";
import { useFetcher, useLoaderData } from "react-router-dom";
import { useToast } from "../../contexts/ToastContext";
import type { Member } from "../../types/member";


type ModalAction = { tipo: "aprovar" | "recusar"; membroId: string } | null;


const ApproveNGOMembers = () => {


  const { items: members, meta } = useLoaderData() as { items: Member[]; user: any; meta: { total: number; lastPage: number; page: number; limit: number }; error?: string };



  // Controla a exibição do filtro. Se for `true`, o filtro será ocultado (versões menores da tela) e o botão "filtros" deve ser apertado para mostrá-lo no lado da tela.
  // Se for false ele aparecerá na tela mesmo.
  const [hideMemberFilter, sethideMemberFilter] = useState(window.innerWidth < 1240);


  // Define quando o filtro deve se mostrado no lado da tela (modo mobile ao clicar no botão "filtros").
  const [showMembersFilter, setshowMembersFilter] = useState(false);


  const [modalAction, setModalAction] = useState<ModalAction>(null);
  const fetcher = useFetcher();
  
  const { showToast } = useToast();
  
  /**
   * Abrir modal (e fechar toast se estiver aberto)
   */
  const openModal = (tipo: "aprovar" | "recusar", membroId: string) => {
    setModalAction({ tipo, membroId: membroId });
  };

  /**
   * Confirmar ação
   *
   */
  const handleConfirm = async () => {
    if (!modalAction) return;

    fetcher.submit(
      { id: modalAction.membroId, intent: modalAction.tipo },
      { method: "post" }
    )
  };

 useEffect(() => {
      if (fetcher.state === "idle" && fetcher.data) {
        if (fetcher.data.success) {
          const type = fetcher.data.type; // "aprovar" ou "recusar" (ou "delete")

          showToast({
             success: true,
             message: `Administrador ${type === "aprovar" ? "aprovado" : "recusado"}!`,
              description: type === "aprovar"
                ? "Você pode ver esse Administrador em Gerenciar Administradores."
                : "O Administrador foi removido da sua lista de validação."
          });
          setModalAction(null); // Fecha modal
          fetcher.reset();

        }

          else if (fetcher.data.error) {
          showToast({
             success: false,
             message: "Erro na operação.",
             description: fetcher.data.error
          });
          setModalAction(null); // Fecha modal
          fetcher.reset();

        }
      }
    }, [fetcher.state, fetcher.data]);


  /**
   * Atualiza o estado do layout e quantidade de ONGs por página ao redimensionar a tela
   */
  useEffect(() => {
    const handleResize = () => {
      const isWindowSmall = window.innerWidth < 1240;

      sethideMemberFilter(isWindowSmall);


      // Fecha o filtro no lado da tela se a janela for redimensionada para modo desktop
      if (!isWindowSmall && showMembersFilter) {
        setshowMembersFilter(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showMembersFilter]);

  /**
   * Efeito que desativa o scroll do `body` quando o filtro estiver ocupando a tela toda
   */
  useEffect(() => {
    document.body.style.overflow = showMembersFilter ? "hidden" : "";
  }, [showMembersFilter]);

  return (
    <>
      <AuthorizationToast />
      
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
         {!hideMemberFilter && members.length > 0 && (
            <MembersFilter
              hasBorder={true}
          />
          )}

        <div style={{minWidth: hideMemberFilter? "60%" : "50%", width: hideMemberFilter? "80%" : "auto", display: "flex", flexDirection: "column", gap: "36px"}}>
        
           <SectionWithEmptyState 
                title="Administradores"
                subtitle="Escolha os administradores que farão parte da sua ONG"
                emptyMessage="Nenhum Administrador Encontrado"
                emptyState={members.length == 0}
                
            />

          <MemberCardsContainer>

            {members.length > 0 && members.map((member) => (
              <MemberInfoCard
                key={member._id}
                member={member}
                showApproveButtons={true}
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


      </ContentContainer>

      <PaginationButtons
        currentPage={meta.page}
        itemsLength={meta.total}
        itemsPerPage={meta.limit}
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
