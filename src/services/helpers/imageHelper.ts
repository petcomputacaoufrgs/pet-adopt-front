const getFullImageUrl = (imagePath: string): string => {
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3002/api/v1';
  return `${baseURL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
};

export const imageHelper = {
  getFullImageUrl
};