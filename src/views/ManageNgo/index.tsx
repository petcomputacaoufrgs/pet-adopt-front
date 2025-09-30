import { useEffect, useState } from "react";
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

import HorizontalLogo from "../../assets/HorizontalLogo.png";
import ManageNGOsCat from "../../assets/ManageNGOsCat.png";
import SectionWithEmptyState from "../../components/SectionWithEmptyState";

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

const ManageNgo = () => {
  /**
   * Estados que representam os filtros aplicados às ONGs.
   */
  const [selectedState, setSelectedState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [name, setName] = useState<string>("");

  // Estado para armazenar as ONGs
  const [ngos, setNgos] = useState<NGO[]>([]);
  const [allNgos, setAllNgos] = useState<NGO[]>([]); // Para manter lista completa para autocomplete
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Controla a exibição do filtro
  const [hideNGOFilter, sethideNGOFilter] = useState(window.innerWidth < 1240);
  const [showNGOsFilter, setshowNGOsFilter] = useState(false);

  /**
   * Função para buscar ONGs com filtros
   */
  const fetchNGOs = async (filters?: NGOFilters) => {
    try {
      setIsLoading(true);
      setError("");
      
      console.log('📡 Buscando ONGs aprovadas com filtros:', filters);
      
      const response = await ngoService.getApproved(filters);
      
      // Mapear os dados para garantir que tenham o campo 'id'
      const mappedNgos = response.data.map((ngo: any) => ({
        ...ngo,
        id: ngo._id || ngo.id,
      }));
      
      setNgos(mappedNgos);
      
      // Se não há filtros, salvar como lista completa para autocomplete
      if (!filters || Object.keys(filters).length === 0) {
        setAllNgos(mappedNgos);
      }
      
      console.log('✅ ONGs carregadas:', mappedNgos.length);
      
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        setError(err.response.data?.message || 'Erro ao carregar ONGs.');
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
  const handleSearch = (filters: { name: string; city: string; state: string }) => {
    const ngoFilters: NGOFilters = {};
    
    if (filters.name) ngoFilters.name = filters.name;
    if (filters.city) ngoFilters.city = filters.city;
    if (filters.state && filters.state !== 'Qualquer') ngoFilters.state = filters.state;
    
    console.log('🔍 Aplicando filtros:', ngoFilters);
    fetchNGOs(ngoFilters);
    setCurrentPage(1); // Resetar para primeira página
  };

  /**
   * Callback para quando o usuário limpar filtros
   */
  const handleClearFilters = () => {
    console.log('🧹 Limpando filtros');
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

  /**
   * Efeito para buscar ONGs quando o componente for montado
   */
  useEffect(() => {
    fetchNGOs(); // Buscar todas as ONGs inicialmente
  }, []);

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
  const deleteNGO = async (ngoId: string) => {
    try {  
      await ngoService.delete(ngoId);
      
      // Remover a ONG da lista local
      setNgos(prevNgos => prevNgos.filter(ngo => ngo.id !== ngoId));
      
      // Ajustar página atual se necessário
      const updatedNgos = ngos.filter(ngo => ngo.id !== ngoId);
      if (ngosPerPage * currentPage > updatedNgos.length && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        setError(err.response.data?.message || 'Erro ao deletar ONG.');
      } else {
        setError('Erro de conexão. Tente novamente mais tarde.');
      }
    }
  };

  /**
   * Função para lidar com o clique em deletar
   */
  const handleDeleteClick = (ngo?: NGO) => {
    if (!ngo) return;
    
    const confirmDelete = window.confirm(
      `Tem certeza que deseja excluir a ONG "${ngo.name}"? Esta ação não pode ser desfeita.`
    );
    
    if (confirmDelete) {
      deleteNGO(ngo.id);
    }
  };

  /**
   * Função para lidar com o clique em editar
   */
  const handleEditClick = (ngo?: NGO) => {
    if (!ngo) return;
    
    console.log("Editando ONG:", ngo); // Debug
    // Aqui pode navegar para uma página de edição
  };

  return (
    <>
      <Header
        options={headerOptions}
        optionsToAction={handleHeaderAction}
        color="#FFF6E8"
        Logo={HorizontalLogo}
      />

      <BannerComponent
        limitWidthForImage="850px"
        color="#FFC99C"
        title="Descubra as ONGs desse projeto incrível!"
        subTitle="Venha conhecer as ONGs que fazem parte deste projeto inspirador e transformador!"
        imageUrl={ManageNGOsCat}
      />

      <TopBarContainer>
        <TopBarContent>
          {hideNGOFilter && (
            <PrimarySecondaryButton
              onClick={() => setshowNGOsFilter(true)}
              content="Filtros"
              height = {"48px"}
              paddingH= {"26px"}
            />
          )}

          <Breadcrumb
            items={[
              { label: "Home", to: "/" },
              { label: "Gerenciar ONGs" },
            ]}
          />
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
            ngos={allNgos.map(ngo => ngo.name)} // Lista completa para autocomplete
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
            {isLoading && <p>Carregando ONGs...</p>}
            {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
            {!isLoading && !error && ngos.length === 0 && <p>Nenhuma ONG encontrada.</p>}
            
            {!isLoading && !error && showedNGOs.map((ngo, index) => (
              <OngInfoCard
                key={ngo.id || index}
                ngo={ngo}
                showEditOptions={true}
                onEditClick={handleEditClick}
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
      />

      <Footer />
    </>
  );
};

export default ManageNgo;


