import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongodb"; // Ensure this is your correct DB connection file
import Message from "@/app/models/Message"; // Ensure this is your Mongoose model

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const sender = searchParams.get("sender");
    const receiver = searchParams.get("receiver");

    if (!sender || !receiver) {
      return NextResponse.json({ success: false, error: "Missing sender or receiver" }, { status: 400 });
    }

    const messages = await Message.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort({ timestamp: 1 });

    return NextResponse.json({ success: true, messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.sender || !body.receiver || !body.message) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    const newMessage = new Message({
      sender: body.sender,
      receiver: body.receiver,
      message: body.message,
      timestamp: new Date(),
    });

    await newMessage.save();

    return NextResponse.json({ success: true, message: "Message sent!" });
  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
