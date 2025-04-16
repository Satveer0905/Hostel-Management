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
    if (!studentName.trim() || !admissionNumber.trim()) {
      showMessage('⚠️ Enter student name and admission number.');
      return;
    }

    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === id ? { ...room, available: false } : room
      )
    );

    setAllocatedDetails((prev) => ({
      ...prev,
      [id]: { studentName, admissionNumber },
    }));

    setStudentName('');
    setAdmissionNumber('');
    showMessage(`✅ Allocated Room ${id}`);
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

  const handleEdit = (room) => {
    setRoomToEdit(room);
    setNewRoomType(room.type);
  };

  const updateRoom = () => {
    if (roomToEdit && newRoomType.trim()) {
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === roomToEdit.id ? { ...room, type: newRoomType.trim() } : room
        )
      );
      setRoomToEdit(null);
      setNewRoomType('');
      showMessage(`✏️ Updated room ID: ${roomToEdit.id}`);
    } else {
      showMessage('⚠️ Please enter a room type.');
    }
  };

  const filteredRooms = rooms.filter((room) =>
    room.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatRoomType = (type) =>
    type.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());

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
              </div>
            )}
            {room.available ? (
              <button onClick={() => allocateRoom(room.id)}>Allocate</button>
            ) : (
              <button onClick={() => deallocateRoom(room.id)}>Deallocate</button>
            )}
            <button onClick={() => handleEdit(room)}>Edit</button>
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
    </div>
  );
}

export default Room;
