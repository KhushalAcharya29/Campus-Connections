import { getServerSession } from "next-auth";
import dbConnect from "@/app/lib/mongodb"; // Ensure this is your correct DB connection file
import User from "@/app/models/User";

export async function GET(req) {
  try {
    const session = await getServerSession(req);
    if (!session) {
      return new Response(JSON.stringify({ message: "Not authenticated" }), { status: 401 });
    }

    await dbConnect();
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
