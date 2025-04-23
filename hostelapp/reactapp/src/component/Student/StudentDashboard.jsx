import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-scroll';
import './StudentDashboard.css';
function StudentDashboard() {
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('studentName');
    if (name) {
      setStudentName(name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('studentName');
    localStorage.removeItem('studentEmail');
    alert("You have been logged out.");
    navigate("/");
  };

  return (
    <div className="student-dashboard__container">
      <header className="student-dashboard__header">
        <h1>Welcome, {studentName} 👋</h1>
        <button className="student-dashboard__logout-btn" onClick={handleLogout}>Logout</button>
      </header>
      <div className="student-dashboard__content">
        <h2 className="student-dashboard__heading">Your Information</h2>
        <div className="student-dashboard__info-card">
          <h3>Hostel Details</h3>
          <p><strong>Hostel Name:</strong> ABC Hostel</p>
          <p><strong>Room Number:</strong> 101</p>
          <p><strong>Check-in Date:</strong> 2023-01-15</p>
          <p><strong>Check-out Date:</strong> 2023-12-15</p>
          <button onClick={() => navigate('/StudentDetailsForm')} style={{marginTop: '10px'}}>
            Edit Personal Details
          </button>
        </div>
        <div className="student-dashboard__info-card">
          <h3>Services</h3>
          <ul>
            <li>Food Services</li>
            <li>Cleaning Services</li>
            
            {/* Add scroll behavior for Maintenance Requests */}
            <li>
              <Link
                to="maintenance-section" // This matches the ID of the section you want to scroll to
                smooth={true}
                duration={500}
                offset={-100} // Adjust the offset if needed for better alignment
              >
                Maintenance Requests
              </Link>
            </li>
            <li onClick={()=> navigate('/report')}>Report</li>
          </ul>
        </div>
        <div className="student-dashboard__info-card">
          <h3>Important Notices</h3>
          <p>No visitors allowed after 10 PM.</p>
          <p>Monthly fees are due by the 5th of each month.</p>
        </div>
        <div id="maintenance-section" className="student-dashboard__maintenance">
          <h3>Maintenance Request</h3>
          <p>Click below to submit a request</p>
          <button id="Maintainance-button" onClick={() => navigate('/maintenance')}>Maintenance</button>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
