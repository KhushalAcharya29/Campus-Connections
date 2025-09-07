import dbConnect from "@/app/lib/mongodb";
import Post from "@/app/models/Post";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function DELETE(req, { params }) {
  await dbConnect();

  const { postId } = params;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return NextResponse.json({
      success: false,
      message: "Invalid post ID",
    }, { status: 400 });
  }

  try {
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return NextResponse.json({
        success: false,
        message: "Post not found",
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error while deleting post",
    }, { status: 500 });
  }
}
