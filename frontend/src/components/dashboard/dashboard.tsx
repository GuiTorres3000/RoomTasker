import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000";

interface User {
    id: string;
    name: string;
    email: string;
}

export default function UserPage() {
  const { id } = useParams(); // Pega o ID do usuário da URL
  const [user, setUser] = useState<User | null>(null); // Estado para armazenar os dados do usuário
  const [loading, setLoading] = useState(true); // Estado para indicar carregamento

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Faz a requisição à API para pegar as informações do user 
        const response = await axios.get(`${API_URL}/user/${id}`); 
        // Armazena os dados do usuário
        setUser(response.data); 
        // Remove o estado de carregamento
        setLoading(false); 
      } catch (error) {
        console.error("Erro ao carregar os dados do usuário", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!user) return <p>Usuário não encontrado!</p>;

  return (
    <div className="container">
      <h1>Bem-vindo, {user.name}!</h1>
      <p>Email: {user.email}</p>
      {/* Adicione outros detalhes do usuário conforme necessário */}
    </div>
  );
}