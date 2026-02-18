import { useEffect, useState } from "react";
import {
  CloseButton,
  ContentContainer,
  NGOCardsContainer,
  Overlay,
  TopBarContainer,
  TopBarContent,
} from "./styles";

import BannerComponent from "../../components/BannerComponent";
import Breadcrumb from "../../components/BreadCrumb";
import NGOsFilter from "../../components/NGOsFilter";
import PaginationButtons from "../../components/PaginationButtons";
import PrimarySecondaryButton from "../../components/PrimarySecondaryButton";
import OngInfoCard from "../../components/OngInfoCard";

import Footer from "../HomePage/6Footer";
import ConfirmModal from "../../components/ConfirmModal";
import ApproveNGOsDog from "../../assets/ApproveNGOsDog.png";
import SectionWithEmptyState from "../../components/SectionWithEmptyState";
import { useLoaderData } from "react-router";
import { useFetcher } from "react-router-dom";
import { useToast } from "../../contexts/ToastContext";
import type { NGO } from "../../types/ngos";

type ModalAction = { tipo: "aprovar" | "recusar"; ngoId: string } | null;

const ApproveNGO = () => {

  // Controla a exibição do filtro. Se for `true`, o filtro será ocultado (versões menores da tela) e o botão "filtros" deve ser apertado para mostrá-lo no lado da tela.
  // Se for false ele aparecerá na tela mesmo.
  const [hideNGOFilter, sethideNGOFilter] = useState(window.innerWidth < 1240);


  // Define quando o filtro deve se mostrado no lado da tela (modo mobile ao clicar no botão "filtros").
  const [showNGOsFilter, setshowNGOsFilter] = useState(false);

  // Estado para armazenar as ONGs
  const {items: ngos, meta, error} = useLoaderData() as {items: NGO[], meta: any, error?: string};
  


  const [modalAction, setModalAction] = useState<ModalAction>(null);


  const fetcher = useFetcher();

  const { showToast } = useToast();



  /**
   * Abrir modal (e fechar toast se estiver aberto)
   */
  const openModal = (tipo: "aprovar" | "recusar", ngoId: string) => {
    setModalAction({ tipo, ngoId: ngoId });
  };

  const handleConfirm = () => {
    if (!modalAction) return;

    // Dispara a Action via Fetcher (sem reload de página)
    fetcher.submit(
      { intent: modalAction.tipo, id: modalAction.ngoId }, 
      { method: "post" }
    );
  };


  useEffect(() => {
      if (fetcher.state === "idle" && fetcher.data) {
        if (fetcher.data.success) {
          const type = fetcher.data.type; // "aprovar" ou "recusar" (ou "delete")
          
          showToast({
             success: true,
             message: `ONG ${type === "aprovar" ? "aprovada" : "recusada"}!`,
             description: type === "aprovar" 
               ? "Você pode ver essa ONG em Gerenciar ONGs." 
               : "A ONG foi removida da lista."
          });
             
          setModalAction(null); // Fecha modal
  
        } else if (fetcher.data.error) {
          showToast({
             success: false,
             message: "Erro na operação.",
             description: fetcher.data.error
          });

          setModalAction(null); // Fecha modal
        }
      }
    }, [fetcher.state, fetcher.data]);
  


  /**
   * Atualiza o estado do layout e quantidade de ONGs por página ao redimensionar a tela
   */
  useEffect(() => {
    const handleResize = () => {
      const isWindowSmall = window.innerWidth < 1240;

      sethideNGOFilter(isWindowSmall);

      // Fecha o filtro no lado da tela se a janela for redimensionada para modo desktop
      if (!isWindowSmall && showNGOsFilter) {
        setshowNGOsFilter(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showNGOsFilter]);

  /**
   * Efeito que desativa o scroll do `body` quando o filtro estiver ocupando a tela toda
   */
  useEffect(() => {
    document.body.style.overflow = showNGOsFilter ? "hidden" : "";
  }, [showNGOsFilter]);



  return (
    <>

      <BannerComponent 
        limitWidthForImage="850px" 
        color="rgba(178, 243, 255, 1)"  
        title="Juntos por um mundo melhor!" 
        subTitle="Hora de escolher quem vai impactar positivamente nossa comunidade"   
        imageUrl={ApproveNGOsDog}
      />

      <TopBarContainer id="top-bar">
        <TopBarContent>
          {hideNGOFilter && (
            <PrimarySecondaryButton 
              onClick={() => setshowNGOsFilter(true)} 
              content="Filtros"  
              height = {"48px"} 
              paddingH= {"26px"} />
          )}
          <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Aprovar ONGs" }]} />
        </TopBarContent>
      </TopBarContainer>

      {showNGOsFilter && (
        <Overlay>
          <CloseButton onClick={() => setshowNGOsFilter(false)}>x</CloseButton>
          <NGOsFilter
            hasBorder={false}
          />
        </Overlay>
      )}

      <ContentContainer>
        <div style={{minWidth: hideNGOFilter? "60%" : "50%", width: hideNGOFilter? "80%" : "auto", display: "flex", flexDirection: "column", gap: "36px"}}>
        
          <SectionWithEmptyState 
            title="ONGs"
            subtitle="Escolha as ONGs que farão parte do projeto"
            emptyMessage="Nenhuma ONG Encontrada"
            emptyState={ngos.length === 0 && !error}
          />
          
          <NGOCardsContainer>

            {ngos.length > 0 && ngos.map((ngo) => (
              <OngInfoCard
                key={ngo._id}
                ngo={ngo}
                showApproveButtons={true}
                onApproveClick={() => openModal("aprovar", ngo._id)}
                onRejectClick={() => openModal("recusar", ngo._id)}
              />
            ))}
          </NGOCardsContainer>

        </div>

        {/* Modal de Confirmação */}
        <ConfirmModal
          isOpen={modalAction !== null}
          title={
            modalAction?.tipo === "aprovar"
              ? "Que bom que gostou! Deseja aprovar esta ONG?"
              : "Tem certeza que deseja recusar esta ONG?"
          }
          message={
            modalAction?.tipo === "aprovar"
              ? "Tem certeza de que deseja aprovar esta ONG? Caso mude de ideia, você poderá removê-la depois."
              : "Uma vez recusada, a ONG sairá da lista de avaliação."
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

export default ApproveNGO;
