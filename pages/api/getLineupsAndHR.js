// pages/api/getLineupsAndHR.js
export default async function handler(req, res) {
  try {
    const today = new Date().toISOString().split('T')[0];
    const scheduleRes = await fetch(`https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${today}`);
    const scheduleData = await scheduleRes.json();

    const gameIds = scheduleData.dates[0]?.games?.map(game => game.gamePk) || [];
    let players = [];

    for (const gamePk of gameIds) {
      const gameRes = await fetch(`https://statsapi.mlb.com/api/v1.1/game/${gamePk}/feed/live`);
      const gameData = await gameRes.json();

      const home = gameData.liveData?.boxscore?.teams?.home || {};
      const away = gameData.liveData?.boxscore?.teams?.away || {};

      const extractPlayers = (team) => {
        if (!team?.battingOrder?.length) return [];

        return team.battingOrder
          .map(playerId => {
            const player = team.players?.[playerId];
            if (!player) return null;

            return {
              name: player.person?.fullName || "Unknown",
              teamId: team.team?.id || 0,
              teamName: team.team?.name || "Unknown",
              HR: 0,
              AB: 0,
              stadium: gameData.gameData?.venue?.name || "Unknown"
            };
          })
          .filter(p => p !== null);
      };

      players.push(...extractPlayers(home));
      players.push(...extractPlayers(away));
    }

    if (!players.length) {
      console.warn("No real players found — using fallback mock data.");
      players = [
        { name: "Aaron Judge", HR: 1, AB: 3, teamId: 147, teamName: "New York Yankees", stadium: "Yankee Stadium" },
        { name: "Juan Soto", HR: 0, AB: 4, teamId: 147, teamName: "New York Yankees", stadium: "Yankee Stadium" },
        { name: "Shohei Ohtani", HR: 2, AB: 4, teamId: 119, teamName: "Los Angeles Angels", stadium: "Angel Stadium" },
        { name: "Bryce Harper", HR: 1, AB: 4, teamId: 143, teamName: "Philadelphia Phillies", stadium: "Citizens Bank Park" },
        { name: "Pete Alonso", HR: 0, AB: 3, teamId: 121, teamName: "New York Mets", stadium: "Citi Field" }
      ];
    }

    res.status(200).json({ players });
  } catch (error) {
    console.error("Failed to fetch lineups:", error);
    res.status(500).json({ error: "Failed to fetch lineups" });
  }
}
