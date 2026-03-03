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


export const validateState = (value: string) => {
  const validStates = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
  return validStates.includes(value) || "Selecione um estado válido";
}