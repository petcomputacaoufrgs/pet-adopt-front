import { useAnimalForm } from '../../hooks/useAnimalForm';
import Header from "../../components/Header";
import Footer from "../HomePage/6Footer";
import AnimalFormSection from "../../components/AnimalFormSection";
import logo from "../../assets/HorizontalLogo.png"
import { IAnimalForm } from "./types";
import { useAuth } from "../../hooks/useAuth";

export default function EditAnimal({animalData}: IAnimalForm) {
  const { isLoading, user, isLoggedIn } = useAuth();
  const formState = useAnimalForm(animalData);

  if(isLoading) return null;

  // Previne perda de dados ao recarregar a página sem querer
  window.addEventListener("beforeunload", function (e) {
    e.preventDefault();
  });

  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      <Header color="#FFF6E8" Logo={logo} isLoggedIn={isLoggedIn} user={user} />
      <AnimalFormSection {...formState} animalData={animalData} user={user}/>
      <Footer />
    </div>
  );
}
