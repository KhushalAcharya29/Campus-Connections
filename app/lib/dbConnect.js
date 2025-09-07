// import mongoose from "mongoose";

// let connection = { isConnected: 0 }; // or let connection = { isConnected: false };

// async function dbConnect() {
//   if (connection.isConnected === 1) { // or if (connection.isConnected) {
//     console.log('Database is already connected');
//     return;
//   }
//   try {
//     const db = await mongoose.connect(process.env.MONGO_URI || '', {})
//     connection.isConnected = db.connections[0].readyState; // or connection.isConnected = db.connections[0].readyState === 1;
//     console.log("Database Connected!");
//   } catch (error) {
//     console.error("Database Connection Failed!", error);
//     process.exit(1)
//   }
// }

// export default dbConnect;