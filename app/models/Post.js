import mongoose from "mongoose";

// Define a sub-schema for comments
const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      username: { type: String },
    },
  },
  { timestamps: true }
);

// Main post schema
const PostSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: [true, "Post content is required"],
    },
    image: {
      type: String,
      default: "",
    },
    video: {
      type: String,
      default: "",
    },
    reaction: {
      type: String,
      default: "👍",
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        _id: mongoose.Schema.Types.ObjectId,
        username: String,
        content: String,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
