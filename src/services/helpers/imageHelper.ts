const getFullImageUrl = (imagePath: string): string => {
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3002';
  return `${baseURL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
};

export const imageHelper = {
  getFullImageUrl
};