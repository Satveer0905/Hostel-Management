import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Registration from './component/Registration';
import Login from './component/Login';
import Home from './component/Home';
import Contact from './component/Contact';
import About from './component/About';
import Maintainance from './component/Maintainance';
import AdminDashboard from './component/Admin/AdminDashboard';
import AdminLayout from './component/Admin/AdminLayout';
import StudentDashboard from './component/Student/StudentDashboard';
import Room from './component/Room/Room';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/maintenance" element={<Maintainance />} />
        <Route path="/StudentDashboard" element={<StudentDashboard />} />

        {/* Admin Routes with Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="rooms" element={<Room />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
