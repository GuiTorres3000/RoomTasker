import { TrashIcon, PencilIcon } from '@heroicons/react/20/solid'; // ícone de lixo quadrado
import { deleteTask, updateTask, getTasksByUser} from '../../services/taskService';
import { Task } from './tableTasks';
import { useState } from 'react';

import InputSpan from './inputSpan';
import InputDate from './inputDate'; 

interface TableActionsProps {
  id: string,
  userId: string,
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  task?: Task
}

const TableActions = ({ id, userId, setTasks, task }: TableActionsProps) => {

  // Exibição do 
  const [isEditing, setIsEditing] = useState(false); // Controla o modo de edição
  const [editedTask, setEditedTask] = useState<Task>(
    task ? { ...task } : {id: '', title: '', status: false, dueDate: new Date() }
  );

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

  const handleEdit = async () => {
    try {
      const updatedTaskData = {
        title: editedTask.title,
        status: editedTask.status,
        dueDate: editedTask.dueDate,
        userId,
      };

      await updateTask(id, updatedTaskData); // Chamada à função existente
      const updatedTasks = await getTasksByUser(userId); // Recarrega as tarefas
      setTasks(updatedTasks);
      setIsEditing(false); // Sai do modo de edição
    } catch (error) {
      console.error('Erro ao editar tarefa:', error);
    }
  };

  return (
    <div className="flex space-x-2">
        <button
        className="bg-red-500 text-white p-1 rounded-md hover:bg-red-700 transition duration-200 ease-in-out"
        onClick={handleDelete}
        >
            <TrashIcon className="w-4 h-4" />
        </button>

        <button
          className="bg-yellow-400 text-white p-1 rounded-md hover:bg-yellow-500 transition duration-200 ease-in-out"
          onClick={() => setIsEditing(!isEditing)} // Alterna o modo de edição
        >
            <PencilIcon className="w-4 h-4" />
        </button>

        
        {/* Formulário de Edição Condicional */}
        {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
            <h3 className="text-xl font-semibold mb-4">Editar Tarefa</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEdit();
              }}
            >
              <div className="flex flex-col space-y-2">
                <InputSpan
                  id="title"
                  value={editedTask.title}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, title: e.target.value })
                  }
                  width="w-full"
                  icon={<PencilIcon className="w-5 h-5" />}
                  placeholder="Título da tarefa"
                />
                <InputDate
                  id="date"
                  value={editedTask.dueDate.toISOString().split('T')[0]}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      dueDate: new Date(e.target.value), // Converte de volta para Date
                    })
                  }
                  width="w-full"
                  icon={<PencilIcon className="w-5 h-5" />}
                />
                <div className="flex justify-between mt-4">
                  <button
                    type="submit"
                    className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-200 ease-in-out"
                  >
                    Salvar
                  </button>
                  <button
                    type="button"
                    className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition duration-200 ease-in-out"
                    onClick={() => setIsEditing(false)} // Fecha o modal sem salvar
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableActions;