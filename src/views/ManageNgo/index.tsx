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
import { useFetcher, useLoaderData, useNavigation, useSearchParams } from "react-router-dom";

import { useToast } from "../../contexts/ToastContext";
import { set } from "react-hook-form";


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

  // Estado para armazenar as ONGs

  const {items: ngos, user, meta, error} = useLoaderData() as {items: NGO[]; user: any; meta: { total: number; lastPage: number; page: number; limit: number }, error: string | null;};

  const [searchParams, setSearchParams] = useSearchParams();
  
  const fetcher = useFetcher();
  const navigation = useNavigation();
  
  

  // Controla a exibição do filtro
  const [hideNGOFilter, sethideNGOFilter] = useState(window.innerWidth < 1240);
  const [showNGOsFilter, setshowNGOsFilter] = useState(false);

  const[showDeleteButton, setShowDeleteButton] = useState<boolean>(false)

  const { showToast } = useToast();


  const currentPage = Number(searchParams.get("page") || "1");
  const currentLimit = Number(searchParams.get("limit") || "6");


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
   * Efeito que desativa o scroll do `body` quando o filtro estiver ocupando a tela toda.
   */
  useEffect(() => {
    document.body.style.overflow = showNGOsFilter ? "hidden" : "";
  }, [showNGOsFilter]);


  /**
   * Função para deletar uma ONG
   */
  const [ModalType, setModalType] =  useState<"excluir" | "recusar" | "aprovar" | null>(null);
  const [ngoToDeleteId, setNgoToDeleteId] = useState<string|null>(null);

  
// Monitora resposta da Action
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      if (fetcher.data.success) {

        showToast({
          success: true,
          message: "ONG excluída com sucesso!",
          description: "A ONG foi removida do sistema."
        });

        // Fecha modal e limpa estado
        setModalType(null);
        setNgoToDeleteId(null);

      } else if (fetcher.data.error) {

        showToast({
          success: false,
          message: "Erro ao deletar ONG.",
          description: fetcher.data.error
        });

        setModalType(null);
        setNgoToDeleteId(null);
      }
    }
  }, [fetcher.state, fetcher.data]);


  const handleDeleteClick = (ngo?: NGO) => {
    if (!ngo) return;
    setNgoToDeleteId(ngo._id);
    setModalType("excluir");
  };

  const handleDeleteConfirm = () => {
    if (!ngoToDeleteId) return;
    
    // Dispara a action (POST) para deletar
    fetcher.submit(
      { intent: "delete", ngoId: ngoToDeleteId },
      { method: "post" }
    );
  };


  
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
            hasBorder={false}
          />
        </Overlay>
      )}

      <ContentContainer>
        {!hideNGOFilter && (
          <NGOsFilter
          />
        )}

        <div style={{minWidth: hideNGOFilter? "60%" : "50%", width: hideNGOFilter? "80%" : "auto", display: "flex", flexDirection: "column", gap: "36px"}}>
        
          <SectionWithEmptyState 
            title="ONGs"
            subtitle="Visualize as ONGs em atividade no momento"
            emptyMessage="Nenhuma ONG Encontrada"
            expandContainer={hideNGOFilter}
            emptyState={ngos.length === 0 && !error}
          />
          
          <NGOCardsContainer>
            {error && <p>{error}</p>}
            {!error && ngos.map((ngo, index) => (
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
        itemsLength={ngos.length}
        itemsPerPage={currentLimit}
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
                onConfirm={handleDeleteConfirm}
                onClose={() => {setModalType(null); setNgoToDeleteId(null)}}
            />
          )}
    </>
  );
};

export default ManageNgo;


