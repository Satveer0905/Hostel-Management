import React, { useState } from 'react';
import './report.css';
import axios from 'axios';

const Report = () => {
  const [reportData, setReportData] = useState({
    name: '',
    roomNo: '',
    roomId: '',
    admissionNo: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReportData({ ...reportData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3005/report', reportData);
      if (response.data.msg === 'Report submitted successfully') {
        alert('Report submitted successfully!');
        setReportData({
          name: '',
          roomNo: '',
          roomId: '',
          admissionNo: '',
          description: '',
        });
      } else {
        alert('Failed to submit report: ' + response.data.msg);
      }
    } catch (error) {
      alert('Error submitting report: ' + error.message);
    }
  };

  return (
    <div className="report-container">
      <h2 className="report-title">Report an Issue</h2>
      <form onSubmit={handleSubmit} className="report-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={reportData.name}
          onChange={handleChange}
          className="report-input"
          required
        />
        <input
          type="text"
          name="roomNo"
          placeholder="Room Number"
          value={reportData.roomNo}
          onChange={handleChange}
          className="report-input"
          required
        />
        <input
          type="text"
          name="roomId"
          placeholder="Room ID"
          value={reportData.roomId}
          onChange={handleChange}
          className="report-input"
          required
        />
        <input
          type="text"
          name="admissionNo"
          placeholder="Admission Number"
          value={reportData.admissionNo}
          onChange={handleChange}
          className="report-input"
          required
        />
        <textarea
          name="description"
          placeholder="Describe the issue (e.g., stolen items, other problems)"
          value={reportData.description}
          onChange={handleChange}
          className="report-textarea"
          rows="4"
          required
        ></textarea>
        <button
          type="submit"
          className="report-button"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default Report;
