import { useState } from "react";
import { registerUser } from "../services/authService";


export default function registerForm() {
  // Definindo estado que armazena os dados
  // setFormData é uma função que atualiza o estado de formData
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Definindo estado que carrega mensagem de erro (pode ser string ou null, e começa como nulo) 
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
  
  // Envio das informações
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await registerUser(
        formData.name, 
        {
        email: formData.email,
        password: formData.password,
        }
    );
      console.log("Usuário registrado com sucesso:", response);
      setErrorMessage(null); // Limpa mensagem de erro ao sucesso
    } catch (error) {
      setErrorMessage("Erro ao registrar o usuário. Tente novamente.");
    }
  };

  const formHeader = (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        alt="RoomTasker"
        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
        className="mx-auto h-12 w-auto"
      />
      <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        Registre-se para entrar!
      </h2>
    </div>
  );

    return (
      <>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white shadow-lg rounded-xl p-8">
          
          {formHeader}

          <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                  Nome de Usuário:
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="name"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Email:
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                    Senha:
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Esqueceu sua senha?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Entrar
                </button>
              </div>
            </form>
  
            <p className="mt-2 text-center text-sm/6 text-gray-500">
              Não possui uma conta? {' '}
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Registre-se agora!
              </a>
            </p>
          </div>
        </div>
      </>
    )
  }