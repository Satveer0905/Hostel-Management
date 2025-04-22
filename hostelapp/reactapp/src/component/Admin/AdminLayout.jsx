import React from 'react';
import { Link } from 'react-router-dom';
import { Outlet, useNavigate } from 'react-router-dom';
import './adminLayout.css';
export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("You have been logged out.");
    navigate("/");
  };

  return (
    <div className={'admin-dashboard'}>
      <div className="upper">
      <header className={'dashboard-header'}>
        <h1>Smart Hostel</h1>
        
      </header>

      <nav className={'dashboard-nav'}>
        <ul>
          <li onClick={() => navigate('/')}>Logo</li>
          <li onClick={() => navigate('/AdminDashboard')}>Dashboard</li>
          <li>Students</li>
          <li><Link to="/rooms" style={{textDecoration:'none', color:'#333'}}>Room</Link></li>
          <li><Link to="/maintenanceReq" style={{textDecoration:'none', color:'#333'}}>Maintenance</Link></li>
          <li onClick={()=>navigate('/reportReq')}> Reports</li>
        </ul>
       <div className='bt'><button className={'logout-button'} onClick={handleLogout}>Logout</button></div> 
      </nav>
      </div>

      <main className={'dashboard-content'}>
        <Outlet />
      </main>
    </div>
  );
}


