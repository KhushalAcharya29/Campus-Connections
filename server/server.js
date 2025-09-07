const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000" },
});

app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));

// Store messages (mock database)
const messages = [];

// File Upload (Local Storage)
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

app.post("/api/messages/upload", upload.single("file"), (req, res) => {
  res.json({ fileUrl: `http://localhost:3001/${req.file.filename}` });
});

app.get("/api/messages", (req, res) => {
  res.json(messages);
});

app.post("/api/messages", (req, res) => {
  messages.push(req.body);
  res.sendStatus(200);
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", (msg) => {
    messages.push(msg);
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(3001, () => console.log("Server running on port 3001"));
