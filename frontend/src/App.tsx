// Componentes de Cadastro
import RegisterForm from "./components/auth/registerForm";
import LoginForm from "./components/auth/loginForm";
// Componentes da Página
//import TableTasks from "./components/dashboard/tableTasks";
import Dashboard from "./components/dashboard/dashboard";
// Redirecionamento com React Router
import { BrowserRouter, Route, Routes} from "react-router-dom";


function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<RegisterForm />}/>
              <Route path="/login" element={<LoginForm />}/>
              <Route path="/dashboard/:id" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
        
    </div>
  );
}

export default App;