import { StyledRadioButton } from "./styles";

interface RadioOption {
  label: string;
  value: string;
  groupName: string;
  checked: boolean;
  onChange: (value : string) => void;
  fontSize: string;
  required?: boolean
}


function RadioButton({ label, value, groupName, checked, onChange, fontSize, required=true }: RadioOption) {
  const undoSelectionOnClick = required? () => {} : () => {if (checked) onChange(""); }; // Implementando um toggle ao invés de um radio, basicamente

  return (
        <label key={value} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: fontSize, color: "#553525" }}>
          <StyledRadioButton
            type="radio"
            name={groupName}
            value={value}
            onChange={() => onChange(value)}
            onClick={undoSelectionOnClick}
            checked={checked}
          />
          {label}
        </label>
  );
}

export default RadioButton;
