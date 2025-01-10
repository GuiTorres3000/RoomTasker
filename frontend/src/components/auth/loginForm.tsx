import { useState } from "react";
import { loginUser } from "../../services/authService"; 
import { useNavigate } from "react-router-dom";
import InputField from "./inputField";
import logoRoom from '../../assets/logoroom.svg';

export default function loginForm() {
  // Definindo estado que armazena os dados
  // setFormData é uma função que atualiza o estado de formData
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Definindo estado que carrega mensagem de erro (pode ser string ou null, e começa como nulo) 
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Hook de navegação
  const navigate = useNavigate();

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
      const response = await loginUser({ email: formData.email, password: formData.password });
      // Redireciona para a página do usuário e passa a URL da API
      navigate(`/dashboard/${response.id}`);

      console.log("Usuário logado com sucesso:", response);
      setErrorMessage(null); // Limpa mensagem de erro ao sucesso
    } catch (error) {
      setErrorMessage("Erro ao logar com usuário. Tente novamente.");
    }
  };

  const formHeader = (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <div className="flex items-center justify-center">
        <img
          alt="RoomTasker"
          src={logoRoom}
          className="h-12 w-auto"
        />
        <span className="ml-3 text-4xl font-bold text-indigo-600"> Tasker</span>
      </div>
      <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        Faça Login para entrar!
      </h2>
    </div>
  );

    return (
      <>
        <div className="flex min-h-screen items-center justify-center px-8 py-2 lg:px-2 bg-gray-100">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white shadow-lg rounded-xl p-8 my-auto">
  
            {formHeader}

            <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleSubmit} className="space-y-6">

              <InputField
                id="email"
                label="Email:"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />

              {/* 
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Esqueceu sua senha?
                </a>
              </div>
              */}

              <InputField
                id="password"
                label="Senha:"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
              />
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
                Ainda não possui uma conta? {' '}
                <a href="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Registre-se agora!
                </a>
              </p>
            </div>
          </div>
        </div>
      </>
    )
  }