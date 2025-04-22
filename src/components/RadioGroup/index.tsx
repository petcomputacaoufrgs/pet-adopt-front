import RadioButton from '../RadioButton';

interface Option {
  label: string;
  value: string;
}

interface RadioGroupProps {
  title: string;
  required: boolean;
  fontSize: string;
  name: string;
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
}

export default function RadioGroup({ title, required, fontSize, name, options, selectedValue, onChange }: RadioGroupProps) {
  return (
    <div style={{gap: "16px", display: "flex", flexDirection: "column"}}>

    {title && (
        <label
          style={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: fontSize,
            fontWeight: 700,
            color: '#553525',
          }}
        >
          {title}
          {required && <span style={{ color: '#F17D6E' }}> *</span>}
        </label>
      )}

    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {options.map((opt) => (
        <RadioButton
          key={opt.value}
          label={opt.label}
          value={opt.value}
          groupName={name}
          checked={selectedValue === opt.value}
          onChange={onChange}
          fontSize={fontSize}
          required={required}
        />
      ))}
    </div>
    </div>
  );
}
