import axios from 'axios';
import { Ngo } from "../../types/ngo";
import { useState, useEffect } from "react";

const ManageNgo: React.FC = () => {
  const [ngos, setNgo] = useState<Ngo[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNgos();
  }, []);

  const fetchNgos = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:3002/api/v1/ngos');
      setNgo(response.data);
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message || 'Erro ao carregar ONGs.');
      } else {
        setErrorMessage('Erro de conexão. Tente novamente mais tarde.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Lista de ONGs</h1>
      
      {isLoading && <p>Carregando...</p>}
      {errorMessage && <div style={{ color: 'red', margin: '10px 0' }}>{errorMessage}</div>}
      
      {!isLoading && ngos.length === 0 && <p>Nenhuma ONG encontrada.</p>}
      
      {ngos.map((ngo, index) => (
        <div key={index} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <h2>{ngo.name}</h2>
          <p><strong>Email:</strong> {ngo.email}</p>
          {ngo.description && <p><strong>Descrição:</strong> {ngo.description}</p>}
          {ngo.phone && <p><strong>Telefone:</strong> {ngo.phone}</p>}
          {ngo.city && <p><strong>Cidade:</strong> {ngo.city}</p>}
        </div>
      ))}
    </div>
  );
};

export default ManageNgo;