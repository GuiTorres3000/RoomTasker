import { useEffect, useState } from 'react';
import { getTasksByUser, createTask } from '../../services/taskService';
import { ClipboardDocumentCheckIcon, CalendarDaysIcon, PlusCircleIcon, MagnifyingGlassIcon} from '@heroicons/react/16/solid'
import InputSpan from "./inputSpan";
import InputDate from "./inputDate";
import TableActions from './tableTasksActions';


export interface Task {
    id: string,
    title: string,
    status: boolean,
    dueDate: Date
  }

export default function tableTasks() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<boolean | null>(null);
  const userId = '677d63cc1648dc7d708af21e';

    const [formData, setFormData] = useState({
      title: "",
      status: false,
      dueDate: "",
    });

    // Pega as tarefas da API
    useEffect(() => {
        const fetchTasks = async () => {
          try {
            const data = await getTasksByUser(userId);
            setTasks(data);
            setFilteredTasks(data);
          } catch (error) {
            console.error('Erro ao carregar tarefas:', error);
          }
        };
    
        fetchTasks();
    }, [userId]);

    // Função para lidar com mudanças no input (acionada no onChange)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Copia a propriedade value do estado atual do input
    const { name, value } = e.target;
    // Atualiza o estado do formulário
    setFormData((prevFormData) => ({
      // Copia o estado anterior do formulário
      ...prevFormData,
      // Atualiza o campo correspondente com o novo valor
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const dueDate = formData.dueDate ? new Date(`${formData.dueDate}T00:00:00`) : undefined;
      await createTask({
        title: formData.title,
        status: formData.status,
        dueDate,
        userId,
      });
      setFormData({
        title: "",
        status: false,
        dueDate: "",
      });
      // Recarrega as tarefas após enviar
      const updatedTasks = await getTasksByUser(userId);
      setTasks(updatedTasks);

      if (filter) {
        const filtered = updatedTasks.filter((task: Task) =>
          task.title.toLowerCase().includes(filter.toLowerCase())
        );
        setFilteredTasks(filtered);
      } else {
        setFilteredTasks(updatedTasks);
      }
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(value);

    // Filtra as tarefas com base no título
    const filtered = value
      ? tasks.filter((task) =>
          task.title.toLowerCase().includes(value.toLowerCase())
        )
      : tasks; // Se não houver filtro (campo vazio), exibe todas as tarefas
    setFilteredTasks(filtered);
  };

  const handleStatusFilterChange = (status: boolean | null) => {
    setStatusFilter(status);
    applyFilters(tasks, filter, status);
  };

  const applyFilters = (tasks: Task[], titleFilter: string = filter, statusFilter: boolean | null = null) => {
    let filtered = tasks;

    if (titleFilter) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(titleFilter.toLowerCase())
      );
    }

    if (statusFilter !== null) {
      filtered = filtered.filter((task) => task.status === statusFilter);
    }

    setFilteredTasks(filtered);
  };
  
    const TableHeader = (
      <div className="rounded-t mb-0 px-4 py-3 border-0">
          <h2 className="font-semibold text-2xl text-gray-700 text-center my-1">Gerenciador de Tarefas</h2>
            <hr/>
            <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
                    <div className="flex my-2 items-center justify-center w-full">
                      <InputSpan
                        id="taskFilter"
                        value={filter}
                        onChange = {handleFilterChange}
                        width="w-2/3"
                        placeholder="Filtrar tarefas pelo título"
                        icon={<MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />}
                      />
                    </div>
                    <div className="flex space-x-10 items-center justify-center">
                    <InputSpan
                        id="title" 
                        value={formData.title}
                        onChange={handleChange}
                        width="w-96" 
                        placeholder="Digite o título de sua tarefa" 
                        icon={<ClipboardDocumentCheckIcon className="w-5 h-5 text-gray-400" />} 
                    />

                    <InputDate
                        id="dueDate" 
                        value={formData.dueDate}
                        onChange={handleChange}
                        width="w-48"
                        icon={<CalendarDaysIcon className="w-5 h-5 text-gray-400" />} 
                    />

                    <button 
                        className="bg-white text-gray-700 border border-gray-400 hover:bg-white hover:text-indigo-600 hover:border-indigo-600 
                        h-9 text-sm font-semibold px-5 rounded-xl focus:outline-none focus:ring-9 focus:ring-indigo-500 transition duration-150 ease-in-out
                        flex items-center space-x-2 group"
                        type="button"
                        onClick={handleSubmit}
                    >
                        <PlusCircleIcon className="w-5 h-5 mr-2 text-gray-400 group-hover:text-indigo-600 transition duration-600 ease-in-out" /> Adicionar
                        </button>
          </div>
        </div>
      </div>

      {/* Toggle de status */}
      <div className="flex justify-center my-4 space-x-6">
        <label className="inline-flex items-center space-x-2">
          <input
            type="radio"
            name="statusFilter"
            value="all"
            checked={statusFilter === null}
            onChange={() => handleStatusFilterChange(null)}
            className="form-radio text-indigo-600"
          />
          <span>Todos</span>
        </label>
        <label className="inline-flex items-center space-x-2">
          <input
            type="radio"
            name="statusFilter"
            value="completed"
            checked={statusFilter === true}
            onChange={() => handleStatusFilterChange(true)}
            className="form-radio text-green-600"
          />
          <span>Concluídos</span>
        </label>
        <label className="inline-flex items-center space-x-2">
          <input
            type="radio"
            name="statusFilter"
            value="incomplete"
            checked={statusFilter === false}
            onChange={() => handleStatusFilterChange(false)}
            className="form-radio text-red-600"
          />
          <span>Incompletos</span>
        </label>
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

                      <th className="px-6 bg-blueGray-50 text-gray-700 align-middle border border-solid border-blueGray-100 py-3 text-base border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                        style={{ width: '20%' }}
                      >
                        Ações
                      </th>
                      </tr>
                  </thead>

                  <tbody>
                  {filteredTasks.map((task: Task) => (
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

                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                          <TableActions id={task.id} userId={userId} setFilteredTasks={setFilteredTasks} filter={filter} setTasks={setTasks} />
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