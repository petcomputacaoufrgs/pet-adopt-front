import RadioButton from '../RadioButton';
import { Container, Label, Required } from './styles';

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

function RadioGroup({
  title,
  required,
  fontSize,
  name,
  options,
  selectedValue,
  onChange
}: RadioGroupProps) {
  return (
    <Container>
      {title && (
        <Label fontSize={fontSize}>
          {title}
          {required && <Required> *</Required>}
        </Label>
      )}

      {options.map(({ label, value }) => (
        <RadioButton
          key={value}
          label={label}
          value={value}
          groupName={name}
          checked={selectedValue === value}
          onChange={onChange}
          fontSize={fontSize}
          required={required}
        />
      ))}
    </Container>
  );
}

export default RadioGroup;