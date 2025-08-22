import axios from 'axios';

import Header from "../../components/Header";
import logo from "../../assets/HorizontalLogo.png";
import { User } from "../../types/user";
import { useState, useEffect } from "react";

const ManageNGOMembers: React.FC = () => {
  const [ngoMembers, setNgoMembers] = useState<User[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNGOMembers();
  }, []);

  const fetchNGOMembers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:3002/api/v1/users/role/NGO_MEMBER');
      setNgoMembers(response.data);
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message || 'Erro ao carregar membros de ONGs.');
      } else {
        setErrorMessage('Erro de conexão. Tente novamente mais tarde.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header 
        color="rgba(0, 0, 0, 0)" 
        Logo={logo}
        options={[]}
        optionsToAction={() => {}}
      />
      <h1>Membros de ONGs</h1>
      
      {isLoading && <p>Carregando...</p>}
      {errorMessage && <div style={{ color: 'red', margin: '10px 0' }}>{errorMessage}</div>}
      
      {!isLoading && ngoMembers.length === 0 && <p>Nenhum membro de ONG encontrado.</p>}
      
      {ngoMembers.map((member, index) => (
        <div key={index} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <h2>{member.name}</h2>
          <p><strong>Email:</strong> {member.email}</p>
          {member.NGO && <p><strong>ONG:</strong> {member.NGO}</p>}
        </div>
      ))}
    </div>
  );
};

export default ManageNGOMembers;