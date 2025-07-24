// RadioButton/index.tsx
import { useState } from 'react';
import { StyledInput, StyledRadioButton } from './styles';
import { RadioOption } from './types';

function RadioButton({
  label,
  value,
  groupName,
  checked,
  onChange,
  onSelectToggle,
  fontSize,
  required = true,
  userFillOption,
  index,
  userFillInputWidth = "70%"
}: RadioOption) {

  const [customValue, setCustomValue] = useState('');

  // Implementa um toggle para desmarcar se 'required' for falso
  const handleToggleSelection = () => {
    if (!required && checked) {
      if (onChange) onChange('');
      onSelectToggle(-1); // Desseleciona o radio button

    } else {
      if (onChange) onChange(value); // Seleciona o radio button
      onSelectToggle(index);
      setCustomValue('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setCustomValue(newValue);
    if (onChange) onChange(newValue);
  };




  return (
    <label
      key={value}
      style={{
        display: 'flex',
        position: "relative",
        alignItems: 'center',
        gap: '0.75em', // 12px / 16px (base font size) = 0.75em
        fontSize: fontSize,
        color: '#553525',
      }}
    >
      <StyledRadioButton
        type="radio"
        name={groupName}
        value={value}
        onChange={handleToggleSelection} // Usa a nova função de toggle
        checked={checked}
      />
      {label}


     {userFillOption && checked && (
        <StyledInput
          $inputWidth={userFillInputWidth}
          $fontSize={fontSize}
          type="text"
          placeholder="Informe aqui"
          value={customValue}
          onChange={handleInputChange}
        />
      )}


    </label>
  );
}

export default RadioButton;