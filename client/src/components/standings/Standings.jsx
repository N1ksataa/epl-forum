import { useEffect, useState } from 'react';
import './Standings.css'

export default function Standings() {
    const [standings, setStandings] = useState([]);

    useEffect(() => {
        const fetchStandings = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/standings');
                const data = await response.json();
    
                if (data && data.length > 0) {
                    setStandings(data);
                } else {
                    console.error('No data in the API response');
                }
            } catch (error) {
                console.error('Error loading standings:', error);
            }
        };
    
        fetchStandings();
    
        const interval = setInterval(() => {
            fetchStandings();
        }, 60000);
    
        return () => {
            clearInterval(interval);
        };
    }, []);
    


    return (
        <div className="standings-table">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Team</th>
                        <th>Pts</th>
                        <th>P</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th>GD</th>
                    </tr>
                </thead>
                <tbody>
                    {standings.map((team, index) => (
                        <tr key={team.team.id}>
                            <td>{index + 1}</td>
                            <td>
                                <img src={team.team.crest} alt={team.team.name}/>
                                {team.team.name}
                            </td>
                            <td>{team.points}</td>
                            <td>{team.playedGames}</td>
                            <td>{team.won}</td>
                            <td>{team.draw}</td>
                            <td>{team.lost}</td>
                            <td>{team.goalDifference}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
