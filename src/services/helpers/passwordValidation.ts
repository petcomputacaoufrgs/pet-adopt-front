// Helpers para validação de senha forte

export interface PasswordValidationResult {
  isValid: boolean;
  errorMessage: string;
}

/**
 * Valida se a senha atende aos requisitos de senha forte
 * - Mínimo 6 caracteres
 * - Pelo menos 1 letra maiúscula
 * - Pelo menos 1 número
 * - Pelo menos 1 caractere especial
 */
export const validatePassword = (password: string): PasswordValidationResult => {
  // Se vazio, não retorna erro (validação de campo obrigatório é separada)
  if (password.trim() === '') {
    return { isValid: true, errorMessage: '' };
  }

  if (password.length < 6) {
    return { isValid: false, errorMessage: 'Mínimo 6 caracteres' };
  }

  if (!/[A-Z]/.test(password)) {
    return { isValid: false, errorMessage: 'Mínimo 1 letra maiúscula' };
  }

  if (!/[0-9]/.test(password)) {
    return { isValid: false, errorMessage: 'Mínimo 1 número' };
  }

  if (!/[!@#$%^&*]/.test(password)) {
    return { isValid: false, errorMessage: 'Mínimo 1 caractere especial' };
  }

  return { isValid: true, errorMessage: '' };
};

/**
 * Valida se a confirmação de senha corresponde à senha original
 */
export const validatePasswordConfirmation = (
  password: string,
  confirmPassword: string
): PasswordValidationResult => {
  // Se vazio, não retorna erro (validação de campo obrigatório é separada)
  if (confirmPassword.trim() === '') {
    return { isValid: true, errorMessage: '' };
  }

  if (confirmPassword !== password) {
    return { isValid: false, errorMessage: 'As senhas não coincidem' };
  }

  return { isValid: true, errorMessage: '' };
};

/**
 * Hook-like helper para usar em componentes React
 * Retorna funções que atualizam os estados de erro
 */
export const createPasswordValidators = (
  setPasswordError: (error: boolean) => void,
  setPasswordErrorMessage: (message: string) => void,
  setConfirmPasswordError: (error: boolean) => void,
  setConfirmPasswordErrorMessage: (message: string) => void
) => {
  const verifyPassword = (password: string) => {
    const result = validatePassword(password);
    setPasswordError(!result.isValid);
    setPasswordErrorMessage(result.errorMessage);
  };

  const verifyConfirmPassword = (password: string, confirmPassword: string) => {
    const result = validatePasswordConfirmation(password, confirmPassword);
    setConfirmPasswordError(!result.isValid);
    setConfirmPasswordErrorMessage(result.errorMessage);
  };

  return { verifyPassword, verifyConfirmPassword };
};
