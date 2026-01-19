
// Verifica se o erro é de rate limiting e retorna a mensagem apropriada
export const handleRateLimitError = (error: any): { isRateLimited: boolean; message: string } => {
  if (error.response?.status === 429) {
    const retryAfter = error.response.headers?.['Retry-After'];
    const minutes = retryAfter ? Math.ceil(retryAfter / 60) : 1;
    
    return {
      isRateLimited: true,
      message: `Muitas tentativas realizadas. Por favor, aguarde ${minutes} minuto${minutes > 1 ? 's' : ''} antes de tentar novamente.`
    };
  }
  
  return {
    isRateLimited: false,
    message: ''
  };
};

// Obtém a mensagem de erro apropriada com base no tipo de erro
export const getErrorMessage = (error: any, defaultMessage: string = 'Ocorreu um erro inesperado.'): string => {
  const rateLimitCheck = handleRateLimitError(error);
  
  if (rateLimitCheck.isRateLimited) {
    return rateLimitCheck.message;
  }
  
  return defaultMessage;
};
