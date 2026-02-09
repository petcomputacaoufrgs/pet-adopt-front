const getFullImageUrl = (imagePath: string): string => {
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  let baseURL = process.env.REACT_APP_ASSETS_URL ?? '';



  const path = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;

  console.log(`${baseURL}${path}`);

  console.log(`${baseURL}${path}`);
  return `${baseURL}${path}`;
};

export const imageHelper = {
  getFullImageUrl
};