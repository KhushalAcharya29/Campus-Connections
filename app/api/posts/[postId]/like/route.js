import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import Post from "@/app/models/Post";

export async function GET(req, { params }) {
  await connectDB();

  const { postId } = params;
  try {
    const post = await Post.findById(postId);
    if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

    return NextResponse.json({ reaction: post.reaction, count: post.likeCount });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch likes" }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  await connectDB();

  const { postId } = params;
  const { reaction } = await req.json();

  try {
    const post = await Post.findById(postId);
    if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

    post.reaction = reaction;
    post.likeCount += 1;
    await post.save();

    return NextResponse.json({ message: "Like updated" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update like" }, { status: 500 });
  }
}
