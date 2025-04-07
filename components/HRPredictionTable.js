import React, { useEffect, useState } from 'react';
import teamIdToAbbr from "./teamIdToAbbreviation";

export default function HRPredictionTable() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
  
    try {
      console.log("Fetching live player + statcast + weather data...");
  
      const [lineupsRes, statcastRes, weatherRes] = await Promise.all([
        fetch('/api/getLineupsAndHR'),
        fetch('/api/getStatcastMetrics'),
        fetch('/api/getWeatherAndParks')
      ]);
  
      const lineupsData = await lineupsRes.json();
      const statcastData = await statcastRes.json();
      const weatherData = await weatherRes.json();
  
      console.log("Lineups data:", lineupsData);
      console.log("Statcast data:", statcastData);
      console.log("Weather data:", weatherData);
  
      const combined = lineupsData.players.map(player => {
        const statMatch = statcastData.data.find(
          p => p.name.toLowerCase() === player.name.toLowerCase()
        );
  
        const parkInfo = weatherData.data.find(w =>
          w.stadium.toLowerCase().includes(player.stadium?.toLowerCase() || '')
        );
  
        const tempBoost = parkInfo?.temp > 75 ? 1.05 : 1;
        const windBoost = parkInfo?.wind > 10 ? 1.1 : 1;
        const parkFactor = parkInfo?.factor || 1;
  
        const baseScore = statMatch
          ? (statMatch.avgEV * 0.4 + statMatch.avgLA * 0.2 + statMatch.barrels * 10 + player.HR * 0.4)
          : player.HR * 0.5;
  
        const totalScore = baseScore * tempBoost * windBoost * parkFactor;
  
        const teamAbbr = teamIdToAbbr[player.team] || "mlb";
  
        return {
          name: player.name,
          team: teamAbbr.toUpperCase(),
          HR: player.HR,
          AB: player.AB,
          avgEV: statMatch?.avgEV || "-",
          avgLA: statMatch?.avgLA || "-",
          barrels: statMatch?.barrels || "-",
          score: Math.round(totalScore * 10) / 10,
          logo: `https://a.espncdn.com/i/teamlogos/mlb/500/${teamAbbr}.png`
        };
      });
       console.log("Combined players:", combined);
      setPlayers(combined.sort((a, b) => b.score - a.score));
    } catch (err) {
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };
  
    }

  useEffect(() => {
    fetchData(
  );
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Today's HR Potential Rankings</h1>
      <button onClick={fetchData} disabled={loading} className="mb-4 px-4 py-2 bg-blue-600 text-white rounded">
        {loading ? 'Loading...' : 'Refresh Rankings'}
      </button>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-sm text-left border">
          <thead>
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Player</th>
              <th className="p-2">Team</th>
              <th className="p-2">HR</th>
              <th className="p-2">AB</th>
              <th className="p-2">Avg EV</th>
              <th className="p-2">LA</th>
              <th className="p-2">Barrels%</th>
              <th className="p-2">HR Score</th>
            </tr>
          </thead>
          <tbody>
            {players.map((p, idx) => (
              <tr key={idx} className={`border-t ${idx < 10 ? 'bg-yellow-100 font-bold' : ''}`}>
                <td className="p-2">{idx + 1}</td>
                <td className="p-2">{p.name}</td>
                <td className="p-2">
                  <img src={p.logo} alt={p.team} className="w-6 h-6 inline mr-2 align-middle" />
                  {p.team}
                </td>
                <td className="p-2">{p.HR}</td>
                <td className="p-2">{p.AB}</td>
                <td className="p-2">{p.avgEV}</td>
                <td className="p-2">{p.avgLA}</td>
                <td className="p-2">{p.barrels}</td>
                <td className="p-2 font-semibold">{p.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

