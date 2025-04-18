import React, { useState, useEffect } from 'react';
import styles from './Room.module.css';

function Room() {
  const initialRooms = [
    { id: 1, type: 'oneSeater', available: true },
    { id: 2, type: 'twoSeater', available: true },
    { id: 3, type: 'threeSeater', available: true },
    { id: 4, type: 'fourSeater', available: true },
  ];

  const [rooms, setRooms] = useState(initialRooms);
  const [searchTerm, setSearchTerm] = useState('');
  const [newRoomType, setNewRoomType] = useState('');
  const [roomToEdit, setRoomToEdit] = useState(null);
  const [message, setMessage] = useState('');
  const [allocatedDetails, setAllocatedDetails] = useState({});
  const [studentName, setStudentName] = useState('');
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [studentYear, setStudentYear] = useState('');

  useEffect(() => {
    const storedRooms = JSON.parse(localStorage.getItem('rooms'));
    const storedDetails = JSON.parse(localStorage.getItem('allocatedDetails'));
    if (storedRooms) setRooms(storedRooms);
    if (storedDetails) setAllocatedDetails(storedDetails);
  }, []);

  useEffect(() => {
    localStorage.setItem('rooms', JSON.stringify(rooms));
    localStorage.setItem('allocatedDetails', JSON.stringify(allocatedDetails));
  }, [rooms, allocatedDetails]);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 2500);
  };

  const allocateRoom = (id) => {
    if (!studentName.trim() || !admissionNumber.trim() || !studentYear.trim() || !selectedRoomType) {
      showMessage('⚠️ Enter all required fields.');
      return;
    }

    // Record the room allocation
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === id ? { ...room, available: false } : room
      )
    );

    const newAllocation = {
      studentName,
      admissionNumber,
      studentYear,
      roomType: selectedRoomType,
      roomNumber: id,
    };

    setAllocatedDetails((prev) => ({
      ...prev,
      [id]: newAllocation,
    }));

    // Clear inputs
    setStudentName('');
    setAdmissionNumber('');
    setStudentYear('');
    setSelectedRoomType('');
    setRoomNumber('');
    showMessage(`✅ Allocated Room ${id}`);

    // Save data to the server (via Node.js API)
    saveRoomAllocationToServer(newAllocation);
  };

  const saveRoomAllocationToServer = (allocation) => {
    fetch('/api/allocate-room', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(allocation),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Allocation saved to server:', data);
      })
      .catch((error) => {
        console.error('Error saving allocation:', error);
      });
  };

  const deallocateRoom = (id) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === id ? { ...room, available: true } : room
      )
    );

    const newDetails = { ...allocatedDetails };
    delete newDetails[id];
    setAllocatedDetails(newDetails);

    showMessage(`✅ Deallocated Room ${id}`);
  };

  const addRoom = () => {
    if (newRoomType.trim()) {
      const newRoom = {
        id: Date.now(),
        type: newRoomType.trim(),
        available: true,
      };
      setRooms((prevRooms) => [...prevRooms, newRoom]);
      setNewRoomType('');
      showMessage(`✅ Added new room: ${newRoom.type}`);
    } else {
      showMessage('⚠️ Please enter a room type.');
    }
  };

  const deleteRoom = (id) => {
    setRooms((prevRooms) => prevRooms.filter((room) => room.id !== id));
    const newDetails = { ...allocatedDetails };
    delete newDetails[id];
    setAllocatedDetails(newDetails);
    showMessage(`🗑️ Deleted room ID: ${id}`);
  };

  const filteredRooms = rooms.filter((room) =>
    room.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatRoomType = (type) =>
    type.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());

  const totalRooms = rooms.length;
  const allocatedRooms = rooms.filter((room) => !room.available).length;
  const availableRooms = totalRooms - allocatedRooms;

  return (
    <div className={styles['room-management']}>
      <h2>Room Management</h2>
      {message && <div className={styles['message-box']}>{message}</div>}

      <input
        type="text"
        placeholder="Search by room type..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className={styles['room-types']}>
        {filteredRooms.map((room) => (
          <div key={room.id} className={styles['room-type']}>
            <h3>{formatRoomType(room.type)}</h3>
            <p>Status: {room.available ? 'Available' : 'Allocated'}</p>
            {!room.available && allocatedDetails[room.id] && (
              <div className={styles['student-details']}>
                <p><strong>Student:</strong> {allocatedDetails[room.id].studentName}</p>
                <p><strong>Admission No.:</strong> {allocatedDetails[room.id].admissionNumber}</p>
                <p><strong>Year:</strong> {allocatedDetails[room.id].studentYear}</p>
                <p><strong>Room Type:</strong> {allocatedDetails[room.id].roomType}</p>
              </div>
            )}
            {room.available && (
              <div className={styles['alloc-form']}>
                <input
                  type="text"
                  placeholder="Student Name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Admission No."
                  value={admissionNumber}
                  onChange={(e) => setAdmissionNumber(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Student Year"
                  value={studentYear}
                  onChange={(e) => setStudentYear(e.target.value)}
                />
                <select
                  value={selectedRoomType}
                  onChange={(e) => setSelectedRoomType(e.target.value)}
                >
                  <option value="">Select Room Type</option>
                  <option value="oneSeater">One Seater</option>
                  <option value="twoSeater">Two Seater</option>
                  <option value="threeSeater">Three Seater</option>
                  <option value="fourSeater">Four Seater</option>
                </select>
              </div>
            )}
            {room.available ? (
              <button onClick={() => allocateRoom(room.id)}>Allocate</button>
            ) : (
              <button onClick={() => deallocateRoom(room.id)}>Deallocate</button>
            )}
            <button onClick={() => deleteRoom(room.id)}>Delete</button>
          </div>
        ))}
      </div>

      <div className={styles['add-room']}>
        <h3>{roomToEdit ? 'Edit Room' : 'Add New Room'}</h3>
        <input
          type="text"
          placeholder="Enter room type..."
          value={newRoomType}
          onChange={(e) => setNewRoomType(e.target.value)}
        />
        {roomToEdit ? (
          <button onClick={updateRoom}>Update Room</button>
        ) : (
          <button onClick={addRoom}>Add Room</button>
        )}
      </div>

      {/* Table for allocated rooms and statistics */}
      <div className={styles['allocated-rooms-table']}>
        <h3>Allocated Rooms Summary</h3>
        <table>
          <thead>
            <tr>
              <th>Room Type</th>
              <th>Student Name</th>
              <th>Admission No.</th>
              <th>Year</th>
              <th>Room Number</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(allocatedDetails).map((roomId) => {
              const room = rooms.find((room) => room.id === parseInt(roomId));
              return (
                <tr key={roomId}>
                  <td>{formatRoomType(room.type)}</td>
                  <td>{allocatedDetails[roomId].studentName}</td>
                  <td>{allocatedDetails[roomId].admissionNumber}</td>
                  <td>{allocatedDetails[roomId].studentYear}</td>
                  <td>{roomId}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className={styles['room-summary']}>
          <p>Total Rooms: {totalRooms}</p>
          <p>Allocated Rooms: {allocatedRooms}</p>
          <p>Available Rooms: {availableRooms}</p>
        </div>
      </div>
    </div>
  );
}

export default Room;
