// RadioButton/index.tsx
import { StyledRadioButton } from './styles';
import { RadioOption } from './types';

function RadioButton({
  label,
  value,
  groupName,
  checked,
  onChange,
  fontSize,
  required = true,
}: RadioOption) {
  // Implementa um toggle para desmarcar se 'required' for falso
  const handleToggleSelection = () => {
    if (!required && checked) {
      onChange(''); // Desseleciona o radio button
    } else {
      onChange(value); // Seleciona o radio button
    }
  };

  return (
    <label
      key={value}
      style={{
        display: 'flex',
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
    </label>
  );
}

export default RadioButton;