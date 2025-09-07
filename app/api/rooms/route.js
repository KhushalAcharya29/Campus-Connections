import { NextResponse } from "next/server";  
import dbConnect from "@/app/lib/mongodb";
import Room from "@/app/models/Room";

// Connect to DB
dbConnect();

// 📌 Create a new room
export async function POST(req) {
  try {
    const { roomName, seatsAvailable, groupType, owner } = await req.json();

    const newRoom = await Room.create({
      roomName,
      seatsAvailable,
      groupType,
      owner, // ✅ Store username, not ObjectId
    });

    return NextResponse.json({ newRoom }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating room" }, { status: 500 });
  }
}


// 📌 Get all rooms
export async function GET() {
  try {
    const rooms = await Room.find().lean(); // ✅ Convert to plain JSON

    // Ensure `owner` is a username, not an ObjectId
    const updatedRooms = rooms.map((room) => ({
      ...room,
      owner: room.owner.toString(),
    }));

    return NextResponse.json(updatedRooms, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}



// 📌 Delete a Room (Only Owner Can Delete)
export async function DELETE(req) {
  try {
    const { roomId, username } = await req.json();

    console.log("Delete Request:", { roomId, username });

    const room = await Room.findById(roomId);
    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    console.log("Room Owner (DB):", room.owner);
    console.log("Requesting User:", username);

    // Convert owner to string before comparing
    if (room.owner !== username) {
      return NextResponse.json({ error: "Only the owner can delete this room!" }, { status: 403 });
    }

    await Room.findByIdAndDelete(roomId);
    return NextResponse.json({ message: "Room deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

