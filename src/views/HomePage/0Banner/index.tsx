import { BannerContainer } from "./styles";

import Header from "../../../components/Header";
import Info from "../../../components/Info";

import logo from "../../../assets/HorizontalLogo.png"

interface AboutProps {
  id?: string;
}

const Banner: React.FC<AboutProps> = ({ id }) => {
  return (
    <BannerContainer>
      <Header color="rgba(0, 0, 0, 0)" user="not in" Logo={logo} />

      <Info
        subTitle="Lorem ipsum dolor sit amet"
        title="Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
        buttonTitle="Vejas Nossos Animaizinhos"
        to="/teste"
        position="flex-start"
      >
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </Info>
    </BannerContainer>
  );
};

export default Banner;




