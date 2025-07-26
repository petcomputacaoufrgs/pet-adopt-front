import { useRef, useState } from "react";
import { ImageSlot } from "../ImageSlot";


interface IImageSlotsGroup {
    images: (string | null)[];
    setImages: (images: (string | null)[]) => void;
}
export default function ImageSlotsGroup({images, setImages} : IImageSlotsGroup) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const readerPromises = fileArray.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readerPromises).then((base64Images) => {
      const queue = [...base64Images]; // evita alterar a original
      const updated = images.map((img) => {
        if (img === null && queue.length > 0) {
          return queue.shift()!;
        }
        return img;
      });

      setImages(updated);
    });

    e.target.value = ""; // reseta input pra permitir reupload do mesmo arquivo
  };

  const handleRemove = (index: number) => {
    const updated = [...images];
    updated[index] = null;
    setImages(updated);
  };

  //console.log(images);

  return (
    <>
      {images.map((img, i) => (
        <ImageSlot key={i} image={img} onClick={handleClick} onRemove={() => handleRemove(i)} />
      ))}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
        style={{display: "none"}}
      />
    </>
  );
}
