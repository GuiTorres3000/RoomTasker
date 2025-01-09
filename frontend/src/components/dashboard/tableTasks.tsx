import { useEffect, useState } from 'react';
import { getTasksByUser } from '../../services/taskService';
import { ClipboardDocumentCheckIcon } from '@heroicons/react/16/solid'
import { CalendarDaysIcon } from '@heroicons/react/16/solid'
import { PlusCircleIcon } from '@heroicons/react/16/solid'
import InputSpan from "./inputSpan";
import InputDate from "./inputDate";


interface Task {
    id: string,
    title: string,
    status: boolean,
    dateDue: Date
  }

export default function tableTasks() {

    const [tasks, setTasks] = useState<Task[]>([]);
    const userId = '677d63cc1648dc7d708af21e';

    useEffect(() => {
        const fetchTasks = async () => {
          try {
            const data = await getTasksByUser(userId);
            setTasks(data);
          } catch (error) {
            console.error('Erro ao carregar tarefas:', error);
          }
        };
    
        fetchTasks();
    }, [userId]);

    const TableHeader = (
      <div className="rounded-t mb-0 px-4 py-3 border-0">
          <h2 className="font-semibold text-2xl text-gray-700 text-center my-4">Gerenciador de Tarefas</h2>
            <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
                    <div className="flex space-x-10 items-center justify-center">
                    <InputSpan
                        id="task" 
                        placeholder="Digite o título de sua tarefa" 
                        width="w-96" 
                        icon={<ClipboardDocumentCheckIcon className="w-5 h-5 text-gray-400" />} 
                    />

                    <InputDate
                        id="dueDate" 
                        width="w-48"
                        icon={<CalendarDaysIcon className="w-5 h-5 text-gray-400" />} 
                    />

                    <button 
                        className="bg-white text-gray-700 border border-gray-400 hover:bg-white hover:text-indigo-600 hover:border-indigo-600 
                        h-9 text-sm font-semibold px-5 rounded-xl focus:outline-none focus:ring-9 focus:ring-indigo-500 transition duration-150 ease-in-out
                        flex items-center space-x-2 group"
                        type="button"
                        onClick={() => console.log("Informações enviadas!")}
                    >
                        <PlusCircleIcon className="w-5 h-5 mr-2 text-gray-400 group-hover:text-indigo-600 transition duration-600 ease-in-out" /> Adicionar
                    </button>
                    </div>
               </div>
               <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                   <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">See all</button>
               </div>
           </div>
       </div>
  );

  return (
    <div className="min-h-screen items-center justify-center px-8 py-2 lg:px-2 bg-gray-100">
        <section className="py-1 bg-blueGray-50">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-xl">
                {TableHeader}

            <div className="block w-full overflow-x-auto">
                <table className="items-center bg-transparent w-full border-collapse">
                <thead>
                    <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Titulo 
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Data
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Status
                    </th>
                    </tr>
                </thead>

                <tbody>
                {tasks.map((task) => (
                    <tr key={task.id}>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {task.title}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {task.dateDue ? task.dateDue.toLocaleDateString() : "Data não disponível"}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {task.status ? "Concluído" : "Não Concluído"}
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