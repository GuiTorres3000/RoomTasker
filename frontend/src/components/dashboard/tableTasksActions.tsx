import { TrashIcon } from '@heroicons/react/20/solid'; // ícone de lixo quadrado
import { deleteTask, getTasksByUser } from '../../services/taskService';
import { Task } from './tableTasks';

interface TableActionsProps {
  id: string;
  userId: string;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TableActions = ({ id, userId, setTasks }: TableActionsProps) => {
  const handleDelete = async () => {
    try {
        // Deleta a tarefa
        await deleteTask(id); 
        // Recarrega as tarefas após deletar
        const updatedTasks = await getTasksByUser(userId);
        setTasks(updatedTasks); // Atualiza as tarefas no estado
    } catch (error) {
        console.error('Erro ao deletar tarefa:', error);
    }
  };

  return (
    <button
      className="bg-red-500 text-white p-1 rounded-md hover:bg-red-600 transition duration-200 ease-in-out"
      onClick={handleDelete}
    >
      <TrashIcon className="w-4 h-4" />
    </button>
  );
};

export default TableActions;