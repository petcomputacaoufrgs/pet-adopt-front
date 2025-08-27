import axios from 'axios';

import Header from "../../components/Header";
import logo from "../../assets/HorizontalLogo.png";
import { User } from "../../types/user";
import { useState, useEffect } from "react";
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
import PaginationButtons from "../../components/PaginationButtons";
import PrimarySecondaryButton from "../../components/PrimarySecondaryButton";
import SuccessToast from "../../components/SuccessToast";
import MemberInfoCard from '../../components/MemberInfoCard';
import Footer from "../HomePage/6Footer";
import ConfirmModal from "../../components/ConfirmModal";
import HorizontalLogo from "../../assets/HorizontalLogo.png";
import ManageMembersHamster from "../../assets/ManageMembersHamster.png";
import SectionWithEmptyState from "../../components/SectionWithEmptyState";
import MembersFilter from "../../components/MembersFilter";
import EditMemberModal from '../../components/EditMemberModal/EditMemberModal';


const ManageNGOMembers: React.FC = () => {
  const [ngoMembers, setNgoMembers] = useState<User[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState<string>("");


  useEffect(() => {
    fetchNGOMembers();
  }, []);

  const fetchNGOMembers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:3002/api/v1/users/role/NGO_MEMBER');
      setNgoMembers(response.data);
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message || 'Erro ao carregar membros de ONGs.');
      } else {
        setErrorMessage('Erro de conexão. Tente novamente mais tarde.');
      }
    } finally {
      setIsLoading(false);
    }
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
   * Função para deletar uma ONG
   */
  const deleteMember = async (memberId: string) => {
    try {  
      await axios.delete(`http://localhost:3002/api/v1/ngos/${memberId}`);
      
      // Remover a ONG da lista local
      setNgoMembers(prevMembers => prevMembers.filter(member => member.id !== memberId));
      
      // Ajustar página atual se necessário
      const updatedMembers = ngoMembers.filter(member => member.id !== memberId);
      if (membersPerPage * currentPage > updatedMembers.length && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      
    } catch (err) {
      
      if (axios.isAxiosError(err) && err.response) {
        setErrorMessage(err.response.data?.message || 'Erro ao deletar ONG.');
      } else {
        setErrorMessage('Erro de conexão. Tente novamente mais tarde.');
      }
    }
  };
  
  /**
   * Função para lidar com o clique em deletar
   */
  const handleDeleteClick = (member: User) => {
    if (!member) return;
    
    const confirmDelete = window.confirm(
      `Tem certeza que deseja excluir a ONG "${member.name}"? Esta ação não pode ser desfeita.`
    );
    
    if (confirmDelete) {
      deleteMember(member.id);
    }
  };

  /**
   * Função para lidar com o clique em editar
   */

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [memberBeingEdited, setMemberBeingEdited] = useState<User | null>(null);

  useEffect(() => {
    document.body.style.overflow = isEditModalOpen ? "hidden" : "";
  }, [isEditModalOpen]);

  const handleEditClick = (member: User) => {
   if (!member) return;

    setMemberBeingEdited(member);
    setIsEditModalOpen(true);
  };
  


  return (
    <div>
      <Header options={headerOptions} optionsToAction={handleHeaderAction} color="#FFF6E8" Logo={HorizontalLogo}/>
      <BannerComponent limitWidthForImage="850px" color="rgba(178, 243, 255, 1)"  title="Gerencie sua equipe dos sonhos!" subTitle="Veja, organize e acompanhe sua equipe de um jeito simples e prático."   imageUrl={ManageMembersHamster}/>
           
           <TopBarContainer>
              <TopBarContent>
                {hideMembersFilter && (
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
                ngoMembers={ngoMembers.map(ngo => ngo.name)}
                name={name}
                setName={setName}
      
                hasBorder={false}
              />
            </Overlay>
          )}
      
          <ContentContainer>
            {isLoading && <p>Carregando...</p>}
            {errorMessage && <div style={{ color: 'red', margin: '10px 0' }}>{errorMessage}</div>}
            {!hideMembersFilter && (
              <MembersFilter
                ngoMembers={ngoMembers.map(member => member.name)}
                name={name}
                setName={setName}
              />
            )}
      
      
              <div style={{minWidth: hideMembersFilter? "60%" : "50%", width: hideMembersFilter? "80%" : "auto", display: "flex", flexDirection: "column", gap: "36px"}}>
              
              <SectionWithEmptyState 
                title="Administradores"
                subtitle="Veja quem está como administrador no momento"
                emptyMessage="Nenhuma ONG Encontrada"
                expandContainer={hideMembersFilter}
                emptyState={showedMembers.length == 0}
                buttonText="+ Cadastrar Pet"
                onButtonClick={() => {}}
              />

              
            
                <NGOCardsContainer>
                  {showedMembers.length > 0 && showedMembers.map((member) => (
                    <MemberInfoCard
                      key={member.id}
                      member={member}
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
                itemsLength={ngoMembers.length}
                itemsPerPage={membersPerPage}
                buttonHeight="30px"
                buttonWidth="30px"
                containerHeight="160px"
              />

              {isEditModalOpen && memberBeingEdited && (
                  <EditMemberModal
                    member={memberBeingEdited}
                    onClose={() => setIsEditModalOpen(false)}
                    onSave={(updatedMember) => {
                      setNgoMembers(prev =>
                        prev.map(m => (m.id === updatedMember.id ? updatedMember : m))
                      );
                    }}
                  />
                )}
              <Footer />
          
      
    
      
      
    </div>
  );
};


export default ManageNGOMembers;