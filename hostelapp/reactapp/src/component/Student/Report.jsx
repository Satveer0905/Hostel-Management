import React, { useState } from 'react';
import './report.css';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Report Submitted:', reportData);
    // You can send this data to your backend using fetch or axios
    // Example:
    // fetch('/report', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(reportData),
    // })
    alert('Report submitted successfully!');
    setReportData({
      name: '',
      roomNo: '',
      roomId: '',
      admissionNo: '',
      description: '',
    });
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
