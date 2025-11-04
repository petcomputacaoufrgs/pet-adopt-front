import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { petService } from "../../services";
import EditAnimal from "./index";
import { Animal } from "./types";

export default function EditAnimalWrapper() {
  const { id } = useParams<{ id: string }>();
  const [animalData, setAnimalData] = useState<Animal | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchAnimalData = async () => {
      if (!id) {
        setError("ID do animal não encontrado");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log("Buscando dados do animal com ID:", id); // Debug
        const response = await petService.getById(id);
        console.log("Dados recebidos do backend:", response.data); // Debug
        setAnimalData(response.data);
      } catch (err) {
        console.error("Erro ao buscar dados do animal:", err);
        setError("Erro ao carregar dados do animal");
      } finally {
        setLoading(false);
      }
    };

    fetchAnimalData();
  }, [id]);

  useEffect(() => {
    const fetchAnimalData = async () => {
      if (!id) {
        setError("ID do animal não encontrado");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await petService.getById(id);
        setAnimalData(response.data);
      } catch (err) {
        console.error("Erro ao buscar dados do animal:", err);
        setError("Erro ao carregar dados do animal");
      } finally {
        setLoading(false);
      }
    };

    fetchAnimalData();
  }, [id]);

  if (loading) {
    return <div>Carregando dados do animal...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return <EditAnimal animalData={animalData} />;
}