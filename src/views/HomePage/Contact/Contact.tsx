import {GridContainer, Image1Div, Image2Div, CardDiv, Footer, FooterDiv1, FooterDiv2, FooterDiv3, FooterDiv4, SocialIconsDiv, Image1, Image2, Image3} from "./styles"
import ContactCard from "../../../components/ContactCard";
import SocialIcon from "../../../components/socialIcon";
import LinkText from "../../../components/LinkText/LinkText";
import Gatinhos from "../../../assets/Contato.png"
import Lines from "../../../assets/linesContact.png"
import Logo from "../../../assets/Logo Horizontal.png"
import Insta from "../../../assets/insta.png"
import Facebook from "../../../assets/facebook.png"
import Youtube from "../../../assets/youtube.png"
import Tiktok from "../../../assets/tiktok.png"
import { StyledLink } from "../../../components/button1/styles";


const Contact = () => {
    
    return (
        
        <GridContainer>

            <Image1Div>
                <Image1 src = {Gatinhos}/>
            </Image1Div>
            
            <Image2Div>
                <Image2 src = {Lines}/>
            </Image2Div>

            <CardDiv>

                <ContactCard title="Você Pode Falar Conosco" subtitle="Tem Alguma Dúvida?" buttonTitle="Fale Conosco" to="/teste" position="center" background_color="#FFF6E8">
                    <p>Tem alguma dúvida ou gostaria de contribuir com o nosso projeto? Fale com a gente pelo link, e responderemos o mais rápido possível!</p>
                </ContactCard>

            </CardDiv>

            <Footer>
            
                <FooterDiv1>
                    <Image3 src = {Logo}/>
                    <p>Nosso objetivo é <span style={{fontWeight: 800}}>Alcançar Finais Felizes</span>, proporcionando lares amorosos e seguros para todos os animais. </p>
                </FooterDiv1>

                <FooterDiv2>
                    <StyledLink to= "/teste"> <p>Institucional</p> </StyledLink>
                    <StyledLink to= "/teste"> <p>Sobre Nós</p> </StyledLink> 
                    <StyledLink to= "/teste"> <p>Animais Recém Adicionados</p> </StyledLink>
                    <StyledLink to= "/teste"> <p>Dicas</p> </StyledLink>
                    <StyledLink to= "/teste"> <p>Fale Conosco</p> </StyledLink>
                    <StyledLink to= "/teste"> <p>Cadastrar ONG</p> </StyledLink>
                    <StyledLink to= "/teste"> <p>Politica de Privacidade</p> </StyledLink>
                </FooterDiv2>

                <FooterDiv3>
                    <StyledLink to= "/teste"> <p>Login</p> </StyledLink>
                    <StyledLink to= "/teste"> <p>Sou Admnistrador</p> </StyledLink>
                    <StyledLink to= "/teste"> <p>Sou uma ONG</p> </StyledLink>
                    <StyledLink to= "/teste"> <p>Sou Membro de ONG</p> </StyledLink>
                </FooterDiv3>

                <FooterDiv4>
                    <p>Mídias Sociais</p>
                    <SocialIconsDiv>
                        <SocialIcon image={Insta} width="100%" to="/teste" background="#FF9944"/>
                        <SocialIcon image={Facebook} width="75%" to="/teste" background="#FF9944"/>
                        <SocialIcon image={Youtube} width="100%" to="/teste" background="#FF9944"/>
                        <SocialIcon image={Tiktok} width="100%" to="/teste" background="#FF9944"/>

                    </SocialIconsDiv>
                </FooterDiv4>
            
            </Footer>

        </GridContainer>
    );
};

export default Contact;