import { useEffect, useState } from 'react';
import { useBlocker, useNavigate } from 'react-router-dom'; // Importe useBlocker
import { useAnimalForm } from '../../hooks/useAnimalForm';
import Header from "../../components/Header";
import Footer from "../HomePage/6Footer";
import AnimalFormSection from "../../components/AnimalFormSection";
import ConfirmModal from "../../components/ConfirmModal"; // Seu modal existente
import logo from "../../assets/HorizontalLogo.png"
import { IAnimalForm } from "./types";
import { useAuth } from "../../hooks/useAuth";

export default function EditAnimal({animalData}: IAnimalForm) {
  const { isLoading, user, isLoggedIn } = useAuth();
  
  const { methods } = useAnimalForm(animalData);
  
  // Extraímos isDirty (se o form foi mexido) e isSubmitting (se está salvando)
  const { formState: { isDirty, isSubmitting } } = methods;

  const [windowSize, setWindowSize] = useState(window.innerWidth);

  // Proteção contra REFRESH ou FECHAR ABA (Nativo do Browser)
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty && !isSubmitting) {
        e.preventDefault();
        e.returnValue = ''; // Padrão Legacy
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty, isSubmitting]);

  // Proteção contra NAVEGAÇÃO INTERNA (React Router)
  // Bloqueia se: estiver sujo, não estiver enviando, e estiver tentando mudar de rota
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isDirty && !isSubmitting && currentLocation.pathname !== nextLocation.pathname
  );

  useEffect(() => {
    const handleResize = () => setWindowSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  if(isLoading) return null;

  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      
      <AnimalFormSection 
          methods={methods}
          windowSize={windowSize}
          animalData={animalData} 
          user={user}
      />
      
      <Footer />

      {/* MODAL DE CONFIRMAÇÃO (Aparece quando o blocker ativa) */}
      {blocker.state === "blocked" && (
        <ConfirmModal
            isOpen={true}
            title="Alterações não salvas"
            message="Você tem alterações não salvas. Se sair agora, perderá o progresso. Deseja mesmo sair?"
            confirmLabel="Sim, sair sem salvar"
            cancelLabel="Continuar editando"
            onConfirm={() => blocker.proceed()}
            onClose={() => blocker.reset()}
        />
      )}
    </div>
  );
}