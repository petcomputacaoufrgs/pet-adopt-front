import { useEffect, useState, useRef } from "react";
import { ngoService, NGOFilters } from "../../services";
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
import OngInfoCard from "../../components/OngInfoCard";
import Footer from "../HomePage/6Footer";
import ConfirmModal from "../../components/ConfirmModal";
import Toast from "../../components/Toast";

import HorizontalLogo from "../../assets/HorizontalLogo.png";
import ManageNGOsCat from "../../assets/ManageNGOsCat.png";
import SectionWithEmptyState from "../../components/SectionWithEmptyState";
import { useAuth } from "../../hooks/useAuth";
import { useLoaderData } from "react-router-dom";

import { useToast } from "../../contexts/ToastContext";


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
  youtube?: string;
  tiktok?: string;
  state?: string;
}

const ManageNgo = () => {


  /**
   * Estados que representam os filtros aplicados às ONGs.
   */
  const [selectedState, setSelectedState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [name, setName] = useState<string>("");

  // Estado para armazenar as ONGs
  const ngosData = useLoaderData() as NGO[];

  const [ngos, setNgos] = useState<NGO[]>(ngosData);
  const [allNgos, setAllNgos] = useState<NGO[]>(ngosData); // Para manter lista completa para autocomplete
  const [isLoadingNGOs, setIsLoadingNGOs] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [ngoToDeleteId, setNgoToDeleteId] = useState<string|null>(null);

  // Controla a exibição do filtro
  const [hideNGOFilter, sethideNGOFilter] = useState(window.innerWidth < 1240);
  const [showNGOsFilter, setshowNGOsFilter] = useState(false);

  const[showDeleteButton, setShowDeleteButton] = useState<boolean>(false)

  const { showToast } = useToast();
  /**
   * Função para buscar ONGs com filtros
   */
  const fetchNGOs = async (filters?: NGOFilters) => {
    try {
      setIsLoadingNGOs(true);
      setError("");

      
      const response = await ngoService.getApproved(filters);
      
      // Mapear os dados para garantir que tenham o campo 'id'
      const mappedNgos = response.data.map((ngo: any) => ({
        ...ngo,
        _id: ngo._id || ngo.id,
      }));
      
      setNgos(mappedNgos);
      
      // Se não há filtros, salvar como lista completa para autocomplete
      if (!filters || Object.keys(filters).length === 0) {
        setAllNgos(mappedNgos);
      }
      
      
      
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
   * Callback para quando o usuário pesquisar
   */
  const handleSearch = (filters: { name: string; city: string; state: string }) => {
    const ngoFilters: NGOFilters = {};
    
    if (filters.name) ngoFilters.name = filters.name;
    if (filters.city) ngoFilters.city = filters.city;
    if (filters.state && filters.state !== 'Qualquer') ngoFilters.state = filters.state;

    fetchNGOs(ngoFilters);
    setCurrentPage(1); // Resetar para primeira página
  };

  /**
   * Callback para quando o usuário limpar filtros
   */
  const handleClearFilters = () => {

    fetchNGOs(); // Buscar sem filtros
    setCurrentPage(1); // Resetar para primeira página
    
  };

  

  /**
   * Retorna a quantidade de ONGs que devem ser mostrados por página, de acordo com a largura atual da janela.
   */
  const getNGOsPerPage = () => {
    if (window.innerWidth >= 1612) return 9;
    else if (window.innerWidth >= 800) return 6;
    else return 5;
  };

  const [ngosPerPage, setNgosPerPage] = useState<number>(getNGOsPerPage());
  const [currentPage, setCurrentPage] = useState(1);

  // Define as ONGs que serão mostradas com base na página atual
  const startIndexShowedNGOs = ngosPerPage * (currentPage - 1);
  const showedNGOs = ngos.slice(startIndexShowedNGOs, startIndexShowedNGOs + ngosPerPage);
  const { isLoading, user, isLoggedIn} = useAuth();


  useEffect(() => {
    if (user?.role === "ADMIN") {
      setShowDeleteButton(true);
    } else {
      setShowDeleteButton(false);
    }
  }, [user]);

  /**
   * Atualiza o estado do layout e quantidade de ONGs por página ao redimensionar a tela.
   */
  useEffect(() => {
    const handleResize = () => {
      const isWindowSmall = window.innerWidth < 1240;
      const newNGOsPerPage = getNGOsPerPage();

      setNgosPerPage(newNGOsPerPage);
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

  /**
   * Função para deletar uma ONG
   */
  const [ModalType, setModalType] =  useState<"excluir" | "recusar" | "aprovar" | null>(null);

  

  const handleDeleteConfirm = async (ngoId: string) => {
      if (!ngoId) return;
      await deleteNGO(ngoId);
      setModalType(null);    
  };

  const deleteNGO = async (ngoId: string) => {
    try {  
      await ngoService.delete(ngoId);
      
      // Remover a ONG da lista local
      setNgos(prevNgos => prevNgos.filter(ngo => ngo._id !== ngoId));
      
      // Ajustar página atual se necessário
      const updatedNgos = ngos.filter(ngo => ngo._id !== ngoId);
      if (ngosPerPage * currentPage > updatedNgos.length && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }

      showToast(
        { success: true,
          message: "ONG excluída com sucesso!",
          description: "A ONG foi removida do sistema."

        }
      )
      
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        setError(err.response.data?.message || 'Erro ao deletar ONG.');

        showToast(
          { success: false,
            message: "Erro ao deletar ONG.",
            description: err.response.data?.message || 'Erro ao deletar ONG.'
          }
        )

      } else {
        setError('Erro de conexão. Tente novamente mais tarde.');
        showToast(
          { success: false,
            message: "Erro ao deletar ONG.",
            description: 'Erro de conexão. Tente novamente mais tarde.'
          }
        )
      }
    }
  };

  /**
   * Função para lidar com o clique em deletar
   */
  const handleDeleteClick = (ngo?: NGO) => {
    if (!ngo) return;
    setNgoToDeleteId(ngo._id)
    setModalType("excluir");
  };

    
    

  if(isLoading)
    return null;
  
  console.log(showedNGOs);
  return (
    <>

      <BannerComponent
        limitWidthForImage="850px"
        color="#FFC99C"
        title="Descubra as ONGs desse projeto incrível!"
        subTitle="Venha conhecer as ONGs que fazem parte deste projeto inspirador e transformador!"
        imageUrl={ManageNGOsCat}
      />

      <TopBarContainer id="top-bar">
        <TopBarContent>

          <Breadcrumb
            items={[
              { label: "Home", to: "/" },
              { label: "Gerenciar ONGs" },
            ]}
          />


          {hideNGOFilter && (
            <PrimarySecondaryButton
              onClick={() => setshowNGOsFilter(true)}
              content="Filtros"
              height = {"48px"}
              paddingH= {"26px"}
            />
          )}


        </TopBarContent>
      </TopBarContainer>

      {showNGOsFilter && (
        <Overlay>
          <CloseButton onClick={() => setshowNGOsFilter(false)}>x</CloseButton>

          <NGOsFilter
            ngos={allNgos.map(ngo => ngo.name)} // Lista completa para autocomplete
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            city={city}
            setCity={setCity}
            name={name}
            setName={setName}
            hasBorder={false}
            onSearch={handleSearch}
            onClearFilters={handleClearFilters}
          />
        </Overlay>
      )}

      <ContentContainer>
        {!hideNGOFilter && (
          <NGOsFilter
            ngos={allNgos.map(ngo => ngo.name)}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            city={city}
            setCity={setCity}
            name={name}
            setName={setName}
            onSearch={handleSearch}
            onClearFilters={handleClearFilters}
          />
        )}

        <div style={{minWidth: hideNGOFilter? "60%" : "50%", width: hideNGOFilter? "80%" : "auto", display: "flex", flexDirection: "column", gap: "36px"}}>
        
          <SectionWithEmptyState 
            title="ONGs"
            subtitle="Visualize as ONGs em atividade no momento"
            emptyMessage="Nenhuma ONG Encontrada"
            expandContainer={hideNGOFilter}
            emptyState={showedNGOs.length === 0}
          />
          
          <NGOCardsContainer>
            {isLoadingNGOs && <p>Carregando ONGs...</p>}
            {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
            {!isLoadingNGOs && !error && ngos.length === 0 && <p>Nenhuma ONG encontrada.</p>}
            
            {!isLoadingNGOs && !error && showedNGOs.map((ngo, index) => (
              <OngInfoCard
                key={ngo._id || index}
                ngo={ngo}
                showDeleteOptions={showDeleteButton}
                onDeleteClick={handleDeleteClick}
              />
            ))}
          </NGOCardsContainer>

        </div>

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

       {ModalType && ngoToDeleteId && (
            <ConfirmModal
                isOpen={true}
                title="Só confirmando, deseja mesmo excluir essa ONG?"
                message= "Tem certeza? Ao excluir, a ONG será removida do sistema permanentemente."
                confirmLabel="Sim, excluir"
                cancelLabel="Cancelar"
                onConfirm={() => {handleDeleteConfirm(ngoToDeleteId)}}
                onClose={() => {setModalType(null); setNgoToDeleteId(null)}}
            />
          )}
    </>
  );
};

export default ManageNgo;


