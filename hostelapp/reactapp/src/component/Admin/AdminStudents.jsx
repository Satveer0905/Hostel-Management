import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminStudents.css';

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:3005/studentDetails');
        setStudents(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch student details');
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  if (loading) return <div>Loading students...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="admin-students-container">
      <h2>Students List</h2>
      <table className="admin-students-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone No</th>
            <th>Gender</th>
            <th>Roll No</th>
            <th>Admission No</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.phoneNo}</td>
              <td>{student.gender}</td>
              <td>{student.rollNo}</td>
              <td>{student.admissionNo}</td>
              <td>{student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminStudents;
