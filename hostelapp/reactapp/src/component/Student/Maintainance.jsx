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

  const handleSubmit = async () => {
    const { studentName, admissionNo, roomId, issue } = maintenanceData;

    // Check if any field is empty
    // if (!studentName || !admissionNo || !roomId || !issue) {
    //   alert("Please fill out all fields before submitting.");
    //   return;
    // }

    try {
      const response = await fetch("http://localhost:3005/maintenance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(maintenanceData)
      });

      const result = await response.json();

      if (response.ok) {
        alert('Maintenance request submitted successfully!');
        setMaintenanceData({
          studentName: '',
          admissionNo: '',
          roomId: '',
          issue: '',
        });
      } else {
        alert("Failed to submit maintenance request: " + result.msg);
      }
    } catch (error) {
      alert("Error submitting request: " + error.message);
    }
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
          required
        />

        <label htmlFor="admissionNo">Admission Number</label>
        <input
          type="text"
          name="admissionNo"
          id="admissionNo"
          value={maintenanceData.admissionNo}
          onChange={handleChange}
          placeholder="Enter your admission number"
          required
        />

        <label htmlFor="roomId">Room Number</label>
        <input
          type="text"
          name="roomId"
          id="roomId"
          value={maintenanceData.roomId}
          onChange={handleChange}
          placeholder="Enter your room number"
          required
        />

        <label htmlFor="issue">Issue Description</label>
        <textarea
          name="issue"
          id="issue"
          value={maintenanceData.issue}
          onChange={handleChange}
          placeholder="Describe the issue..."
          required
        />

        <button className="btn maintenance-btn" onClick={handleSubmit} type='submit'>
          Submit Request
        </button>
      </div>
    </div>
  );
}

export default Maintenance;
