import {GridContainer, Image1Div, Image2Div, CardDiv, Image1, Image2} from "./styles"

import ContactCard from "../../../components/ContactCard";

import Gatinhos from "../../../assets/HomePageCat.png"
import Lines from "../../../assets/HomePageLinesContact.png"

import {forwardRef} from "react";


const Contact = () => {
    
    return (
        
        <GridContainer id="contact">

            <Image1Div>
                <Image1 src = {Gatinhos}/>
            </Image1Div>
            
            <Image2Div>
                <Image2 src = {Lines}/>
            </Image2Div>

            <CardDiv>
                <ContactCard title="Você Pode Falar Conosco" subtitle="Tem Alguma Dúvida?" buttonTitle="Fale Conosco" to="" position="center" backgroundColor="#FFF6E8">
                    <p>Tem alguma dúvida ou gostaria de contribuir com o nosso projeto? Fale com a gente pelo link, e responderemos o mais rápido possível!</p>
                </ContactCard>
            </CardDiv>

        </GridContainer>
    );

};


export default Contact;