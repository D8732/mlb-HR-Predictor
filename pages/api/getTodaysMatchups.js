
export default async function handler(req, res) {
  try {
    const today = new Date().toISOString().split('T')[0];
    const response = await fetch(`https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${today}&hydrate=probablePitcher(note)`);
    const data = await response.json();
    const matchups = data.dates?.[0]?.games.map(game => ({
      gameId: game.gamePk,
      homeTeam: game.teams.home.team.name,
      awayTeam: game.teams.away.team.name,
      probablePitcherHome: game.teams.home.probablePitcher?.fullName || 'TBD',
      probablePitcherAway: game.teams.away.probablePitcher?.fullName || 'TBD',
      gameTime: game.gameDate,
      venue: game.venue.name
    })) || [];

    res.status(200).json({ date: today, matchups });
  } catch (err) {
    console.error('Error loading matchups:', err);
    res.status(500).json({ error: 'Failed to load matchups' });
  }
}
