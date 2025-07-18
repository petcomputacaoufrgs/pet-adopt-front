import React from "react";

import { InfoContainer, InfoContent } from "./styles";
import { IInfo } from "./types";

import PrimarySecondaryButton from "../PrimarySecondaryButton";

const Info = ({ subTitle, title, buttonTitle, to, position, children }: IInfo) => {
  // Nota: A propriedade 'to' está sendo passada para o componente Info,
  // mas não está sendo utilizada diretamente no componente retornado.
  // Se 'buttonTitle' estiver relacionado a uma navegação,
  // o 'onClick' do PrimarySecondaryButton deve lidar com isso,
  // possivelmente usando 'useNavigate' do 'react-router-dom'.

  const handleButtonClick = () => {
    // Exemplo de como você poderia usar 'to' se fosse necessário navegar
    // import { useNavigate } from "react-router-dom";
    // const navigate = useNavigate();
    // navigate(to);
    console.log(`Botão clicado! Título: ${buttonTitle}`);
    // Adicione a lógica desejada para o clique do botão aqui
  };

  return (
    <InfoContainer $position={position}>
      <InfoContent $position={position}>
        <h1>{subTitle}</h1>
        <h3>{title}</h3>
        {children}
      </InfoContent>

      {/* Foi corrigido o onClick do PrimarySecondaryButton para receber uma função */}
      <PrimarySecondaryButton
        width={"275px"}
        buttonType={"Primário"}
        isDisabled={false}
        content={buttonTitle}
        onClick={handleButtonClick}
      />
    </InfoContainer>
  );
};

export default Info;