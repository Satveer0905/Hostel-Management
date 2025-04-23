import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendData = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    try {
      const response = await fetch("http://localhost:3005/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });

      const res = await response.json();
      setLoading(false);

      if (res.msg === "success") {
        localStorage.setItem('studentName', res.user.name);
        localStorage.setItem('studentEmail', res.user.email);

        if (role === 'administrator') {
          navigate("/AdminDashboard");
        } else {
          // For student, check if personal details exist
          fetch(`http://localhost:3005/studentDetails/${res.user.email}`)
            .then(response => {
              if (response.ok) {
                // Details exist, go to dashboard
                navigate("/StudentDashboard");
              } else if (response.status === 404) {
                // Details not found, go to details form
                navigate("/StudentDetailsForm");
              } else {
                // Other errors, fallback to dashboard
                navigate("/StudentDashboard");
              }
            })
            .catch(() => {
              // On error, fallback to dashboard
              navigate("/StudentDashboard");
            });
        }
      } else {
        setError(res.msg || 'Login failed. Please try again.');
      }
    } catch (err) {
      setLoading(false);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <h2 id="loginHeading">Welcome Back 👋</h2>
      <p className="login-subtext">Please log in to continue to your dashboard</p>

      <form onSubmit={sendData} className="login-form">
        <fieldset disabled={loading}>
          <div className="form-group">
            <label htmlFor="role">Select Role</label>
            <select
              name="role"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-control"
              required
            >
              <option value="student">Student</option>
              <option value="administrator">Administrator</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="e.g. john@example.com"
              className="form-control"
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder="Your password"
              className="form-control"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="alert alert-danger" aria-live="polite">
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Login;
