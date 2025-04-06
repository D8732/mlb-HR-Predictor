
export default async function handler(req, res) {
  try {
    const today = new Date().toISOString().split('T')[0];
    const scheduleRes = await fetch(`https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${today}`);
    const scheduleData = await scheduleRes.json();

    const games = scheduleData.dates?.[0]?.games || [];

    const players = [];

    for (const game of games) {
      const gameId = game.gamePk;
      const boxScoreRes = await fetch(`https://statsapi.mlb.com/api/v1/game/${gameId}/boxscore`);
      const boxScore = await boxScoreRes.json();

      const teams = ['home', 'away'];
      for (const teamType of teams) {
        const teamPlayers = boxScore.teams[teamType]?.players || {};
        Object.values(teamPlayers).forEach(player => {
          if (
            player.position?.abbreviation !== 'P' &&
            player.stats?.batting?.atBats > 0
          ) {
            players.push({
              name: player.person.fullName,
              team: player.parentTeamId,
              HR: player.stats.batting.homeRuns || 0,
              AB: player.stats.batting.atBats || 0,
              stadium: game.venue.name
            });
          }
        });
      }
    }

    return res.status(200).json({ players });
  } catch (err) {
    console.error('Error fetching MLB data:', err);
    return res.status(500).json({ error: 'Failed to fetch MLB lineup data' });
  }
}
