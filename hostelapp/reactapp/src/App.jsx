import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Registration from './component/Registration';
import Login from './component/Login';
import Home from './component/Home';
import AdminDashboard from './component/Admin/AdminDashboard';
import StudentDashboard from './component/Student/StudentDashboard';
import Room from './component/Room/Room';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/StudentDashboard" element={<StudentDashboard />} />
        <Route path="/rooms" element={<Room />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
