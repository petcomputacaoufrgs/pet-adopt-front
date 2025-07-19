import {Container,
        ProfileContainer,
        NgoCardContainer,
        NgoNameContainer,
        NgoInformationsContainer,
        NgoDescriptionContainer,
        NgoTextsContainer,
        NgoFormsContainer,
        Voltar
 } from "./styles";

import logo from "../../assets/HorizontalLogo.png";

import Header from "../../components/Header";
import Footer from "../HomePage/6Footer";


const ManageNgoProfile = () => {
    const headerOptions = ["Sobre Nós", "Animais Recém Adicionados", "Dicas", "Fale Conosco"]
    const handleHeaderAction = (selected: string) => {} 

    return (
       <Container>
            <Header options={headerOptions} optionsToAction={handleHeaderAction} color="rgba(0, 0, 0, 0)" Logo={logo} />

            <Voltar/>

            <ProfileContainer>
                <NgoCardContainer>
                    <NgoNameContainer></NgoNameContainer>
                    <NgoInformationsContainer></NgoInformationsContainer>
                </NgoCardContainer>

                <NgoDescriptionContainer>
                    <NgoTextsContainer></NgoTextsContainer>
                    <NgoFormsContainer></NgoFormsContainer>
                </NgoDescriptionContainer>
            </ProfileContainer>

            <Footer/>
       </Container> 
    )}



export default ManageNgoProfile;