import { useRef } from "react";
import ImageSlot from "../ImageSlot";

interface IImageSlotsGroup {
  images: (File | string | null)[];
  setImages: (images: (File | string | null)[]) => void;
}

export default function ImageSlotsGroup({ images, setImages }: IImageSlotsGroup) {
  const inputRef = useRef<HTMLInputElement>(null);

  // --- LÓGICA NOVA: Encontra o índice da primeira imagem válida ---
  // Se não houver imagens, retorna -1
  const coverIndex = images.findIndex(img => img !== null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);

    const emptySlots = images
      .map((img, index) => img === null ? index : -1)
      .filter(index => index !== -1);

    if (emptySlots.length === 0) return;

    const updated = [...images];

    fileArray.forEach((file, i) => {
      if (i < emptySlots.length) {
        const slotIndex = emptySlots[i];
        updated[slotIndex] = file;
      }
    });

    setImages(updated);
    e.target.value = ""; 
  };

  const handleRemove = (index: number) => {
    const updated = [...images];
    updated[index] = null;
    setImages(updated);
  };

  return (
    <>
      {images.map((img, i) => (
        <ImageSlot 
          key={i} 
          source={img} 
          // Se tiver imagem E o índice for igual ao primeiro índice encontrado
          isCover={img !== null && i === coverIndex}
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