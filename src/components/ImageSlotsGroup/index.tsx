import { useRef } from "react";
import { ImageSlot } from "../ImageSlot";

interface ImageSlotData {
  id: string;
  file?: File;
  url?: string;
  preview: string;
}

interface IImageSlotsGroup {
  images: (File | string | null)[];
  setImages: (images: (File | string | null)[]) => void;
}

export default function ImageSlotsGroup({ images, setImages }: IImageSlotsGroup) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);

    // Encontrar slots vazios para adicionar os novos arquivos
    const emptySlots = images
      .map((img, index) => img === null ? index : -1)
      .filter(index => index !== -1);

    if (emptySlots.length === 0) return; // Não há slots vazios

    const updated = [...images];

    // Adicionar novos arquivos nos slots vazios
    fileArray.forEach((file, i) => {
      if (i < emptySlots.length) {
        const slotIndex = emptySlots[i];
        updated[slotIndex] = file;
      }
    });

    setImages(updated);
    e.target.value = ""; // Reset input
  };

  const handleRemove = (index: number) => {
    const updated = [...images];
    updated[index] = null;
    setImages(updated);
  };

  // Converter imagens para formato de exibição
  const getImagePreview = (img: File | string | null): string | null => {
    if (img === null) return null;

    if (typeof img === 'string') {
      // É uma URL do servidor - verificar se é uma URL completa ou relativa
      if (img.startsWith('http://') || img.startsWith('https://')) {
        // URL completa
        return img;
      } else {
        // URL relativa - construir URL completa baseada na API
        const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3002';
        return `${baseURL}${img.startsWith('/') ? '' : '/'}${img}`;
      }
    } else {
      // É um File - criar preview base64
      return URL.createObjectURL(img);
    }
  };

  return (
    <>
      {images.map((img, i) => (
        <ImageSlot 
          key={i} 
          image={getImagePreview(img)} 
          onClick={handleClick} 
          onRemove={() => handleRemove(i)} 
        />
      ))}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </>
  );
}
