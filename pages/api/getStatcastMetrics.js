export default async function handler(req, res) {
  const data = [
    { name: "Aaron Judge", avgEV: 95.1, avgLA: 18.2, barrels: 15.2 },
    { name: "Juan Soto", avgEV: 92.4, avgLA: 13.8, barrels: 12.7 },
    { name: "Rafael Devers", avgEV: 93.5, avgLA: 16.0, barrels: 11.5 }
  ];
  res.status(200).json({ data });
}