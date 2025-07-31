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
import Header from "../../components/Header";
import NGOsFilter from "../../components/NGOsFilter";
import PaginationButtons from "../../components/PaginationButtons";
import PrimarySecondaryButton from "../../components/PrimarySecondaryButton";
import OngInfoCard from "../../components/OngInfoCard";
import Footer from "../HomePage/6Footer";

import HorizontalLogo from "../../assets/HorizontalLogo.png";
import ManageNGOsCat from "../../assets/ManageNGOsCat.png";

const ManageNgo = () => {

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

  /**
   * Retorna a quantidade de pets que devem ser mostrados por página, de acordo com a largura atual da janela.
   */
  const getNGOsPerPage = () => {
    if (window.innerWidth >= 1612) return 9;
    else if (window.innerWidth >= 800) return 6;
    else return 5;
  };


  const ngos = ["Isso aqui vai ser", "pego do back.", "Como são só os nomes,", "possivelmente não tem", "problema de pegar", "todas as ONGs que", "temos de uma vez"]

  const [ngosPerPage, setPetsPerPage] = useState<number>(getNGOsPerPage());
  const [currentPage, setCurrentPage] = useState(1);

  // Define os pets que serão mostrados com base na página atual
  const startIndexShowedNGOs = ngosPerPage * (currentPage - 1);
  const showedNGOs = ngos.slice(startIndexShowedNGOs, startIndexShowedNGOs + ngosPerPage);


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
      if (newNGOsPerPage * currentPage > ngos.length) {
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
        ngos={ngos}
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
        ngos={ngos}
        selectedState={selectedState}
        setSelectedState={setSelectedState}
        city={city}
        setCity={setCity}
        name={name}
        setName={setName}
      />
    )}

    <NGOCardsContainer>
      {showedNGOs.map((pet, index) => (
        <OngInfoCard
            key={index}
            showEditOptions={true}
          />
      ))}
    </NGOCardsContainer>
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
  )
};


export default ManageNgo;


