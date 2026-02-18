
export const getErrorMessage = (error: any, defaultMessage: string = 'Ocorreu um erro inesperado.'): string => {
  if (!error?.response) {
    return defaultMessage;
  }

  switch (error.response.status) {
    case 429:
      // Header costuma ser em segundos, então divide por 60
      const retryAfter = error.response.headers?.['Retry-After'];
      const minutes = retryAfter ? Math.ceil(retryAfter / 60) : 1;
      return `Muitas tentativas realizadas. Por favor, aguarde ${minutes} minuto${minutes > 1 ? 's' : ''} antes de tentar novamente.`;
    case 403:
      return error.response.data?.message || 'Acesso negado. Você não tem permissão para realizar esta ação.';
    case 401:
      return error.response.data?.message || 'E-mail ou senha inválidos. Verifique suas credenciais.';
    default:
      // Tratamento Genérico (Mensagem vinda da API)
      if (error.response.data?.message) {
        return error.response.data.message;
      }
  }
  return defaultMessage;
};