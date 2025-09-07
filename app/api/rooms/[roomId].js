import dbConnect from "@/app/lib/mongodb";
import Room from "@/app/models/Room";

export default async function handler(req, res) {
  await dbConnect();

  const { roomId } = req.query;

  if (req.method === "DELETE") {
    try {
      const room = await Room.findById(roomId);

      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      }

      await Room.findByIdAndDelete(roomId);
      return res.status(200).json({ message: "Room deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Error deleting room" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
