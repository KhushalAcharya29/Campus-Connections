import { Server } from "socket.io";

export default function SocketHandler(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    
    io.on("connection", (socket) => {
      console.log("User Connected:", socket.id);

      // Listen for new messages
      socket.on("sendMessage", (message) => {
        io.emit("receiveMessage", message); // Broadcast message in real-time
      });

      // Typing Indicator
      socket.on("typing", (data) => {
        socket.broadcast.emit("displayTyping", data);
      });

      socket.on("disconnect", () => {
        console.log("User Disconnected:", socket.id);
      });
    });

    res.socket.server.io = io;
  }
  res.end();
}
