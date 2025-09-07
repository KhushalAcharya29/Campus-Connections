import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  sender: { type: String, required: true }, // Username of sender
  receiver: { type: String, required: true }, // Username of receiver
  message: { type: String },
  fileUrl: { type: String }, // For uploaded files
  timestamp: { type: Date, default: Date.now },
  status: { type: String, enum: ["sent", "delivered"], default: "sent" } // Double Tick Status
});

const Message = mongoose.models.Message || mongoose.model("Message", MessageSchema);
export default Message;
