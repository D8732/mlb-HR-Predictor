export default async function handler(req, res) {
  const players = [
    { name: "Aaron Judge", team: "nyy", position: "RF", HR: 3, AB: 12, stadium: "Yankee Stadium" },
    { name: "Juan Soto", team: "nyy", position: "LF", HR: 2, AB: 15, stadium: "Yankee Stadium" },
    { name: "Rafael Devers", team: "bos", position: "3B", HR: 1, AB: 14, stadium: "Yankee Stadium" }
  ];
  res.status(200).json({ players });
}