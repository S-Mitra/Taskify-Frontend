import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import TaskList from "./components/Task/TaskList";
import TaskForm from "./components/Task/TaskForm";
import TaskDetails from "./components/Task/TaskDetails";
import { useContext } from "react";
import AuthContext from "./AuthContext";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";

const App = () => {
    const { token } = useContext(AuthContext);
    return (
        <Router>
            <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={token ? <TaskList /> : <Navigate to="/login" />} />
                <Route path="/tasks/new" element={<TaskForm />} />
                <Route path="/tasks/:id" element={<TaskDetails />} />
            </Routes>
        </Router>
    );
};

export default App;
