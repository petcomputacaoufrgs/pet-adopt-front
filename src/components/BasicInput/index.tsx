import { StyledInput } from "./styles"

interface BasicInputProps {
  title: string;
  required: boolean;
  fontSize: string;
  placeholder: string;
  width: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  paddingRight?: string;
  readOnly?: boolean;
  inputType?: string;
  children?: React.ReactNode; // pra encaixar o botão (ícone) ao lado
}

export default function BasicInput({
  title,
  required,
  fontSize,
  placeholder,
  width,
  value,
  onChange,
  onClick,
  paddingRight = "24px",
  readOnly = false,
  inputType = "Primário",
  children,
}: BasicInputProps) {
  return (
    <>
      {title && (
        <label
          style={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: fontSize,
            fontWeight: 700,
            color: '#553525',
            marginBottom: '6px',
          }}
        >
          {title}
          {required && <span style={{ color: '#F17D6E' }}> *</span>}
        </label>
      )}

      <div
        style={{
          width: width,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <StyledInput
          readOnly={readOnly}
          width={width}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          fontSize={fontSize}
          onClick={onClick}
          paddingRight={paddingRight}
          inputType={inputType}
        />

        {children}
      </div>
    </>
  );
}
