import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login'); // Redirect to login if no token
    } else {
      // Fetch user info using Axios
      axios
        .get('http://localhost:8000/api/v1/getUserInfo', {
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
                .get('http://localhost:8000/api/v1/getAvailableRooms', {
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
      .get(`http://localhost:8000/api/v1/getPartnerInfo?partnerId=${partnerId}`, {
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
        'http://localhost:8000/api/v1/bookRoom',
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

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <h1>Welcome to the Dashboard</h1>
      {userInfo ? (
        <>
          <p>Hello, {userInfo.name}!</p>
          <p>
            {userInfo.allotedRoom
              ? `Your allotted room is: ${userInfo.allotedRoom}`
              : 'No room has been allotted to you yet.'}
          </p>
          {!userInfo.allotedRoom && !partnerName && (
            <div>
              <label htmlFor="partner-id">Enter your partner ID:</label>
              <input
                id="partner-id"
                type="text"
                value={partnerId}
                onChange={(e) => setPartnerId(e.target.value)}
                style={{ marginLeft: '8px' }}
              />
              <button
                onClick={handlePartnerValidation}
                style={{
                  padding: '10px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  marginLeft: '8px',
                }}
              >
                Validate Partner ID
              </button>
            </div>
          )}
          {partnerName && (
            <>
              <p>Partner Name: {partnerName}</p>
              <div>
                <label htmlFor="room-select">Select a room:</label>
                <select
                  id="room-select"
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(Number(e.target.value))}
                  style={{ marginLeft: '8px' }}
                >
                  <option value="" disabled>
                    Choose a room
                  </option>
                  {availableRooms.map((room) => (
                    <option key={room} value={room}>
                      {room}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleSelectRoom}
                  style={{
                    padding: '10px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    marginTop: '16px',
                    marginLeft: '8px',
                  }}
                >
                  Assign Room
                </button>
              </div>
            </>
          )}
        </>
      ) : (
        <p>Loading your information...</p>
      )}
    </div>
  );
};

export default Dashboard;
