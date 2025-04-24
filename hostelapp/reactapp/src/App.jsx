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
import Report from './component/Student/Report';
import MaintenanceRequests from './component/Admin/MaintenanceRequests';
import ReportReq from './component/Admin/ReportReq';
import StudentDetailsForm from './component/Student/StudentDetailsForm';
import AdminStudents from './component/Admin/AdminStudents';
import Feature from './component/Features/Feature';
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
        <Route path="/AdminStudents" element={<AdminStudents />} />
        <Route path="/StudentDashboard" element={<StudentDashboard />} />
        <Route path="/StudentDetailsForm" element={<StudentDetailsForm />} />
        <Route path="/rooms" element={<Room />} />
        <Route path="/report" element={<Report />} />
        <Route path="/reportReq" element={<ReportReq />} />
        <Route path="/feature" element={<Feature />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
