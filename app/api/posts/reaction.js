import dbConnect from "../../../utils/dbConnect";
import Post from "../../../models/Post";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { postId, userId, reactionType } = req.body;

      const post = await Post.findById(postId);
      if (!post) return res.status(404).json({ error: "Post not found" });

      // Check if user has already reacted
      const existingReactionIndex = post.reactions.findIndex(
        (reaction) => reaction.userId === userId
      );

      if (existingReactionIndex !== -1) {
        post.reactions[existingReactionIndex].reactionType = reactionType;
      } else {
        post.reactions.push({ userId, reactionType });
      }

      await post.save();
      res.status(200).json({ success: true, reactions: post.reactions });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
