import dbConnect from "@/app/lib/mongodb";
import Room from "@/app/models/Room";

export default async function handler(req, res) {
  await dbConnect();
  const { roomId } = req.query;
  const { username } = req.body;

  if (req.method === "POST") {
    try {
      const room = await Room.findById(roomId);
      if (!room) return res.status(404).json({ error: "Room not found" });

      if (!room.members) room.members = []; // ✅ Ensure the array exists
      if (room.members.includes(username)) {
        return res.status(400).json({ error: "Already a member" });
      }

      room.members.push(username); // ✅ Add username
      await room.save();

      return res.status(200).json({ message: "Joined successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Error joining room" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
