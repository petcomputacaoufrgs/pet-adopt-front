
export const getErrorMessage = (error: any, defaultMessage: string = 'Ocorreu um erro inesperado.'): string => {
  if (!error?.response) {
    return defaultMessage;
  }

  // Tratamento Específico para Rate Limit (429)
  if (error.response.status === 429) {
    // Header costuma ser em segundos, então divide por 60
    const retryAfter = error.response.headers?.['Retry-After'];
    const minutes = retryAfter ? Math.ceil(retryAfter / 60) : 1;
    
    return `Muitas tentativas realizadas. Por favor, aguarde ${minutes} minuto${minutes > 1 ? 's' : ''} antes de tentar novamente.`;
  }

  // Tratamento Genérico (Mensagem vinda da API)
  if (error.response.data?.message) {
    return error.response.data.message;
  }

  return defaultMessage;
};