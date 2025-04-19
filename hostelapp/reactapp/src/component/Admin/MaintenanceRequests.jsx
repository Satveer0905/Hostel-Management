import React, { useEffect, useState } from 'react';
import './Maintenance.css';


function MaintenanceRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3005/maintenance')
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((err) => console.error('Failed to load maintenance data:', err));
  }, []);

  return (
    <div className="maintenance-requests">
      <h2>All Maintenance Requests</h2>
      {requests.length === 0 ? (
        <p>No maintenance requests available.</p>
      ) : (
        <table className="maintenance-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Admission No</th>
              <th>Room ID</th>
              <th>Issue</th>
            </tr>
          </thead>
          <tbody>
  {requests.map((req, idx) => (
    <tr key={idx}>
      <td>{req.studentName}</td>
      <td>{req.admissionNo}</td>
      <td>{req.roomId}</td>
      <td>{req.issue}</td>
    </tr>
  ))}
</tbody>

        </table>
      )}
    </div>
  );
}

export default MaintenanceRequests;
