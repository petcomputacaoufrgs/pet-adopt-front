import { BannerContainer, ImageContainer } from "./styles";
import Info from "../../../components/Info";

import React from "react";

interface AboutProps {
  id?: string;
}

const Banner: React.FC<AboutProps> = ({ id}) => {

  return (
    <BannerContainer>
      <Info
        subTitle="Lorem ipsum dolor sit amet"
        title="Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
        buttonTitle="Veja Nossos Animaizinhos"
        to="/searchAnimals"
        position="flex-start"
      >
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </Info>

      <ImageContainer/>

    </BannerContainer>
  );
};

export default Banner;




