import {Container,
        MiddleContainer,
        Voltar,
        ProfileContainer,
        NgoCardContainer,
        NgoNameContainer,
        NgoInformationsContainer,
        NgoDescriptionContainer,
        NgoTextsContainer,
        NgoFormsContainer
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

            <MiddleContainer>
                <Voltar>Voltar</Voltar>

                <ProfileContainer>
                    <NgoCardContainer>
                        <NgoNameContainer>
                            NgoNameContainer
                        </NgoNameContainer>

                        <NgoInformationsContainer>
                            NgoInformationsContainer
                        </NgoInformationsContainer>
                    </NgoCardContainer>

                    <NgoDescriptionContainer>
                        <NgoTextsContainer>
                            NgoTextsContainer
                        </NgoTextsContainer>

                        <NgoFormsContainer>
                            NgoFormsContainer
                        </NgoFormsContainer>
                    </NgoDescriptionContainer>
                </ProfileContainer>
            </MiddleContainer>
            <Footer/>
       </Container> 
    )}



export default ManageNgoProfile;