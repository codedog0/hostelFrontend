import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/spinner';
import { Link } from 'react-router-dom';
import "./Leaderboards.css";
import { versions } from 'process';
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
    const [timeSlots, setTimeSlots] = useState<CondensedTimeSlot[]>([]);

    interface CondensedTimeSlot {
        id:number;
        rank_start: number;
        rank_end: number;
        access_start: string;
        access_end: string;
    }

    useEffect(() => {
        fetchTimeSlots().then(setTimeSlots);
    }, []);
    const fetchTimeSlots = async (): Promise<CondensedTimeSlot[]> => {
        const res = await fetch(`${apiUrl}/timeslots`);
        return await res.json();
    };

    const getTimeSlotForRank = (rank: number): string => {
        
        const slot = timeSlots.find(s => rank >= s.rank_start && rank <= s.rank_end);
        return slot ? `${slot.access_start}-${slot.access_end}` : "Time Not Available";
    };
    useEffect(() => {
        const fetchRankings = async () => {
            try {
                const response = await axios.get<Ranking[]>(`${apiUrl}/rankings?userName=${encodeURIComponent(username)}`);
                const rankingsWithId = response.data.map((item, index) => ({
                    ...item,
                    id: item.id ?? index + 1,
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
        <div className="leaderboard-container" style={{
            maxWidth: 900,
            margin: "40px auto",
            background: "#fff",
            borderRadius: 12,
            padding: 24,
            overflowX: "auto"
        }}>
            <h1 style={{textAlign: "center", marginBottom: 24, fontWeight: 700, fontSize: 28, color: "#0c7ff2"}}>Allotment Status</h1>
            <div style={{overflowX: "auto"}}>
            <table className="leaderboard-table" style={{width: "100%", borderCollapse: "collapse"}}>
                <thead>
                    <tr style={{background: "#f3f6fa"}}>
                        <th style={{position: "sticky", top: 0, zIndex: 1}}>Rank</th>
                        <th style={{position: "sticky", top: 0, zIndex: 1}}>Name</th>
                        <th style={{position: "sticky", top: 0, zIndex: 1}}>CGPA</th>
                        <th style={{position: "sticky", top: 0, zIndex: 1}}>Alloted Room</th>
                        <th style={{position: "sticky", top: 0, zIndex: 1}}>Time Slot</th>
                    </tr>
                </thead>
                <tbody>
                    {rankings.map((ranking, index) => {
                        const hasLongNameInGroup = rankings.slice(index, index + 10).some(r => r.name.length > 2);
                        return (
                            <tr
                                key={ranking.id}
                                style={{
                                    backgroundColor: index % 2 === 0 ? "#f9fbfd" : "#fff",
                                    borderBottom: "1px solid #e5e7eb"
                                }}
                            >
                                <td style={{textAlign: "center", fontWeight: 500}}>{index + 1}</td>
                                <td style={{fontWeight: 500}}>{ranking.name}</td>
                                <td style={{textAlign: "center"}}>{ranking.cgpa}</td>
                                <td style={{textAlign: "center"}}>{ranking.roomno}</td>
                                {index % 10 === 0 && (
                                    <td
                                        rowSpan={10}
                                        className='timeSlot'
                                        style={{
                                            backgroundColor: hasLongNameInGroup ? '#90ee90' : '#FFB6C1',
                                            textAlign: "center",
                                            fontWeight: 600,
                                            verticalAlign: "middle",
                                            minWidth: 90,
                                            cursor: "help"
                                        }}
                                        title="This is the time slot for this group"
                                    >
                                        {getTimeSlotForRank(index+1)}
                                    </td>
                                )}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>

            {/* Floating Dashboard Button */}
            <Link
                to="/dashboard"
                style={{
                    position: "fixed",
                    bottom: 32,
                    right: 32,
                    zIndex: 1000,
                    background: "#0c7ff2",
                    color: "#fff",
                    padding: "7px 9px",
                    borderRadius: "999px",
                    fontWeight: 700,
                    fontSize: 18,
                    boxShadow: "0 4px 16px rgba(12,127,242,0.15)",
                    textDecoration: "none",
                    transition: "background 0.2s",
                }}
                onMouseOver={e => (e.currentTarget.style.background = "#095bb5")}
                onMouseOut={e => (e.currentTarget.style.background = "#0c7ff2")}
            >
                Dashboard
            </Link>
        </div>
    );
};

export default Leaderboards;

