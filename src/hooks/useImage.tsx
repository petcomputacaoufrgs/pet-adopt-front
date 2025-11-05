import { useState, useEffect } from 'react';
import { imageHelper } from '../services/helpers/imageHelper';

interface UseImageProps {
  imagePath: string | null;
  fallbackImage?: string;
}

export const useImage = ({ imagePath, fallbackImage }: UseImageProps) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!imagePath) {
      setImageUrl(fallbackImage || '');
      return;
    }

    const fullUrl = imageHelper.getFullImageUrl(imagePath);
    
    // Verificar se a imagem existe
    const img = new Image();
    img.onload = () => {
      setImageUrl(fullUrl);
      setError(false);
    };
    img.onerror = () => {
      setImageUrl(fallbackImage || '');
      setError(true);
    };
    img.src = fullUrl;
  }, [imagePath, fallbackImage]);

  return { imageUrl, error };
};