import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/spinner';
import "./Leaderboards.css";
type Ranking = {
    id: number;
    name: string;
    branch: string;
    cgpa: number;
    roomno: number;
};
const apiUrl = import.meta.env.VITE_API_BASE_URL;

const Leaderboards: React.FC = () => {
    const [rankings, setRankings] = useState<Ranking[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const userJson = localStorage.getItem('name');
    const username = userJson !== null ? userJson : "";
    const handleTime = (id:number):string => {
        const startHour = 9 + Math.floor(id / 10);
        const endHour = startHour + 1;
        return `${startHour}:00-${endHour}:00`;
    };
    useEffect(() => {
        const fetchRankings = async () => {
            try {
                const response = await axios.get<Ranking[]>(`${apiUrl}/rankings/?userName=${encodeURIComponent(username)}`);
                const rankingsWithId = response.data.map((item, index) => ({
                    ...item,
                    id: item.id ?? index + 1, // Assign `index + 1` if `id` is missing
                }));
                setRankings(rankingsWithId);
            } catch (err) {
                setError('Failed to fetch rankings');
            } finally {
                setLoading(false);
            }
        };

        fetchRankings();
    }, []);

    if (loading) return <div className='error-center'><Spinner /></div>;
    if (error) return <div className='error-center'>{error}</div>;

  return (
        <div className="leaderboard-container">
            <h1>Allotment Status</h1>
            <table className="leaderboard-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>CGPA</th>
                        <th>Alloted Room</th>
                        <th>Time</th>
                    </tr>
                </thead>
              <tbody>
                  {rankings.map((ranking, index) => {
                        const hasLongNameInGroup = rankings.slice(index, index + 10).some(r => r.name.length > 2);
                        return(

                            <tr key={ranking.id}
                            style={{ backgroundColor: ranking.name.length > 2 ? '#90ee90' : 'transparent' }}>
                          <td>{index + 1}</td>
                          <td>{ranking.name}........</td> 
                          <td>{ranking.cgpa}</td>
                          <td>{ranking.roomno}</td>
                          {index % 10 === 0 && ( // Only add time slot for first row of each 10-row group
                              <td rowSpan={10}
                              className='timeSlot'
                                        style={{ backgroundColor: hasLongNameInGroup ? '#90ee90' : '#FFB6C1'}}>{handleTime(index)}</td>
                            )}    
                      </tr>
                        )
                })}
              </tbody>

            </table>
        </div>
    );
};

export default Leaderboards;

