import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongodb";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const db = await dbConnect();
    const users = db.collection("users");

    // Check if user exists
    const user = await users.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);
    await users.updateOne({ email }, { $set: { password: hashedPassword } });

    return NextResponse.json({ message: "Password updated successfully!" });
  } catch (error) {
    return NextResponse.json({ message: "Error resetting password." }, { status: 500 });
  }
}
