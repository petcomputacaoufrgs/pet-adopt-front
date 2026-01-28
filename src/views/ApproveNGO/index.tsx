import { useEffect, useState, useRef } from "react";
import { ngoService } from "../../services";
import { AxiosError } from "axios";
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
import Header from "../../components/Header";
import NGOsFilter from "../../components/NGOsFilter";
import PaginationButtons from "../../components/PaginationButtons";
import PrimarySecondaryButton from "../../components/PrimarySecondaryButton";
import Toast from "../../components/Toast";
import OngInfoCard from "../../components/OngInfoCard";

import Footer from "../HomePage/6Footer";
import ConfirmModal from "../../components/ConfirmModal";
import HorizontalLogo from "../../assets/HorizontalLogo.png";
import ApproveNGOsDog from "../../assets/ApproveNGOsDog.png";
import SectionWithEmptyState from "../../components/SectionWithEmptyState";
import { useAuth } from "../../hooks/useAuth";
import { useLoaderData } from "react-router";

type ModalAction = { tipo: "aprovar" | "recusar"; ngoId: string } | null;

// Interface para definir a estrutura da ONG
interface NGO {
  _id: string;
  name: string;
  city: string;
  email: string;
  phone: string;
  cnpj: string;
  instagram?: string;
  facebook?: string;
  x?: string;
  tiktok?: string;
  state?: string;
}

const ApproveNGO = () => {
  /**
   * Estados que representam os filtros aplicados às ONGs.
   * Cada um armazena uma característica diferente usada para filtrar as ONGs.
   */

  const [selectedState, setSelectedState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [name, setName] = useState<string>("");


  // Controla a exibição do filtro. Se for `true`, o filtro será ocultado (versões menores da tela) e o botão "filtros" deve ser apertado para mostrá-lo no lado da tela.
  // Se for false ele aparecerá na tela mesmo.
  const [hideNGOFilter, sethideNGOFilter] = useState(window.innerWidth < 1240);


  // Define quando o filtro deve se mostrado no lado da tela (modo mobile ao clicar no botão "filtros").
  const [showNGOsFilter, setshowNGOsFilter] = useState(false);

  // Estado para armazenar as ONGs
  const ngoData = useLoaderData() as NGO[];
  const [ngos, setNgos] = useState<NGO[]>(ngoData || []);
  const [isLoadingNGOs, setIsLoadingNGOs] = useState<boolean>(false);
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
  const fetchNGOs = async () => {
    try {
      setIsLoadingNGOs(true);
      setError("");
      
      const response = await ngoService.getUnapproved();
      
      // Mapear os dados para garantir que tenham o campo 'id'
      const mappedNgos = response.data.map((ngo: any) => ({
        ...ngo,
        id: ngo._id || ngo.id,
      }));
      
      setNgos(mappedNgos);
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        setError(err.response.data?.message || 'Erro ao carregar ONGs.');
      } else {
        setError('Erro de conexão. Tente novamente mais tarde.');
      }
    } finally {
      setIsLoadingNGOs(false);
    }
  };

  /**
   * Função para aprovar ONG
   */
  const approveNGO = async (ngoId: string) => {
    try {
      setIsLoadingNGOs(true);
      setError("");

      const response = await ngoService.approve(ngoId);

      // Atualiza a lista de ONGs removendo a ONG aprovada
      setNgos(prevNgos => prevNgos.filter(ngo => ngo._id !== ngoId));

    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        setError(err.response.data?.message || 'Erro ao aprovar ONG.');
      } else {
        setError('Erro de conexão. Tente novamente mais tarde.');
      }
      throw err; //Propagar o erro
    } finally {
      setIsLoadingNGOs(false);
    }
  };

  /**
   * Função para rejeitar ONG
   */
  const rejectNGO = async (ngoId: string) => {
    try {
      setIsLoadingNGOs(true);
      setError("");

      await ngoService.delete(ngoId);

      // Atualiza a lista de ONGs removendo a ONG rejeitada
      setNgos(prevNgos => prevNgos.filter(ngo => ngo._id !== ngoId));

    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        setError(err.response.data?.message || 'Erro ao rejeitar ONG.');
      } else {
        setError('Erro de conexão. Tente novamente mais tarde.');
      }
      throw err; // Propagar o erro
    } finally {
      setIsLoadingNGOs(false);
    }
  };

  /**
   * Retorna a quantidade de pets que devem ser mostrados por página, de acordo com a largura atual da janela.
   */
  const getNGOsPerPage = () => {
    if (window.innerWidth >= 1612) return 9;
    else if (window.innerWidth >= 800) return 6;
    else return 5;
  };

  const [ngosPerPage, setPetsPerPage] = useState<number>(getNGOsPerPage());
  const [currentPage, setCurrentPage] = useState(1);

  // Define as ONGs que serão mostradas com base na página atual
  const startIndexShowedNGOs = ngosPerPage * (currentPage - 1);
  const showedNGOs = ngos.slice(startIndexShowedNGOs, startIndexShowedNGOs + ngosPerPage);

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
  const openModal = (tipo: "aprovar" | "recusar", ngoId: string) => {
    resetToast();
    setModalAction({ tipo, ngoId: ngoId });
  };

  /**
   * Confirmar ação - VERSÃO CORRIGIDA
   */
  const handleConfirm = async () => {
    if (!modalAction) return;

    try {
      if (modalAction.tipo === "aprovar") {
        await approveNGO(modalAction.ngoId);
      } else if (modalAction.tipo === "recusar") {
        await rejectNGO(modalAction.ngoId);
      }
      showSuccessToast(modalAction.tipo);

    } catch (error) {
      // Se der erro, mostra toast de erro
      console.error("Erro na operação:", error);
      
      const errorMessage = modalAction.tipo === "aprovar" 
        ? "Erro ao aprovar ONG. Tente novamente." 
        : "Erro ao rejeitar ONG. Tente novamente.";
      
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
      const newNGOsPerPage = getNGOsPerPage();

      setPetsPerPage(newNGOsPerPage);
      sethideNGOFilter(isWindowSmall);

      // Corrige página atual se necessário
      if (showedNGOs.length > 0 && newNGOsPerPage * currentPage > ngos.length) {
        setCurrentPage(Math.ceil(ngos.length / newNGOsPerPage));
      }

      // Fecha o filtro no lado da tela se a janela for redimensionada para modo desktop
      if (!isWindowSmall && showNGOsFilter) {
        setshowNGOsFilter(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showNGOsFilter, currentPage, ngos.length]);

  /**
   * Efeito que desativa o scroll do `body` quando o filtro estiver ocupando a tela toda
   */
  useEffect(() => {
    document.body.style.overflow = showNGOsFilter ? "hidden" : "";
  }, [showNGOsFilter]);


    const { isLoading, user, isLoggedIn} = useAuth();

  if(isLoading)
    return null;


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
            ngos={ngos.map(ngo => ngo.name)}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            city={city}
            setCity={setCity}
            name={name}
            setName={setName}
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
            expandContainer={hideNGOFilter}
            emptyState={showedNGOs.length === 0}
          />
          
          <NGOCardsContainer>

            {showedNGOs.length > 0 && showedNGOs.map((ngo) => (
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

        {/* Toast de Sucesso */}
        {showToast && toastType && (
          <Toast
            type="success"
            message={`ONG ${toastType === "aprovar" ? "aprovada" : "recusada"} com sucesso!`}
            description={`${toastType === "aprovar" ? "Você pode ver essa ONG em Gerenciar ONGs." : "A ONG foi removida da sua lista de validação."}`}
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
        itemsLength={ngos.length}
        itemsPerPage={ngosPerPage}
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
