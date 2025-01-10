// Componentes de Cadastro
import RegisterForm from "./components/auth/registerForm";
import LoginForm from "./components/auth/loginForm";
// Componentes da Página
//import TableTasks from "./components/dashboard/tableTasks";
import Dashboard from "./components/dashboard/dashboard";
import DashboardGlobal from "./components/dashboard/dashboardGlobal";
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
              <Route path="/dashboard/:id/global" element={<DashboardGlobal />} />
            </Routes>
        </BrowserRouter>
        
    </div>
  );
}

export default App;