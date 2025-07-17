// RadioGroup/index.tsx
import RadioButton from '../RadioButton';

import { Container, Label, Required } from './styles';
import { RadioGroupProps } from './types';

// A interface Option pode ser removida se já estiver definida em types.ts
// interface Option {
//   label: string;
//   value: string;
// }

function RadioGroup({
  title,
  required,
  fontSize,
  name,
  options,
  selectedValue,
  onChange,
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