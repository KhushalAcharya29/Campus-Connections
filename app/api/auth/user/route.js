export const dynamic = "force-dynamic"; // Add this at the top
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import dbConnect from "@/app/lib/mongodb";
import User from "@/app/models/User";

export async function GET() {
  try {
    // Get session
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(JSON.stringify({ message: "Not authenticated" }), { status: 401 });
    }

    await dbConnect();

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    // Remove sensitive fields like password
    const { password, ...safeUser } = user.toObject();

    return new Response(JSON.stringify(safeUser), { status: 200 });
  } catch (error) {
    console.error("API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}