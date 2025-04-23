// AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './AdminDashboard.module.css';

function AdminDashboard() {
  const navigate = useNavigate();
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);

  const handleLogout = () => {
    alert("You have been logged out.");
    navigate("/");
  };

  // Fetch maintenance requests
  const fetchMaintenanceRequests = async () => {
    try {
      const response = await axios.get('http://localhost:3005/maintenance');
      setMaintenanceRequests(response.data);
    } catch (error) {
      console.error('Error fetching maintenance requests:', error);
    }
  };

  useEffect(() => {
    fetchMaintenanceRequests();
  }, []);

  const handleMarkResolved = async (requestId) => {
    try {
      const response = await axios.put('http://localhost:3005/maintenance', { requestId, status: 'Resolved' });
      alert('Maintenance request marked as resolved!');
      fetchMaintenanceRequests();  // Refresh the maintenance requests
    } catch (error) {
      console.error('Error marking maintenance request as resolved:', error);
    }
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
            <li onClick={() => navigate('/rooms')}>Room</li>
            <li onClick={() => navigate('/maintenanceReq')}>Maintenance</li>
            <li onClick={()=>navigate('/reportReq')}>Reports</li>
            </ul>
       <div className='bt'><button className={'logout-button'} onClick={handleLogout}>Logout</button></div> 
      </nav>
      </div>
      <main className={styles['dashboard-content']}>
        <section className={styles.card}>
          <h2>Total Students</h2>
          <p>150</p>
        </section>

        <section className={styles.card}>
          <h2>Available Rooms</h2>
          <p>20</p>
        </section>

        <section className={styles.card} onClick={() => navigate('/maintenanceReq')} style={{ cursor: 'pointer' }}>
  <h2>Pending Maintenance Requests</h2>
  <p>
    {
      maintenanceRequests.filter(
        (request) => request.status !== 'Resolved'
      ).length
    }{' '}
    request(s) pending
  </p>
</section>

      </main>
      <footer className="admin-footer">
        <p>© 2024 Smart Hostel. All rights reserved.</p>
      </footer>
    </div>
    
  );
}

export default AdminDashboard;
