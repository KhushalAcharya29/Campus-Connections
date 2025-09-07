import dbConnect from "@/app/lib/mongodb";
import User from "@/app/models/User";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    
    console.log("Fetching user:", params.username); // Debugging Log

    const user = await User.findOne({ username: params.username });

    if (!user) {
      console.log("User not found in DB:", params.username);
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    console.log("User found:", user);
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
