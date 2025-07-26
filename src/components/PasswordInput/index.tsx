import React from 'react';

import { PasswordContainer, StyledInput } from './styles';
import { PasswordInputProps } from './types';

import { Eye, EyeOff, CircleAlert } from 'lucide-react';

function PasswordInput({
  title,
  required,
  $fontSize,
  placeholder,
  $width,
  value,
  onChange,
  onClick,
  onKeyDown,
  $paddingRight = '24px',
  $readOnly = false,
  $inputType = 'Primário',
  error = false,
  errorMessage,
  isDisabled,
}: PasswordInputProps) {
  const [visible, setVisible] = React.useState(false);

  const inputType = visible && !isDisabled ? 'text' : 'password';

  return (
    <PasswordContainer>
      {title && (
        <label
          style={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: $fontSize,
            fontWeight: 700,
            color: '#553525',
            opacity: isDisabled ? 0.3 : 1,
          }}
        >
          {title}
          {required && <span style={{ color: '#F17D6E' }}> *</span>}
        </label>
      )}

      <div
        style={{
          width: $width,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <StyledInput
          disabled={isDisabled}
          $readOnly={$readOnly || isDisabled}
          $width={$width}
          type={isDisabled ? undefined : inputType}
          value={isDisabled ? undefined : value}
          onChange={isDisabled ? undefined : onChange}
          placeholder={placeholder}
          $fontSize={$fontSize}
          onClick={isDisabled ? undefined : onClick}
          onKeyDown={isDisabled ? undefined : onKeyDown}
          $paddingRight={$paddingRight}
          $inputType={$inputType}
          $error={error}
          style={{ opacity: isDisabled ? 0.3 : 1, cursor: isDisabled ? 'not-allowed' : 'auto' }}
        />

        <div
          style={{
            position: 'absolute',
            right: '1.25em', // 20px / 16px (base font size) = 1.25em
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            opacity: isDisabled ? 0.3 : 1,
          }}
        >
          {visible && !isDisabled ? (
            <EyeOff color="#A39289" size={20} onClick={() => setVisible(false)} />
          ) : (
            <Eye color="#A39289" size={20} onClick={isDisabled ? undefined : () => setVisible(true)} />
          )}
        </div>
      </div>

      {error && errorMessage && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375em'}}> {/* 6px convertidos para em */}
          <CircleAlert color="#FF3B30" size={`calc(${$fontSize} - 0.125em)`} /> {/* 2px convertido para em */}

          <span
            style={{
              color: '#FF3B30',
              fontSize: `calc(${$fontSize} - 0.125em)`, // 2px convertido para em
              fontWeight: 500,
              fontFamily: 'Nunito Sans, sans-serif',
            }}
          >
            {errorMessage}
          </span>

        </div>
      )}
    </PasswordContainer>
  );
}

export default PasswordInput;