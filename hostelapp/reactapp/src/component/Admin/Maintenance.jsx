// src/components/Maintenance.js
import React from 'react';
import styles from './Maintenance.module.css';

function Maintenance() {
  const maintenanceRequests = [
    { id: 1, description: "Leaky faucet in Room 101", status: "Pending" },
    { id: 2, description: "AC not working in Room 202", status: "In Progress" },
    { id: 3, description: "Light bulb replacement in Room 303", status: "Completed" },
  ];

  return (
    <div className={styles['maintenance']}>
      <h2>Maintenance Requests</h2>
      <ul>
        {maintenanceRequests.map(request => (
          <li key={request.id} className={styles['maintenance-item']}>
            <span>{request.description}</span> - <span>{request.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Maintenance;