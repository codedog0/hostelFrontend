import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Dashboard.module.css';

interface UserInfo {
  name: string;
  allotedRoom: string | null;
  id: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [availableRooms, setAvailableRooms] = useState<string[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string | ''>('');
  const [partnerId, setPartnerId] = useState('');
  const [partnerName, setPartnerName] = useState<string | null>(null);
  const [currentFloor, setCurrentFloor] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const roomsPerPage = 6;  // 3x2 grid

  const floors = [
    { number: 1, label: '1st Floor' },
    { number: 2, label: '2nd Floor' },
    { number: 3, label: '3rd Floor' },
    { number: 4, label: '4th Floor' },
  ];

  const getRoomsForFloor = (floor: number) => {
    const start = floor * 100 + 1;
    const end = start + 19;
    return Array.from({ length: 20 }, (_, i) => start + i);
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login'); // Redirect to login if no token
    } else {
      // Fetch user info using Axios
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/getUserInfo`, {
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
                .get(`${process.env.REACT_APP_API_BASE_URL}/getAvailableRooms`, {
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
      .get(`${process.env.REACT_APP_API_BASE_URL}/getPartnerInfo?partnerId=${partnerId}`, {
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
        `${process.env.REACT_APP_API_BASE_URL}/bookRoom`,
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
    const floorRooms = getRoomsForFloor(currentFloor);
    const totalPages = Math.ceil(floorRooms.length / roomsPerPage);
    const startIndex = currentPage * roomsPerPage;
    const displayedRooms = floorRooms.slice(startIndex, startIndex + roomsPerPage);

    const handleRoom101=()=>{
      if(currentPage==0){
        return (101+((currentFloor-1)*100)).toString();
      }
      else if(currentPage==1){
        return '1A1';
      }
      else if(currentPage==2){
        return '1A2';
      }
      else{
        return '1A3'
      }
    }

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
              onClick={() => {
                setCurrentFloor(floor.number);
                setCurrentPage(0);
              }}
            >
              {floor.label}
            </button>
          ))}
        </div>
        
        <div className={styles.roomLegend}>
          <div className={styles.legendItem}>
            <span className={styles.legendBox + ' ' + styles.available}></span>
            <span>Available</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendBox + ' ' + styles.occupied}></span>
            <span>Occupied</span>
          </div>
        </div>

        <label className={styles.label}>Select a room:</label>
        <div className={styles.roomCarousel}>
          <button 
            className={styles.carouselButton}
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
          >
            ←
          </button>

          <div className={styles.floorLayout}>
            <svg 
              viewBox="0 0 800 800" 
              className={styles.floorSvg}
            >
              {/* Balcony */}
              <rect x="250" y="50" width="300" height="60" rx="30" className={styles.balconySection} />
              <text x="400" y="85" textAnchor="middle" className={styles.svgText}>Balcony</text>

              {/* Main Vertical Corridor */}
              <rect x="380" y="110" width="40" height="580" fill="#A9A9A9"/>

              {/* Horizontal Corridors */}
              <rect x="200" y="250" width="400" height="40" fill="#A9A9A9"/>
              <rect x="200" y="450" width="400" height="40" fill="#A9A9A9"/>

              {/* Room 101 (Special Position) */}
              <g onClick={() => availableRooms.includes(handleRoom101()) ? setSelectedRoom(handleRoom101()) : null}>
                <rect 
                  x="100" 
                  y="415" 
                  width="140" 
                  height="100" 
                  rx="30"
                  className={`${styles.svgRoom} ${
                    selectedRoom === handleRoom101() ? styles.selected : ''
                  } ${availableRooms.includes(handleRoom101()) ? styles.available : styles.occupied}`}
                />
                <text x="170" y="470" textAnchor="middle" className={styles.svgText}>
                  Room {handleRoom101()}
                </text>
              </g>

              {/* Left Side Rooms */}
              {[
                { num: (104+((currentPage)*6+((currentFloor-1)*100))).toString()  , x: 200, y: 130 },
                { num: (103 +((currentPage)*6+((currentFloor-1)*100))).toString() , x: 200, y: 300 },
                { num: (102 + ((currentPage)*6+((currentFloor-1)*100))).toString(), x: 200, y: 525 }
              ].map(room => (
                <g key={`room-${room.num}`} onClick={() => availableRooms.includes(room.num) ? setSelectedRoom(room.num) : null}>
                  <rect 
                    x={room.x} 
                    y={room.y} 
                    width="170" 
                    height="110" 
                    rx="30"
                    className={`${styles.svgRoom} ${
                      selectedRoom === room.num ? styles.selected : ''
                    } ${availableRooms.includes(room.num) ? styles.available : styles.occupied}`}
                  />
                  <text 
                    x={room.x + 85} 
                    y={room.y + 65} 
                    textAnchor="middle" 
                    className={styles.svgText}
                  >
                    Room {room.num}
                  </text>
                </g>
              ))}

              {/* Right Side Rooms */}
              {[
                { num: (105 +((currentPage)*6+((currentFloor-1)*100))).toString(), x: 430, y: 130 },
                { num: (106+((currentPage)*6+((currentFloor-1)*100))).toString() , x: 430, y: 300 },
                { num: (107+((currentPage)*6+((currentFloor-1)*100))).toString() , x: 430, y: 525 }
              ].map(room => (
                <g key={`room-${room.num}`} onClick={() => availableRooms.includes(room.num) ? setSelectedRoom(room.num) : null}>
                  <rect 
                    x={room.x} 
                    y={room.y} 
                    width="170" 
                    height="110" 
                    rx="30"
                    className={`${styles.svgRoom} ${
                      selectedRoom === room.num ? styles.selected : ''
                    } ${availableRooms.includes(room.num) ? styles.available : styles.occupied}`}
                  />
                  <text 
                    x={room.x + 85} 
                    y={room.y + 65} 
                    textAnchor="middle" 
                    className={styles.svgText}
                  >
                    Room {room.num}
                  </text>
                </g>
              ))}

              {/* Toilet */}
              <rect x="300" y="680" width="200" height="60" rx="30" className={styles.toiletSection} />
              <text x="400" y="715" textAnchor="middle" className={styles.svgText}>Toilet</text>
            </svg>
          </div>

          <button 
            className={styles.carouselButton}
            onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))
           
             }
            disabled={currentPage >= totalPages - 1}
          >
            →
          </button>
        </div>

        {selectedRoom && (
          <div className={styles.bookingSection}>
            <p className={styles.selectedRoomInfo}>
              Selected Room: {selectedRoom}
              {partnerName && <span> | Partner: {partnerName}</span>}
            </p>
            <button 
              className={styles.bookButton}
              onClick={handleSelectRoom}
            >
              Book Room
            </button>
          </div>
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
              <p>Your ID: {userInfo.id}</p>
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
