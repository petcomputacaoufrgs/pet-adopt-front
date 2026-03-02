export const getTextRules = (fieldName: string, maxLength: number, isRequired = true) => ({
  required: isRequired ? `${fieldName} é obrigatório` : false,
  maxLength: {
    value: maxLength,
    message: `O limite é de ${maxLength} caracteres`
  }
});

export const getEmailRules = (maxLength: number) => ({
  required: "E-mail é obrigatório",
  pattern: {
    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    message: "Digite um e-mail válido"
  },
  maxLength: {
    value: maxLength,
    message: `O limite é de ${maxLength} caracteres`
  }
});