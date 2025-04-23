import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './StudentDetailsForm.css';

const StudentDetailsForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phoneNo: '',
    gender: '',
    rollNo: '',
    admissionNo: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const email = localStorage.getItem('studentEmail');
    if (email) {
      setFormData(prev => ({ ...prev, email }));
      // Optionally, fetch existing details to prefill form if editing
      axios.get(`http://localhost:3005/studentDetails/${email}`)
        .then(res => {
          setFormData(res.data);
        })
        .catch(() => {
          // No existing details, continue with empty form
        });
    } else {
      // No email in localStorage, redirect to login
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Check if details exist to decide POST or PUT
      const existing = await axios.get(`http://localhost:3005/studentDetails/${formData.email}`).catch(() => null);
      if (existing && existing.data) {
        // Update existing details
        await axios.put(`http://localhost:3005/studentDetails/${formData.email}`, formData);
      } else {
        // Create new details
        await axios.post('http://localhost:3005/studentDetails', formData);
      }
      setLoading(false);
      alert('Details saved successfully');
      navigate('/StudentDashboard');
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.msg || 'Failed to save details');
    }
  };

  return (
    <div className="student-details-form-container">
      <h2>Student Personal Details</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Phone Number:
          <input type="tel" name="phoneNo" value={formData.phoneNo} onChange={handleChange} required />
        </label>
        <label>
          Gender:
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label>
          Admission Number:
          <input type="text" name="admissionNo" value={formData.admissionNo} onChange={handleChange} required />
        </label>
        <label>
          Roll Number:
          <input type="text" name="rollNo" value={formData.rollNo} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} readOnly />
        </label>
        <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Details'}</button>
      </form>
    </div>
  );
};

export default StudentDetailsForm;
