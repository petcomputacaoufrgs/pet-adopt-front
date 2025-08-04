import React from 'react';
import { CarouselIndicatorProps } from './types.d';
import { IndicatorContainer, IndicatorBar } from './styles';

const CarouselIndicator: React.FC<CarouselIndicatorProps> = ({
  totalItems,
  activeIndex,
  onIndicatorClick,
}) => {
  // Cria um array de números de 0 a (totalItems - 1) para o loop
  const indicators = Array.from({ length: totalItems }, (_, index) => index);

  return (
    <IndicatorContainer>
      {indicators.map(index => (
        <IndicatorBar
          key={index}
          $isActive={index === activeIndex}
          onClick={() => onIndicatorClick?.(index)} // Chama a função se ela existir
        />
      ))}
    </IndicatorContainer>
  );
};

export default CarouselIndicator;