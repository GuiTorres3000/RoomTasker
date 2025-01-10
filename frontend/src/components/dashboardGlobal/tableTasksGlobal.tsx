import { useEffect, useState } from 'react';
import { getTasksByUser } from '../../services/taskService';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import InputSpan from "../dashboard/inputSpan";
import { getUser } from '../../services/dashboard';

export interface Task {
  id: string,
  title: string,
  dueDate: Date,
  status: boolean,
  userId: string
}

export default function TableTasks() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [users, setUsers] = useState<{[key: string]: string}>({});
  const userId = '677d63cc1648dc7d708af21e';

  // Pega as tarefas da API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasksByUser(userId);
        setTasks(data);
        setFilteredTasks(data);

        // Buscar os nomes dos usuários
        const userNames: {[key: string]: string} = {};
        for (const task of data) {
          if (!userNames[task.userId]) {
            const user = await getUser(task.userId);
            userNames[task.userId] = user.name; // Supondo que a resposta de getUser tem o campo 'name'
          }
        }
        setUsers(userNames);
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
      }
    };

    fetchTasks();
  }, [userId]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(value);

    // Filtra as tarefas com base no título
    const filtered = value
      ? tasks.filter((task) => {
          const userName = users[task.userId]?.toLowerCase() || "";
          return userName.includes(value.toLowerCase());
        })
        // Exige todas as tarefas se não tiver nenhum filtro
      : tasks; 
    setFilteredTasks(filtered);
  };

  const TableHeader = (
    <div className="rounded-t mb-0 px-4 py-3 border-0">
      <h2 className="font-semibold text-2xl text-gray-700 text-center my-1">Visualizar Todas as Tarefas</h2>
      <hr />
      <div className="flex flex-wrap items-center">
        <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
          <div className="flex my-2 items-center justify-center w-full">
            <InputSpan
              id="taskFilter"
              value={filter}
              onChange={handleFilterChange}
              width="w-2/3"
              placeholder="Filtrar tarefas por usuário"
              icon={<MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="items-center justify-center px-8 py-2 lg:px-2 bg-gray-100"
      style={{ minHeight: `calc(100vh - 5rem)` }} >
      <section className="py-1 bg-blueGray-50">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-xl">
            {TableHeader}

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-gray-700 align-middle border border-solid border-blueGray-100 py-3 text-base border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                      style={{ width: '40%' }}
                    >
                      Titulo
                    </th>
                    <th className="px-6 bg-blueGray-50 text-gray-700 align-middle border border-solid border-blueGray-100 py-3 text-base border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                      style={{ width: '10%' }}
                    >
                      Data
                    </th>
                    <th className="px-6 bg-blueGray-50 text-gray-700 align-middle border border-solid border-blueGray-100 py-3 text-base border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                      style={{ width: '30%' }}
                    >
                      Status
                    </th>
                    <th className="px-6 bg-blueGray-50 text-gray-700 align-middle border border-solid border-blueGray-100 py-3 text-base border-l-0 border-r-0 whitespace-nowrap font-semibold text-right"
                      style={{ width: '20%' }}
                    >
                      Usuário
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredTasks.map((task) => (
                    <tr key={task.id}>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                        {task.title}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "Data não informada"}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                        {task.status ? "Concluído" : "Incompleto"}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-right">
                        {users[task.userId] || "Usuário não encontrado"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <footer className="relative pt-8 pb-6 mt-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div className="w-full md:w-6/12 px-4 mx-auto text-center">
              </div>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
};
