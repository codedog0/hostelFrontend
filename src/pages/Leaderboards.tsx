import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/spinner';

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

    useEffect(() => {
        const fetchRankings = async () => {
            try {
                const response = await axios.get<Ranking[]>(`${apiUrl}/rankings`);
                setRankings(response.data);
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
                    </tr>
                </thead>
                <tbody>
                    {rankings.map((ranking, index) => (
                        <tr key={ranking.id}>
                            <td>{index + 1}</td>
                            <td>{ranking.name}</td>
                            <td>XX</td>
                            <td>{ranking.roomno}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboards;

