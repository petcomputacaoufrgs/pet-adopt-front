import { useEffect, useState } from "react";
import Header from "../../components/Header";

import logo from "../../assets/HorizontalLogo.png"
import Footer from "../HomePage/6Footer";
import AnimalFormSection from "../../components/AnimalFormSection";


import { IAnimalForm } from "./types";

export function AnimalForm({animalData} : IAnimalForm) {
  let initialImages = [];

  if(animalData)
    initialImages = [null, null, null, null, null, null, null, null, null, null];
  else
    initialImages = [null, null, null, null, null, null, null, null, null, null];


  const [images, setImages] = useState<(string | null)[]>(initialImages);


  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [breed, setBreed] = useState<string>("");
  const [sizeIndex, setSizeIndex] = useState<number>(-1);
  const [situationIndex, setSituationIndex] = useState<number>(-1);
  const [animalSexIndex, setAnimalSexIndex] = useState<number>(-1);
  const [description, setDescription] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [specie, setSpecie] = useState<string>("");
  const [specieIndex, setSpecieIndex] = useState<number>(-1);
  const [ong, setOng] = useState<string>("");


  const headerOptions = ["Sobre Nós", "Animais Recém Adicionados", "Dicas", "Fale Conosco"]
  const handleHeaderAction = (selected: string) => {
  } 

  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (


  <div style={{display: "flex", flexDirection: "column"}}>

    <Header options={headerOptions} optionsToAction={handleHeaderAction} color="#FFF6E8" Logo={logo}/>

    <AnimalFormSection
        windowSize={windowSize}
        name={name}
        setName={setName}
        age={age}
        setAge={setAge}
        breed={breed}
        setBreed={setBreed}
        setSpecie={setSpecie}
        specieIndex={specieIndex}
        setSpecieIndex={setSpecieIndex}
        animalSexIndex={animalSexIndex}
        setAnimalSexIndex={setAnimalSexIndex}
        sizeIndex={sizeIndex}
        setSizeIndex={setSizeIndex}
        situationIndex={situationIndex}
        setSituationIndex={setSituationIndex}
        description={description}
        setDescription={setDescription}
        city={city}
        setCity={setCity}
        state={state}
        setState={setState}
        ong={ong}
        setOng={setOng}
        images={images}
        setImages={setImages}
        animalData={null} // ou algum objeto se estiver editando
      />

      <Footer />

    </div>
  );
}
