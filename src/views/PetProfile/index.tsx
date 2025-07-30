import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
    BackButtonContainer,
    Container,
    Main
} from "./styles";

import Header from "../../components/Header";
import Footer from "../HomePage/6Footer";
import ActionText from "../../components/ActionText";
import { ChevronLeft } from 'lucide-react';


import loginPageLogo from "../../assets/HorizontalLogo.png";

const PetProfile: React.FC = () => {
    
    const headerOptions = [
    "Sobre Nós",
    "Animais Recém Adicionados",
    "Dicas",
    "Fale Conosco",
    ];

    const handleHeaderAction = (selected: string) => {
    // Ação a ser definida
    };

    const navigate = useNavigate();

    const handleUserAction = (selected: string) => {
        if (selected === "Manage Infors") navigate("/manageInfo");
    };

    const currentUserOptions = ["Manage Infors"];

    const currentUserActions = handleUserAction;
    return (
        <Container>

            <Header
                options={headerOptions}
                optionsToAction={handleHeaderAction}
                color="#FFF6E8"
                Logo={loginPageLogo}
            />

            <Main>

                <BackButtonContainer>
                    <ActionText
                        key={currentUserOptions[0]}
                        fontSize="1rem"
                        textColor="#553525"
                        onClick={() => currentUserActions(currentUserOptions[0])}
                        underlineOnHover={true}
                    >
                        <ChevronLeft size={20}/>
                        <h2> Voltar </h2>

                    </ActionText>
                </BackButtonContainer>

            </Main>

            <Footer />

        </Container>
    );
};

export default PetProfile;