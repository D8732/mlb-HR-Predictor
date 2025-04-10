// pages/api/getWeatherAndParks.js
export default function handler(req, res) {
  const data = [
    { stadium: "Yankee Stadium", temp: 78, wind: 12, factor: 1.1 },
    { stadium: "Angel Stadium", temp: 83, wind: 7, factor: 1.0 },
    { stadium: "Citizens Bank Park", temp: 75, wind: 15, factor: 1.2 },
    { stadium: "Citi Field", temp: 70, wind: 5, factor: 0.95 }
  ];

  res.status(200).json({ data });
}
