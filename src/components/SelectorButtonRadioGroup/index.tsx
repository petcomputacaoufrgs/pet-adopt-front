import { Container } from './styles';
import { SelectorRadioGroupProps } from './types'; 

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

  const handleSelect = (index: number) => {
    if (selectedValue === -1 || selectedValue !== index) {
      setSelectedValue(index);
    } else {
      setSelectedValue(-1); 
    }
  };

  return (
    <Container>
      {options.map((option, index) => (
        <SelectorButton
          key={option.value}
          label={option.label}
          active={selectedValue === -1 || selectedValue === index} 
          clicked={selectedValue === index} 
          setActive={() => handleSelect(index)} 
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