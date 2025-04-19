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
    <div className={styles['admin-dashboard']}>
      <header className={styles['dashboard-header']}>
        <h1>Hostel Management System</h1>
        <button className={styles['logout-button']} onClick={handleLogout}>Logout</button>

        <nav className={styles['dashboard-nav']}>
          <ul>
            <li onClick={() => navigate('/')}>Logo</li>
            <li>Dashboard</li>
            <li>Students</li>
            <li onClick={() => navigate('/rooms')}>Room</li>
            <li onClick={() => navigate('/maintenanceReq')}>Maintenance</li>
            <li>Reports</li>
          </ul>
        </nav>
      </header>

      <main className={styles['dashboard-content']}>
        <section className={styles.card}>
          <h2>Total Students</h2>
          <p>150</p>
        </section>

        <section className={styles.card}>
          <h2>Available Rooms</h2>
          <p>20</p>
        </section>

        <section className={styles.card}>
          <h2>Recent Maintenance Requests</h2>
          <ul>
            {maintenanceRequests.map((request) => (
              <li key={request.id}>
                <p><strong>Student:</strong> {request.requester}</p>
                <p><strong>Issue:</strong> {request.issue}</p>
                <p><strong>Status:</strong> {request.status}</p>
                {request.status !== 'Resolved' && (
                  <button onClick={() => handleMarkResolved(request.id)}>Mark as Resolved</button>
                )}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
