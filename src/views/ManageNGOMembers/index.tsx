import { userService, UserFilters } from "../../services";
import { AxiosError } from "axios";

import Header from "../../components/Header";
import { User } from "../../types/user";
import { useState, useEffect, useRef} from "react";
import {
  CloseButton,
  ContentContainer,
  NGOCardsContainer,
  Overlay,
  TopBarContainer,
  TopBarContent,
  Msg
} from "./styles";

import BannerComponent from "../../components/BannerComponent";
import Breadcrumb from "../../components/BreadCrumb";
import PaginationButtons from "../../components/PaginationButtons";
import PrimarySecondaryButton from "../../components/PrimarySecondaryButton";
import Toast from "../../components/Toast";
import MemberInfoCard from '../../components/MemberInfoCard';
import Footer from "../HomePage/6Footer";
import ConfirmModal from "../../components/ConfirmModal";
import HorizontalLogo from "../../assets/HorizontalLogo.png";
import ManageMembersHamster from "../../assets/ManageMembersHamster.png";
import SectionWithEmptyState from "../../components/SectionWithEmptyState";
import MembersFilter from "../../components/MembersFilter";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";

const ManageNGOMembers: React.FC = () => {

  
  const [ngoMembers, setNgoMembers] = useState<User[]>([]);
  const [allMembers, setAllMembers] = useState<User[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState<string>("");
  const { user, isLoggedIn} = useAuth();
  const ngoId = useAuth().user?.ngoId;
  const navigate = useNavigate();

  useEffect(() => {
    if(ngoId){
    fetchNGOMembers();
    }
  }, [ngoId]);

  const fetchNGOMembers = async (filters?: UserFilters) => {
    if (ngoId) {
      try {
        setIsLoading(true);
        const response = await userService.getApprovedMembers(ngoId, filters);

        const mappedMembers= response.data.map((member: any) => ({
          ...member,
          id: member._id||member.id,
        }));
        setNgoMembers(mappedMembers);

        if (!filters || Object.keys(filters).length === 0) {
          setAllMembers(mappedMembers); // salva lista completa para autocomplete
        }

      } catch (error) {
        console.error(error);
        if (error instanceof AxiosError && error.response) {
          setErrorMessage(error.response.data.message || 'Erro ao carregar membros de ONGs.');
        } else {
          setErrorMessage('Erro de conexão. Tente novamente mais tarde.');
        }
      } finally {
        setIsLoading(false);
      }
    }
  };


  
    /**
     * Callback para quando o usuário pesquisar
     */
    const handleSearch = (filters: { name: string}) => {
      const userFilters: UserFilters = {};
      
      if (filters.name) userFilters.name = filters.name;
      
      console.log('🔍 Aplicando filtros:', userFilters);
      fetchNGOMembers(userFilters);
      setCurrentPage(1); // Resetar para primeira página
    };
  
    /**
     * Callback para quando o usuário limpar filtros
     */
    const handleClearFilters = () => {
      console.log('🧹 Limpando filtros');
      fetchNGOMembers(); // Buscar sem filtros
      setCurrentPage(1); // Resetar para primeira página
    };
  



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

  // --- Layout e paginação ---

   // --- Layout e paginação ---
  const [hideMembersFilter, setHideMembersFilter] = useState(window.innerWidth < 1240);


  // Define quando o filtro deve se mostrado no lado da tela (modo mobile ao clicar no botão "filtros").
  const [showMembersFilterOnSide, setShowMembersFilterOnSide] = useState(false);

  /**
   * Retorna a quantidade de pets que devem ser mostrados por página, de acordo com a largura atual da janela.
   */
  const getMembersPerPage = () => {
    if (window.innerWidth >= 1612) return 9;
    else if (window.innerWidth >= 800) return 6;
    else return 5;
  };

  const [membersPerPage, setMembersPerPage] = useState<number>(getMembersPerPage());
  const [currentPage, setCurrentPage] = useState(1);

  // Define os pets que serão mostrados com base na página atual
  const startIndexShowedPets = membersPerPage * (currentPage - 1);
  const showedMembers = ngoMembers.slice(startIndexShowedPets, startIndexShowedPets + membersPerPage);

  /**
   * Atualiza o estado do layout e quantidade de pets por página ao redimensionar a tela.
   */
  useEffect(() => {
    const handleResize = () => {
      const isWindowSmall = window.innerWidth < 1240;
      const newmembersPerPage = getMembersPerPage();

      setMembersPerPage(newmembersPerPage);
      setHideMembersFilter(isWindowSmall);

      // Corrige página atual se necessário
      if (ngoMembers.length > 0 && newmembersPerPage * currentPage > ngoMembers.length) {
        setCurrentPage(Math.ceil(ngoMembers.length / newmembersPerPage));
      }


      // Fecha o filtro no lado da tela se a janela for redimensionada para modo desktop
      if (!isWindowSmall && showMembersFilterOnSide) {
        setShowMembersFilterOnSide(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showMembersFilterOnSide,ngoMembers.length, currentPage]);

  /**
   * Efeito que desativa o scroll do `body` quando o filtro estiver ocupando a tela toda.
   */
  useEffect(() => {
    document.body.style.overflow = showMembersFilterOnSide ? "hidden" : "";
  }, [showMembersFilterOnSide]);

  /**
   * Função para deletar um membro
   */
  const deleteMember = async (memberId: string) => {
    try {  
      console.log(memberId);
      await userService.delete(memberId);
      // Remover a ONG da lista local
      setNgoMembers(prevMembers => prevMembers.filter(member => member.id !== memberId));
      
      // Ajustar página atual se necessário
      const updatedMembers = ngoMembers.filter(member => member.id !== memberId);
      if (membersPerPage * currentPage > updatedMembers.length && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }

      resetToast();
      setShowToast(true);
      setToastType("excluir");

      showTimeoutRef.current = setTimeout(() => setToastVisible(true), 50);
      hideTimeoutRef.current = setTimeout(() => setToastVisible(false), 3000);
      fullCloseTimeoutRef.current = setTimeout(() => {
        setShowToast(false);
      }, 3500);
      
    } catch (err) {
      
    }
  };
  
  /**
   * Função para lidar com o clique em deletar
   */
  const handleDeleteClick = (member: User) => {
    setMemberToDelete(member); // Apenas abre o modal
  };


  /**
   * Função para lidar com o clique em editar
   */

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fullCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<User | null>(null);
  const [toastType, setToastType] = useState<"excluir" | "editar" | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  
    // Fecha toast com animação
   const resetToast = () => {
    setToastVisible(false);
  
    if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    if (fullCloseTimeoutRef.current) clearTimeout(fullCloseTimeoutRef.current);
  
    setShowToast(false);
    setToastType(null)
    };
  
  
    // Confirmar exclusão
   const handleDeleteConfirm = async () => {
    if (!memberToDelete) return;

    await deleteMember(memberToDelete.id);
    setMemberToDelete(null);
    
   
  };


  useEffect(() => {
    document.body.style.overflow = isEditModalOpen ? "hidden" : "";
  }, [isEditModalOpen]);
  


  return (
    <div>
      <Header
        color="#FFF6E8"
        Logo={HorizontalLogo}
        isLoggedIn={isLoggedIn}
        user={user}
      />
      <BannerComponent limitWidthForImage="850px" color="rgba(178, 243, 255, 1)"  title="Gerencie sua equipe dos sonhos!" subTitle="Veja, organize e acompanhe sua equipe de um jeito simples e prático."   imageUrl={ManageMembersHamster}/>
           <Msg>{isLoading && <p>Carregando...</p>}
              {errorMessage && <div style={{ color: 'red', margin: '10px 0' }}>{errorMessage}</div>}</Msg>
           <TopBarContainer>
              <TopBarContent>
                
                {hideMembersFilter  && (
                  <PrimarySecondaryButton 
                    onClick={() => setShowMembersFilterOnSide(true)} 
                    content="Filtros"  
                    height = {"48px"} 
                    paddingH= {"26px"} />
                )}
                <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Gerenciar ONGs" },  ]} />
              </TopBarContent>
              
            </TopBarContainer>
      
          {showMembersFilterOnSide && (
            <Overlay>
              <CloseButton onClick={() => setShowMembersFilterOnSide(false)}>x</CloseButton>
      
              <MembersFilter
                members={allMembers.map(member => member.name)}
                name={name}
                setName={setName}
                hasBorder={false}
                onSearch={handleSearch}
                onClearFilters={handleClearFilters}
              />
            </Overlay>
          )}
      
          <ContentContainer>
          
            
            {!hideMembersFilter && allMembers.length > 0 && (
              <MembersFilter
                members={ngoMembers.map(member => member.name)}
                name={name}
                setName={setName}
                hasBorder={true}
                onSearch={handleSearch}
                onClearFilters={handleClearFilters}
              />
            )}
      
      
              <div style={{minWidth: hideMembersFilter? "60%" : "50%", width: hideMembersFilter? "80%" : "auto", display: "flex", flexDirection: "column", gap: "36px"}}>
             
                <SectionWithEmptyState 
                  title="Administradores"
                  subtitle="Veja quem está como administrador no momento"
                  emptyMessage="Nenhum Administrador Encontrado"
                  expandContainer={hideMembersFilter}
                  emptyState={showedMembers.length == 0}
              />
             
              
            
                <NGOCardsContainer>
                  {showedMembers.length > 0 && showedMembers.map((member) => (
                   <MemberInfoCard
                    key={member.id}
                    member={member}
                    showEditOptions = {true}
                    onDeleteClick={() => handleDeleteClick(member)}
                  />
                  ))}
                </NGOCardsContainer>
      
                </div>
            </ContentContainer>
             <PaginationButtons
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                itemsLength={ngoMembers.length}
                itemsPerPage={membersPerPage}
                buttonHeight="30px"
                buttonWidth="30px"
                containerHeight="160px"
                scrollTo="top-bar"
              />
              <Footer />
             {memberToDelete && (
                <ConfirmModal
                  isOpen={true}
                  title={"Só confirmando, deseja mesmo excluir esse administrador?"}
                  message={"Tem certeza? Ao excluir, o administrador será removido do sistema permanentemente."}
                  confirmLabel={"Sim, excluir"}
                  cancelLabel="Cancelar"
                  onConfirm={handleDeleteConfirm}
                  onClose={() => setMemberToDelete(null)}
                />
              )}

              {showToast && toastType && (
                <Toast
                  message={`${toastType === "excluir" ? "Administrador excluído com sucesso!" : "Alterações salvas com sucesso"}`}
                  description= {`${toastType === "excluir" ? "O administrador foi removido do sistema." : "Os dados do administrador foram atualizados."}`}
                  onClose={() => {
                    setToastVisible(false);
                    setTimeout(() => setShowToast(false), 300);
                  }}
                  isVisible={toastVisible}
                />
              )}

      
    
      
      
    </div>
  ); 
};


export default ManageNGOMembers;