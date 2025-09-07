import dbConnect from "@/app/lib/mongodb";
import Post from "@/app/models/Post";
import User from "@/app/models/User"; // optional for username
import { ObjectId } from 'mongodb';


export async function POST(req, { params }) {
  await dbConnect();

  const {commentContent, username, content,userId } = await req.json();

  const postId = params.postId;

  if (!commentContent || !userId) {
    return Response.json({ success: false, message: "Missing fields" }, { status: 400 });
  }

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return Response.json({ success: false, message: "Post not found" }, { status: 404 });
    }

    const user = await User.findById(userId);

      // ✅ Define commentId here
      
const commentId = new ObjectId();

    const newComment = {
      content: commentContent,
      author: {
        _id: user._id,
        username: user.username,
      },
      _id: new Date().getTime().toString(), // optional if not using Mongo subdocs
    };

    // Push the comment
    post.comments.push({
        _id: commentId,
        username,
        content,
      });
  
      await post.save();

    return Response.json({ success: true, comments: post.comments });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
