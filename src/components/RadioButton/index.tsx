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
}: RadioOption) { const handleToggleSelection = () => {
    if (!required && checked) {
      onChange(''); 
    } else {
      onChange(value);
    }
  };

  return (
    <label
      key={value}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75em', 
        fontSize: fontSize,
        color: '#553525',
      }}
    >
      <StyledRadioButton
        type="radio"
        name={groupName}
        value={value}
        onChange={handleToggleSelection} 
        checked={checked}
      />
      {label}
    </label>
  );
}

export default RadioButton;