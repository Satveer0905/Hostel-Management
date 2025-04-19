import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminDashboard.module.css';
// import Maintenance from './Maintenance';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("You have been logged out.");
    navigate("/");
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
            <li>Maintenance</li>
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
          <h2>Recent Activities</h2>
          <ul>
            <li>Room 101 assigned to John Doe</li>
            <li>Maintenance request for Room 202</li>
            <li>New student registered: Jane Smith</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
