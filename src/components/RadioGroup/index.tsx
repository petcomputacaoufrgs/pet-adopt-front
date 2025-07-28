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
  onChange,
  userFillOptionLabel,
  toggleIndex,
  onSelectToggle
}: RadioGroupProps) {
  return (
    <Container>
      {title && (
        <Label fontSize={fontSize}>
          {title}
          {required && <Required> *</Required>}
        </Label>
      )}

      {options.map(({ label, value }, index) => (
        <RadioButton
          key={value}
          label={label}
          value={value}
          groupName={name}
          checked={toggleIndex === index}
          onChange={onChange}
          onSelectToggle={() => onSelectToggle(index)}
          index={index}
          fontSize={fontSize}
          required={required}
          userFillOption={userFillOptionLabel === label}
        />
      ))}
    </Container>
  );
}

export default RadioGroup;