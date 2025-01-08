import RegisterForm from "./components/auth/registerForm";
import TableTasks from "./components/dashboard/tableTasks";
import Dashboard from "./components/dashboard/dashboard";
import { BrowserRouter, Route, Routes} from "react-router-dom";


function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<RegisterForm />}/>
              <Route path="/login" element={<TableTasks />}/>
              <Route path="/dashboard/:id" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
        
    </div>
  );
}

export default App;