import { BannerContainer } from "./styles";
import HeaderComponent from "../../../components/Header";
import InfoComponent from "../../../components/Info";
import logo from "../../../assets/Logo Horizontal.png"

interface AboutProps {
    id?: string; // Tornar o id opcional
}

const Banner: React.FC<AboutProps> = ({ id }) => {
    return (

        <BannerContainer>
            <HeaderComponent color = "rgba(0, 0, 0, 0)" user = "not in" Logo={logo}/>
            
            <InfoComponent subTitle = "Lorem ipsum dolor sit amet" title = "Lorem ipsum dolor sit amet, consectetur adipiscing elit," buttonTitle="Vejas Nossos Animaizinhos" to = "/teste" position="flex-start">
                  <p style={{fontSize:'clamp(1.2rem, 3vw, 1.5em)'}}> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>          
            </InfoComponent>

        </BannerContainer>
    );
};

export default Banner;
