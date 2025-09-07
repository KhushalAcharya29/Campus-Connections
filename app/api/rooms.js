import dbConnect from "@/app/lib/mongodb";
import Room from "@/app/models/Room";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const rooms = await Room.find({});
      return res.status(200).json(rooms);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching rooms" });
    }
  }

  if (req.method === "POST") {
    try {
      const { roomName, seatsAvailable, groupType, owner } = req.body;

      if (!roomName || seatsAvailable < 1) {
        return res.status(400).json({ error: "Invalid room details" });
      }

      const newRoom = new Room({
        roomName,
        seatsAvailable,
        groupType,
        owner,
        members: [owner], // Auto-add creator
      });

      await newRoom.save();
      return res.status(201).json({ newRoom });
    } catch (error) {
      return res.status(500).json({ error: "Error creating room" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
