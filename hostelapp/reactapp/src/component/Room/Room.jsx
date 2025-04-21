import React, { useState, useEffect } from 'react';
import styles from './Room.module.css';
import AdminLayout from '../Admin/AdminLayout';
function Room() {
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState('');
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    admissionNo: '',
    year: '',
    branch: '',
    roomType: '',
    roomNo: '',
    roomId: ''
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('rooms'));
    if (saved) setRooms(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('rooms', JSON.stringify(rooms));
  }, [rooms]);

  const handleChange = (field, value) => {
    setStudentInfo(prev => ({ ...prev, [field]: value }));
  };

  const allocateRoom = async () => {
    const { name, admissionNo, year, branch, roomType, roomNo, roomId } = studentInfo;

    if (!name || !admissionNo || !year || !branch || !roomType || !roomNo || !roomId) {
      setMessage('⚠️ Please fill all fields');
      return;
    }

    const room = { ...studentInfo };

    // Send the room data to the server
    try {
      const response = await fetch('http://localhost:3005/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(room),
      });

      const result = await response.json();
      if (result.msg === "Room data saved successfully") {
        setRooms(prev => [...prev, room]);  // Add the allocated room to the local state
        setMessage(`✅ Room ${roomNo} allocated successfully.`);
      } else {
        setMessage('❌ Error allocating room');
      }

      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('❌ Error sending data to the server');
    }

    // Reset the form
    setStudentInfo({
      name: '',
      admissionNo: '',
      year: '',
      branch: '',
      roomType: '',
      roomNo: '',
      roomId: ''
    });
  };

  const totalRooms = rooms.length;

  return (
    <>
    {/* <AdminLayout/>   */}
    <div className={styles['room-container']}>
      <h2>Room Allocation (Admin)</h2>

      {message && <p className={styles.message}>{message}</p>}

      <div className={styles.form}>
        <input
          type="text"
          placeholder="Student Name"
          value={studentInfo.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
        <input
          type="text"
          placeholder="Admission Number"
          value={studentInfo.admissionNo}
          onChange={(e) => handleChange('admissionNo', e.target.value)}
        />
        <input
          type="text"
          placeholder="Year"
          value={studentInfo.year}
          onChange={(e) => handleChange('year', e.target.value)}
        />
        <input
          type="text"
          placeholder="Branch"
          value={studentInfo.branch}
          onChange={(e) => handleChange('branch', e.target.value)}
        />
        <select
          value={studentInfo.roomType}
          onChange={(e) => handleChange('roomType', e.target.value)}
        >
          <option value="">Select Room Type</option>
          <option value="One Seater">One Seater</option>
          <option value="Two Seater">Two Seater</option>
          <option value="Three Seater">Three Seater</option>
          <option value="Four Seater">Four Seater</option>
        </select>
        <input
          type="text"
          placeholder="Room Number"
          value={studentInfo.roomNo}
          onChange={(e) => handleChange('roomNo', e.target.value)}
        />
        <input
          type="text"
          placeholder="Room ID"
          value={studentInfo.roomId}
          onChange={(e) => handleChange('roomId', e.target.value)}
        />
        <button onClick={allocateRoom}>Allocate Room</button>
      </div>

      <h3>Allocated Room Details</h3>
      <table className={styles['room-table']}>
        <thead>
          <tr>
            <th>Student</th>
            <th>Admission No</th>
            <th>Year</th>
            <th>Branch</th>
            <th>Room Type</th>
            <th>Room No</th>
            <th>Room ID</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => (
            <tr key={index}>
              <td>{room.name}</td>
              <td>{room.admissionNo}</td>
              <td>{room.year}</td>
              <td>{room.branch}</td>
              <td>{room.roomType}</td>
              <td>{room.roomNo}</td>
              <td>{room.roomId}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.summary}>
        <p><strong>Total Allocated Rooms:</strong> {totalRooms}</p>
      </div>
    </div>
    </>
  );
}

export default Room;
