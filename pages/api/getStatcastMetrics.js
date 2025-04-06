
export default async function handler(req, res) {
  try {
    // In a real implementation, you would fetch this data from Baseball Savant or a pre-scraped CSV/API.
    // For now, we simulate with some example player metrics.
    const data = [
      { name: "Aaron Judge", avgEV: 95.1, avgLA: 18.2, barrels: 15.2 },
      { name: "Juan Soto", avgEV: 92.4, avgLA: 13.8, barrels: 12.7 },
      { name: "Rafael Devers", avgEV: 93.5, avgLA: 16.0, barrels: 11.5 },
      { name: "Teoscar Hernández", avgEV: 91.2, avgLA: 17.3, barrels: 9.5 },
      { name: "Bryce Harper", avgEV: 93.8, avgLA: 14.6, barrels: 10.9 },
      { name: "Kyle Schwarber", avgEV: 94.0, avgLA: 20.1, barrels: 13.3 },
      { name: "Pete Alonso", avgEV: 92.9, avgLA: 19.4, barrels: 12.2 },
      { name: "Shohei Ohtani", avgEV: 95.7, avgLA: 16.9, barrels: 14.1 },
      { name: "Vladimir Guerrero Jr.", avgEV: 91.5, avgLA: 12.4, barrels: 8.9 },
      { name: "Mookie Betts", avgEV: 90.3, avgLA: 15.0, barrels: 7.6 }
    ];
    res.status(200).json({ data });
  } catch (err) {
    console.error('Error loading Statcast data:', err);
    res.status(500).json({ error: 'Failed to load Statcast metrics' });
  }
}
