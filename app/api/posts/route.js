import dbConnect from "@/app/lib/mongodb";
import Post from "@/app/models/Post";
import User from "@/app/models/User";
import { NextResponse } from "next/server";
import mongoose from "mongoose"; // Import Mongoose for ObjectId conversion

export async function GET() {
  await dbConnect();
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate("author", "username"); // Populate username
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  await dbConnect();
  try {
    // Extract only the user ID value from cookies
    const userSession = req.cookies.get("userSession");
    const userId = userSession?.value; // Extract the ObjectId value

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Invalid user session." },
        { status: 401 }
      );
    }

    // Find the user by their MongoDB ObjectId
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Extract post data from request
    const { content, image, video } = await req.json();
    if (!content.trim()) {
      return NextResponse.json(
        { success: false, message: "Post content is required" },
        { status: 400 }
      );
    }

    // Create a new post with the authenticated user's ID
    const newPost = new Post({
      author: user._id, // Store MongoDB ObjectId
      content,
      image: image || null,
      video: video || null,
    });

    await newPost.save();

    return NextResponse.json(
      { success: true, message: "Post created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { success: false, message: "Error creating post" },
      { status: 500 }
    );
  }
}

