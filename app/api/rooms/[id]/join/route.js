import User from "@/app/models/User";        // Import User model
import dbConnect from "@/app/lib/mongodb";
import Room from "@/app/models/Room";

export async function POST(req) {
    try {
        await dbConnect(); 

        // Extract roomId from the request URL
        const { pathname } = req.nextUrl;
        const roomId = pathname.split("/").at(-2);

        console.log("Extracted roomId:", roomId);  // 🔍 Debugging log

        return Response.json({ message: "Debugging", roomId });
    } catch (error) {
        console.error("Error:", error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }

}
