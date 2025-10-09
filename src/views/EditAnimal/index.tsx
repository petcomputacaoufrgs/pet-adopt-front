import { useEffect, useState } from "react";
import Header from "../../components/Header";

import logo from "../../assets/HorizontalLogo.png"
import Footer from "../HomePage/6Footer";
import AnimalFormSection from "../../components/AnimalFormSection";


import { IAnimalForm } from "./types";
import { useAuth } from "../../hooks/useAuth";

export default function EditAnimal({animalData} : IAnimalForm) {

  
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


  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


    const { isLoading, user, isLoggedIn} = useAuth();

  if(isLoading)
    return null;
  
  return (


  <div style={{display: "flex", flexDirection: "column"}}>

    <Header  color="#FFF6E8" Logo={logo} isLoggedIn={isLoggedIn} user={user} />

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
        animalData={animalData} // ou algum objeto se estiver editando
      />

      <Footer />

    </div>
  );
}
