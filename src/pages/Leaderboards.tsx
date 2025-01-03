import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Ranking = {
    id: number;
    name: string;
    branch: string;
    cgpa: number;
    allotedRoom: number;
};

const Leaderboards: React.FC = () => {
    const [rankings, setRankings] = useState<Ranking[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRankings = async () => {
            try {
                const response = await axios.get<Ranking[]>('http://127.0.0.1:8000/api/v1/rankings');
                setRankings(response.data);
            } catch (err) {
                setError('Failed to fetch rankings');
            } finally {
                setLoading(false);
            }
        };

        fetchRankings();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

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
                            <td>{ranking.cgpa}</td>
                            <td>{ranking.allotedRoom}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboards;

