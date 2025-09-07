import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost:27017/ratnam-connections";

const dbConnects = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGO_URI);
};

export default dbConnects;
