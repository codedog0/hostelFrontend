import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Dashboard.module.css';

interface UserInfo {
  name: string;
  allotedRoom: string | null;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [availableRooms, setAvailableRooms] = useState<number[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<number | ''>('');
  const [partnerId, setPartnerId] = useState('');
  const [partnerName, setPartnerName] = useState<string | null>(null);
  const [currentFloor, setCurrentFloor] = useState(1);

  const floors = [
    { number: 1, label: '1st Floor' },
    { number: 2, label: '2nd Floor' },
    { number: 3, label: '3rd Floor' },
    { number: 4, label: '4th Floor' },
  ];

  const getRoomsForFloor = (floor: number) => {
    const start = floor * 100 + 1;
    // const end = start + 19; // This will give us rooms 101-120, 201-220, etc.
    return Array.from({ length: 20 }, (_, i) => start + i)
      .filter(room => availableRooms.includes(room));
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login'); // Redirect to login if no token
    } else {
      // Fetch user info using Axios
      axios
        .get('https://hostelbackend-fd9l.onrender.com/api/v1/getUserInfo', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data) {
            setUserInfo(response.data);

            // If allotedRoom is null, fetch available rooms
            if (!response.data.allotedRoom) {
              axios
                .get('http://hostelbackend-fd9l.onrender.com/api/v1/getAvailableRooms', {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
                .then((roomResponse) => {
                  setAvailableRooms(roomResponse.data.roomNos || []);
                })
                .catch((error) => {
                  console.error('Error fetching available rooms:', error);
                });
            }
          } else {
            throw new Error('Invalid user data');
          }
        })
        .catch((error) => {
          console.error('Error fetching user info:', error);
          localStorage.removeItem("access_token");
          navigate('/login'); // Redirect to login if fetching user info fails
        });
    }
  }, [navigate]);

  const handlePartnerValidation = () => {
    if (partnerId.length !== 6) {
      alert('Please enter a valid 6-digit partner ID.');
      return;
    }

    const token = localStorage.getItem('access_token');
    axios
      .get(`http://hostelbackend-fd9l.onrender.com/api/v1/getPartnerInfo?partnerId=${partnerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data && response.data.name) {
          setPartnerName(response.data.name);
        } else {
          alert('Invalid partner ID.');
        }
      })
      .catch((error) => {
        console.error('Error validating partner ID:', error);
        alert('Failed to validate partner ID. Please try again.');
      });
  };

  const handleSelectRoom = () => {
    if (!selectedRoom) {
      alert('Please select a room.');
      return;
    }

    const token = localStorage.getItem('access_token');
    axios
      .post(
        'http://hostelbackend-fd9l.onrender.com/api/v1/bookRoom',
        { roomId: selectedRoom,partnerId:partnerId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        alert('Room successfully assigned!');
        setUserInfo((prev) =>
          prev ? { ...prev, allotedRoom: selectedRoom.toString() } : prev
        );
        setAvailableRooms([]);
      })
      .catch((error) => {
        console.error('Error setting room:', error);
        alert('Failed to assign room. Please try again.');
      });
  };

  const renderRoomSelection = () => {
    return (
      <div className={styles.formGroup}>
        <label className={styles.label}>Select a floor:</label>
        <div className={styles.floorSelector}>
          {floors.map((floor) => (
            <button
              key={floor.number}
              className={`${styles.floorButton} ${
                currentFloor === floor.number ? styles.active : ''
              }`}
              onClick={() => setCurrentFloor(floor.number)}
            >
              {floor.label}
            </button>
          ))}
        </div>
        
        <label className={styles.label}>Select a room:</label>
        <div className={styles.roomGrid}>
          {getRoomsForFloor(currentFloor).map((room) => (
            <button
              key={room}
              className={`${styles.roomBlock} ${
                selectedRoom === room ? styles.selected : ''
              }`}
              onClick={() => setSelectedRoom(room)}
            >
              {room}
            </button>
          ))}
        </div>
        {selectedRoom && (
          <button
            onClick={handleSelectRoom}
            className={styles.button}
            style={{ marginTop: '1rem' }}
          >
            Assign Room {selectedRoom}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.welcome}>Dashboard</h1>
        {userInfo ? (
          <>
            <div className={styles.info}>
              <p>Hello, {userInfo.name}!</p>
              <p>
                {userInfo.allotedRoom
                  ? `Your allotted room is: ${userInfo.allotedRoom}`
                  : 'No room has been allotted to you yet.'}
              </p>
            </div>

            {!userInfo.allotedRoom && !partnerName && (
              <div className={styles.formGroup}>
                <label htmlFor="partner-id" className={styles.label}>
                  Enter your partner ID:
                </label>
                <div className={styles.inputGroup}>
                  <input
                    id="partner-id"
                    type="text"
                    value={partnerId}
                    onChange={(e) => setPartnerId(e.target.value)}
                    className={styles.input}
                    placeholder="Enter 6-digit ID"
                  />
                  <button
                    onClick={handlePartnerValidation}
                    className={styles.validateButton}
                  >
                    Validate
                  </button>
                </div>
              </div>
            )}

            {partnerName && (
              <div className={styles.partnerInfo}>
                <p>Partner Name: {partnerName}</p>
                {renderRoomSelection()}
              </div>
            )}
          </>
        ) : (
          <p className={styles.loading}>Loading your information...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
