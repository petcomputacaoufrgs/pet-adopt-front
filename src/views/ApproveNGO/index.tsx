import { useEffect, useState, useRef } from "react";
import axios from "axios";
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
import SuccessToast from "../../components/SuccessToast";
import OngInfoCard from "../../components/OngInfoCard";

import Footer from "../HomePage/6Footer";
import ConfirmModal from "../../components/ConfirmModal";
import HorizontalLogo from "../../assets/HorizontalLogo.png";
import ApproveNGOsDog from "../../assets/ApproveNGOsDog.png";
import SectionWithEmptyState from "../../components/SectionWithEmptyState";

type ModalAction = { tipo: "aprovar" | "recusar"; ngoId: string } | null;

// Interface para definir a estrutura da ONG
interface NGO {
  id: string;
  name: string;
  city: string;
  email: string;
  phone: string;
  cnpj: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
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
    const [ngos, setNgos] = useState<NGO[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

  /**
   * Função para buscar todas as ONGs do backend
  */
  const fetchNGOs = async () => {
  try {
    setIsLoading(true);
    setError("");
    
    const response = await axios.get('http://localhost:3002/api/v1/ngos/unapproved');
    
    // Mapear os dados para garantir que tenham o campo 'id'
    const mappedNgos = response.data.map((ngo: any) => ({
      ...ngo,
      id: ngo._id || ngo.id,
    }));
    
    setNgos(mappedNgos);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.message || 'Erro ao carregar ONGs.');
      } else {
        setError('Erro de conexão. Tente novamente mais tarde.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Função para buscar todas as ONGs do backend
  */
  const approveNGO = async (ngoId: string) => {
  try {
    setIsLoading(true);
    setError("");

    const response = await axios.patch(`http://localhost:3002/api/v1/ngos/${ngoId}/approve`);

    // Atualiza a lista de ONGs removendo a ONG aprovada
    setNgos(prevNgos => prevNgos.filter(ngo => ngo.id !== ngoId));

    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.message || 'Erro ao aprovar ONGs.');
      } else {
        setError('Erro de conexão. Tente novamente mais tarde.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Função para buscar todas as ONGs do backend
  */
  const rejectNGO = async (ngoId: string) => {
  try {
    setIsLoading(true);
    setError("");

    const response = await axios.patch(`http://localhost:3002/api/v1/ngos/${ngoId}/reject`);

    // Atualiza a lista de ONGs removendo a ONG rejeitada
    setNgos(prevNgos => prevNgos.filter(ngo => ngo.id !== ngoId));

    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.message || 'Erro ao rejeitar ONGs.');
      } else {
        setError('Erro de conexão. Tente novamente mais tarde.');
      }
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

  
  //const ngos = ngosMock
  const [ngosPerPage, setPetsPerPage] = useState<number>(getNGOsPerPage());
  const [currentPage, setCurrentPage] = useState(1);

  // Define os pets que serão mostrados com base na página atual
  const startIndexShowedNGOs = ngosPerPage * (currentPage - 1);
  const showedNGOs = ngos.slice(startIndexShowedNGOs, startIndexShowedNGOs + ngosPerPage);

  /**
   * Efeito para buscar ONGs quando o componente for montado
   */
  useEffect(() => {
    fetchNGOs();
  }, []);

  /**
   * Atualiza o estado do layout e quantidade de pets por página ao redimensionar a tela.
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
   * Efeito que desativa o scroll do `body` quando o filtro estiver ocupando a tela toda.
   */
  useEffect(() => {
    document.body.style.overflow = showNGOsFilter ? "hidden" : "";
  }, [showNGOsFilter]);

  /**
   * Opções exibidas no header da aplicação.
   */
  const headerOptions = ["Sobre Nós", "Animais Recém Adicionados", "Dicas", "Fale Conosco"];

  /**
   * Manipula ações do header com base na opção clicada.
   * @param selected Opção clicada pelo usuário
   */
  const handleHeaderAction = (selected: string) => {
    switch (selected) {
      case headerOptions[0]:
        console.log("Sobre nós");
        return;
      case headerOptions[1]:
        console.log("Animais Recém Adicionados");
        return;
      case headerOptions[2]:
        console.log("Dicas");
        return;
      case headerOptions[3]:
        console.log("Fale Conosco");
        return;
    }
  };


  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fullCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [modalAction, setModalAction] = useState<ModalAction>(null);
  const [toastType, setToastType] = useState<"aprovar" | "recusar" | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  // Fecha toast com animação
 const resetToast = () => {
  setToastVisible(false);

  if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
  if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
  if (fullCloseTimeoutRef.current) clearTimeout(fullCloseTimeoutRef.current);

  setShowToast(false);
  setToastType(null);
  };


  // Abrir modal (e fechar toast se estiver aberto)
  const openModal = (tipo: "aprovar" | "recusar", ngoId: string) => {
    resetToast();
    setModalAction({ tipo, ngoId: ngoId });
  };

  // Confirmar ação
  const handleConfirm = () => {
    if (!modalAction) return;

    // Chama funções correspondentes do backend
    if (modalAction.tipo === "aprovar") {
      approveNGO(modalAction.ngoId);
    }
    else if (modalAction.tipo === "recusar") {
      rejectNGO(modalAction.ngoId);
    }

    resetToast();
    setToastType(modalAction.tipo);
    setShowToast(true);

    showTimeoutRef.current = setTimeout(() => setToastVisible(true), 50);
    hideTimeoutRef.current = setTimeout(() => setToastVisible(false), 3000);
    fullCloseTimeoutRef.current = setTimeout(() => {
      setShowToast(false);
      setToastType(null);
    }, 3500);

    setModalAction(null);
  };


  return (
    <>
      <Header options={headerOptions} optionsToAction={handleHeaderAction} color="#FFF6E8" Logo={HorizontalLogo}/>

      <BannerComponent limitWidthForImage="850px" color="rgba(178, 243, 255, 1)"  title="Juntos por um mundo melhor!" subTitle="Hora de escolher quem vai impactar positivamente nossa comunidade"   imageUrl={ApproveNGOsDog}/>

      <TopBarContainer>
        <TopBarContent>
          {hideNGOFilter && (
            <PrimarySecondaryButton 
              onClick={() => setshowNGOsFilter(true)} 
              content="Filtros"  
              height = {"48px"} 
              paddingH= {"26px"} />
          )}
          <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Gerenciar ONGs" },  ]} />
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
      {!hideNGOFilter && (
        <NGOsFilter
          ngos={ngos.map(ngo => ngo.name)}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          city={city}
          setCity={setCity}
          name={name}
          setName={setName}
        />
      )}


        <div style={{minWidth: hideNGOFilter? "60%" : "50%", width: hideNGOFilter? "80%" : "auto", display: "flex", flexDirection: "column", gap: "36px"}}>
        
        <SectionWithEmptyState 
          title="ONGs"
          subtitle="Escolha as ONGs que farão parte do projeto"
          emptyMessage="Nenhuma ONG Encontrada"
          expandContainer={hideNGOFilter}
          emptyState={showedNGOs.length == 0}
        />
        
      
          <NGOCardsContainer>
            {showedNGOs.length > 0 && showedNGOs.map((ngo) => (
              <OngInfoCard
                key={ngo.id}
                ngo={ngo}
                showApproveButtons={true}
                onApproveClick={() => openModal("aprovar", ngo.id)}
                onRejectClick={() => openModal("recusar", ngo.id)}
              />
            ))}
          </NGOCardsContainer>

          </div>

       

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

        {showToast && toastType && (
          <SuccessToast
            message={`ONG ${toastType === "aprovar" ? "aprovada" : "recusada"} com sucesso!`}
            description= {`${toastType === "aprovar" ? "Você pode ver essa ONG em Gerenciar ONGs." : "A ONG foi removida da sua lista de validação."}`}
            onClose={() => {
              setToastVisible(false);
              setTimeout(() => setShowToast(false), 300);
            }}
            isVisible={toastVisible}
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
        />
        <Footer />
    </>
  );
};

export default ApproveNGO;
