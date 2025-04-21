import React, { useEffect, useState } from 'react';
import './Maintenance.css';
import AdminLayout from './AdminLayout'
function MaintenanceRequests() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = () => {
    fetch('http://localhost:3005/maintenance')
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((err) => console.error('Failed to load maintenance data:', err));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const toggleStatus = async (requestId, currentStatus) => {
    const newStatus = currentStatus === 'Resolved' ? 'Unresolved' : 'Resolved';
    

    try {
      const response = await fetch('http://localhost:3005/maintenance', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requestId, status: newStatus }),
        
      });
      if (response.ok) {
        alert(`Status changed to ${newStatus}`);
        fetchRequests(); // Refresh data
      } else {
        alert('Failed to update status.');
      }
    } catch (error) {
      console.error('Error updating maintenance status:', error);
    }
  };

  return (
    <>
    <AdminLayout/>
    <div className="maintenance-requests" id="maintaince-requests-main">
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
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, idx) => (
              <tr key={idx}>
                <td>{req.studentName}</td>
                <td>{req.admissionNo}</td>
                <td>{req.roomId}</td>
                <td>{req.issue}</td>
                <td>{req.status}</td>
                <td>
                  <button onClick={() => toggleStatus(req.id, req.status)} id='maintaince-button'>
                    Mark as {req.status === 'Resolved' ? 'Unresolved' : 'Resolved'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </>
  );
}

export default MaintenanceRequests;
