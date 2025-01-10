import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import TableTasks from "./tableTasks";
import Navbar from "./navbar";

const API_URL = "http://localhost:3000";

interface User {
    id: string;
    name: string;
    email: string;
}

export default function dashboard() {
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

  if (loading) return //<p className="justify-center text-center text-2xl ">Carregando...</p>;
  if (!user) return <p className="justify-center text-center text-2xl ">Usuário não encontrado...!</p>;

  return (
      <>
      <Navbar userName={user.name} />
      {typeof id === "string" && <TableTasks userId={id} />}
      </>
  );
}