import dbConnect from '@/app/lib/mongodb';

export async function GET(req) {
  try {
    // Connect to MongoDB
    await dbConnect();

    return new Response(JSON.stringify({ message: "MongoDB connected successfully!" }), { status: 200 });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return new Response(JSON.stringify({ error: "Failed to connect to MongoDB" }), { status: 500 });
  }
}
