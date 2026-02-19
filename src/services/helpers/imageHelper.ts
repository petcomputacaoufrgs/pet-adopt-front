const getFullImageUrl = (imagePath: string): string => {
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  

  const apiURL = import.meta.env.VITE_API_URL || 'http://localhost:3002/api/v1';


  try {
    // Se imagePath começar com "/", o construtor URL ignora o "/api/v1" 
    // e monta direto na raiz do domínio.
    // Ex: new URL('/uploads/foto.jpg', 'http://localhost:3002/api/v1')
    // Resultado: http://localhost:3002/uploads/foto.jpg
    
    const url = new URL(imagePath, apiURL);
    return url.href;

  } catch (error) {
    // Fallback caso algo muito estranho aconteça
    console.error("Erro ao montar URL da imagem:", error);
    return imagePath;
  }


};

export const imageHelper = {
  getFullImageUrl
};