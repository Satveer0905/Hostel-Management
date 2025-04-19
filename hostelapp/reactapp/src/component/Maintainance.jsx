import React, { useState } from 'react';
import './Maintenance.css';

function Maintenance() {
  const [maintenanceData, setMaintenanceData] = useState({
    roomId: '',
    issue: '',
  });

  const handleChange = (e) => {
    setMaintenanceData({ ...maintenanceData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // In a real application, you'd send this data to the backend
    console.log('Maintenance Request Submitted:', maintenanceData);
    alert('Maintenance request submitted successfully!');
  };

  return (
    <div className="maintenance-page">
      <div className="maintenance-header">
        <h1>Maintenance Request</h1>
        <p>Report any issues in your room and request maintenance</p>
      </div>
      <div className="maintenance-form">
        <label htmlFor="roomId">Room ID</label>
        <input
          type="text"
          name="roomId"
          id="roomId"
          value={maintenanceData.roomId}
          onChange={handleChange}
          placeholder="Enter Room ID"
        />
        <label htmlFor="issue">Issue Description</label>
        <textarea
          name="issue"
          id="issue"
          value={maintenanceData.issue}
          onChange={handleChange}
          placeholder="Describe the issue..."
        />
        <button className="btn maintenance-btn" onClick={handleSubmit}>
          Submit Request
        </button>
      </div>
    </div>
  );
}

export default Maintenance;
