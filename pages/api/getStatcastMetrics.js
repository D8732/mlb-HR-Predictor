// pages/api/getStatcastMetrics.js
export default function handler(req, res) {
  const data = [
    { name: "Aaron Judge", avgEV: 95.1, avgLA: 18.2, barrels: 15.2 },
    { name: "Juan Soto", avgEV: 92.4, avgLA: 13.8, barrels: 12.7 },
    { name: "Shohei Ohtani", avgEV: 95.7, avgLA: 16.9, barrels: 14.1 },
    { name: "Bryce Harper", avgEV: 93.8, avgLA: 14.6, barrels: 10.9 },
    { name: "Pete Alonso", avgEV: 92.9, avgLA: 19.4, barrels: 12.2 }
  ];

  console.log("Sending Statcast metrics for known players");
  res.status(200).json({ data });
}
