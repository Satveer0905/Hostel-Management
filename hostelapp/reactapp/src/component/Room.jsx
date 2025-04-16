import React, { useState } from 'react';
import './Room.css'; // Import the CSS file for Room component

function Room() {
  const [roomCounts, setRoomCounts] = useState({
    oneSeater: 5,
    twoSeater: 10,
    threeSeater: 8,
    fourSeater: 4,
  });

  const allocateRoom = (type) => {
    if (roomCounts[type] > 0) {
      setRoomCounts((prevCounts) => ({
        ...prevCounts,
        [type]: prevCounts[type] - 1,
      }));
      alert(`Allocated a ${type.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
    } else {
      alert(`No ${type.replace(/([A-Z])/g, ' $1').toLowerCase()} available`);
    }
  };

  return (
    <div className="room-management">
      <h2>Room Management</h2>
      <div className="room-types">
        {Object.keys(roomCounts).map((type) => (
          <div key={type} className="room-type">
            <h3>{type.replace(/([A-Z])/g, ' $1').toLowerCase()}</h3>
            <p>Available: {roomCounts[type]}</p>
            <button onClick={() => allocateRoom(type)}>Allocate Room</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Room;