import React, { useState } from 'react';
import './Maintainance.css';

function Maintenance() {
  const [maintenanceData, setMaintenanceData] = useState({
    studentName: '',
    admissionNo: '',
    roomId: '',
    issue: '',
  });

  const handleChange = (e) => {
    setMaintenanceData({ ...maintenanceData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('Maintenance Request Submitted:', maintenanceData);
    alert('Maintenance request submitted successfully!');
    // Optionally reset form
    setMaintenanceData({
      studentName: '',
      admissionNo: '',
      roomId: '',
      issue: '',
    });
  };

  return (
    <div className="maintenance-page">
      <div className="maintenance-header">
        <h1>Maintenance Request</h1>
        <p>Report any issues in your room and request maintenance</p>
      </div>
      <div className="maintenance-form">
        <label htmlFor="studentName">Student Name</label>
        <input
          type="text"
          name="studentName"
          id="studentName"
          value={maintenanceData.studentName}
          onChange={handleChange}
          placeholder="Enter your full name"
        />

        <label htmlFor="admissionNo">Admission Number</label>
        <input
          type="text"
          name="admissionNo"
          id="admissionNo"
          value={maintenanceData.admissionNo}
          onChange={handleChange}
          placeholder="Enter your admission number"
        />

        <label htmlFor="roomId">Room Number</label>
        <input
          type="text"
          name="roomId"
          id="roomId"
          value={maintenanceData.roomId}
          onChange={handleChange}
          placeholder="Enter your room number"
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
