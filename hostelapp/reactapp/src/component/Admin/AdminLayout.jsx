import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './AdminDashboard.module.css'; // reuse the CSS

function AdminLayout() {
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
      </header>

      <nav className={styles['dashboard-nav']}>
        <ul>
          <li onClick={() => navigate('/')}>Logo</li>
          <li onClick={() => navigate('/admin')}>Dashboard</li>
          <li>Students</li>
          <li onClick={() => navigate('/admin/rooms')}>Room</li>
          <li>Maintenance</li>
          <li>Reports</li>
        </ul>
      </nav>

      <main className={styles['dashboard-content']}>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
