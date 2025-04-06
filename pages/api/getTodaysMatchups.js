export default async function handler(req, res) {
  const today = new Date().toISOString().split('T')[0];
  const sample = {
    date: today,
    matchups: [
      {
        gameId: 1,
        homeTeam: "Yankees",
        awayTeam: "Red Sox",
        probablePitcherHome: "Gerrit Cole",
        probablePitcherAway: "Chris Sale",
        gameTime: "7:05 PM ET",
        venue: "Yankee Stadium"
      }
    ]
  };
  res.status(200).json(sample);
}