import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  roomName: { type: String, required: true },
  seatsAvailable: { type: Number, required: true },
  groupType: { type: String, enum: ["Public", "Private"], required: true },
  owner: { type: String, required: true }, // ✅ Store username, NOT ObjectId
  members: { type: [String], default: [] }, // ✅ Add members array
  requests: { type: [String], default: [] }, // For private groups
});

const Room = mongoose.models.Room || mongoose.model("Room", RoomSchema);
export default Room;
