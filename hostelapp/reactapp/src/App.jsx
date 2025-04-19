import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Registration from './component/Registration';
import Login from './component/Login';
import Home from './component/Home';
import Contact from './component/Contact';
import About from './component/About';
import Maintainance from './component/Student/Maintainance';
import MaintenanceRequest from './component/Admin/MaintenanceRequests';
import AdminDashboard from './component/Admin/AdminDashboard';
import StudentDashboard from './component/Student/StudentDashboard';
import Room from './component/Room/Room';
import MaintenanceRequests from './component/Admin/MaintenanceRequests';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/maintenance" element={<Maintainance />} />
        <Route path="/maintenanceReq" element={<MaintenanceRequests />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/StudentDashboard" element={<StudentDashboard />} />
        <Route path="/rooms" element={<Room />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
