export default async function handler(req, res) {
  const data = [
    {
      stadium: "Yankee Stadium",
      factor: 1.10,
      temp: 78,
      wind: 12
    }
  ];
  res.status(200).json({ data });
}