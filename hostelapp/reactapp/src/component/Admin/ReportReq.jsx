import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from './AdminLayout';
import './ReportReq.css';

const ReportReq = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const statusOptions = [
    "Not accepted",
    "Accepted",
    "Accepted and Resolved"
  ];

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get('http://localhost:3005/report');
      setReports(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching reports: ' + err.message);
      setLoading(false);
    }
  };

  const handleStatusChange = async (reportId, newStatus) => {
    try {
      console.log(`Updating report ${reportId} to status: ${newStatus}`);
      const response = await axios.put(`http://localhost:3005/report/${reportId}`, {
        status: newStatus
      });
  
      if (response.data.msg === "Report status updated successfully") {
        setReports((prevReports) =>
          prevReports.map((report) =>
            report._id === reportId ? { ...report, status: newStatus } : report
          )
        );
      } else {
        alert(response.data.msg || "Failed to update report status");
      }
    } catch (err) {
      console.error("Status update error:", err);
      alert('Error updating status: ' + (err.response?.data?.msg || err.message));
    }
  };

  const handleDelete = async (reportId) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;

    try {
      const response = await axios.delete(`http://localhost:3005/report/${reportId}`);
      if (response.status === 200) {
        alert("Report deleted successfully");
        fetchReports(); // Refresh data
      } else {
        alert("Failed to delete report");
      }
    } catch (error) {
      console.error("Error deleting report:", error);
      alert("Error deleting report: " + error.message);
    }
  };

  if (loading) return <div>Loading reports...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
    <AdminLayout/>
    
    <div className="report-req-container">
      <h2>Reported Issues</h2>
      {reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <table className="report-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Room No</th>
              <th>Admission No</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report._id}>
                <td>{report.id}</td>
                <td>{report.name}</td>
                <td>{report.roomNo}</td>
                <td>{report.admissionNo}</td>
                <td>{report.description}</td>
                <td>
                  <select
                    value={report.status || "Not accepted"}
                    onChange={(e) => handleStatusChange(report._id, e.target.value)}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                <button onClick={() => handleDelete(report._id)} style={{
  background: '#ff6347',
  color: 'white',
  fontWeight: 700,
  borderRadius: '8px',
  border: 'none',
  width: '100%',
  height: '35px',
  padding: '0 20px',
  cursor: 'pointer',
  transition: 'background 0.3s ease, transform 0.3s ease',
  ":hover": {
    background: '#ff4500',
    transform: 'scale(1.05)',
  }
}}>
  Delete
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
};

export default ReportReq;
