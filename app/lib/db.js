// import mongoose from "mongoose";

// const MONGO_URI = "mongodb://localhost:27017/ratnam-connections";

// const dbConnects = async () => {
//   if (mongoose.connection.readyState >= 1) return;
//   await mongoose.connect(MONGO_URI);
// };

// export default dbConnects;


import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("❌ Please add your MongoDB URI to .env.local");
}

let isConnected = false; // Track connection state

const dbConnects = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};

export default dbConnects;
