import dbConnect from "@/app/lib/mongodb";
import User from "@/app/models/User";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method Not Allowed" });

  await dbConnect(); // Ensure MongoDB is connected

  const { username } = req.query; // Get username from URL

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
