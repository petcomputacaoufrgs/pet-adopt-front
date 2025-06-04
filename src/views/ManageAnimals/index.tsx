
import axios from 'axios';

import { Pet } from "../../types/pets";
import { useState, useEffect } from "react";

const ManagePets: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:3002/api/v1/pets');
      setPets(response.data);
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message || 'Erro ao carregar Pets.');
      } else {
        setErrorMessage('Erro de conexão. Tente novamente mais tarde.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Lista de Pets</h1>
      
      {isLoading && <p>Carregando...</p>}
      {errorMessage && <div style={{ color: 'red', margin: '10px 0' }}>{errorMessage}</div>}
      
      {!isLoading && pets.length === 0 && <p>Nenhum Pet encontrado.</p>}
      
      {pets.map((pet, index) => (
        <div key={index} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <p> {pet.sex} {pet.size && <p><strong>Tamanho:</strong> {pet.size}</p>}</p>
          <h2>{pet.name}</h2>
          <p><strong>Raça:</strong> {pet.species}</p>
          {pet.status && <p><strong>Status:</strong> {pet.status}</p>}
          {pet.age && <p><strong>Idade:</strong> {pet.age}</p>}
          {pet.state && <p><strong>State:</strong> {pet.state}</p>}
          <button><strong>  Saiba mais </strong></button>
        </div>
      ))}
    </div>
  );
};

export default ManagePets;