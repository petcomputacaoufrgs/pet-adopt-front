// SelectorRadioGroup/index.tsx
import React from 'react'; // React é importado para usar o JSX

import { Container } from './styles';
import { SelectorRadioGroupProps } from './types'; // Assumindo que Option e SelectorRadioGroupProps estão em types.ts

import SelectorButton from '../SelectorButton';

function SelectorRadioGroup({
  options,
  selectedValue,
  setSelectedValue,
  width,
  height,
  overlayImageWidth = '0px',
  overlayImageHeight = '0px',
  overlayImageTop = '0px',
  overlayImageLeft = '0px',
}: SelectorRadioGroupProps) {
  // Lida com a seleção de um botão, permitindo desmarcar se já estiver selecionado
  const handleSelect = (index: number) => {
    if (selectedValue === -1 || selectedValue !== index) {
      setSelectedValue(index);
    } else {
      setSelectedValue(-1); // Desmarca o botão se ele já estiver selecionado
    }
  };

  return (
    <Container>
      {options.map((option, index) => (
        <SelectorButton
          key={option.value}
          label={option.label}
          active={selectedValue === -1 || selectedValue === index} // Ativo se nenhum selecionado ou se for o selecionado
          clicked={selectedValue === index} // Apenas "clicado" se for o selecionado
          setActive={() => handleSelect(index)} // Função para lidar com o clique
          width={width}
          height={height}
          backgroundImage={option.backgroundImage}
          backgroundColor={option.backgroundColor}
          overlayImage={option.overlayImage}
          overlayImageHeight={overlayImageHeight}
          overlayImageWidth={overlayImageWidth}
          overlayImageLeft={overlayImageLeft}
          overlayImageTop={overlayImageTop}
        />
      ))}
    </Container>
  );
}

export default SelectorRadioGroup;