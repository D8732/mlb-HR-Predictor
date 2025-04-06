
const stadiums = [
  { name: 'Yankee Stadium', lat: 40.8296, lon: -73.9262, factor: 1.10 },
  { name: 'Dodger Stadium', lat: 34.0739, lon: -118.2400, factor: 1.05 },
  { name: 'Coors Field', lat: 39.7561, lon: -104.9942, factor: 1.25 },
  { name: 'Fenway Park', lat: 42.3467, lon: -71.0972, factor: 1.02 },
  { name: 'Wrigley Field', lat: 41.9484, lon: -87.6553, factor: 1.10 },
  { name: 'Oracle Park', lat: 37.7786, lon: -122.3893, factor: 0.90 },
  { name: 'Petco Park', lat: 32.7076, lon: -117.1570, factor: 0.95 }
  // Add more stadiums as needed
];

export default async function handler(req, res) {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY; // You must set this in Vercel or .env

  try {
    const results = await Promise.all(
      stadiums.map(async (s) => {
        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${s.lat}&lon=${s.lon}&units=imperial&appid=${apiKey}`
        );
        const weather = await weatherRes.json();

        return {
          stadium: s.name,
          factor: s.factor,
          temp: weather.main.temp,
          wind: weather.wind.speed,
          conditions: weather.weather[0].description
        };
      })
    );

    res.status(200).json({ data: results });
  } catch (err) {
    console.error("Weather fetch error:", err);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
}
