import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


let initialized = false;
const MONGODBPATH = process.env.MONGODBPATH || "";

export const connectDB = async () => {
  if (!MONGODBPATH) throw new Error("MONGODBPATH is not set");

  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (mongoose.connection.readyState === 2) {
    await new Promise((r) => mongoose.connection.once("connected", r));
    return mongoose.connection;
  }

  try {
    const conn = await mongoose.connect(MONGODBPATH);

    if (!initialized) {
      initialized = true;

      mongoose.connection.on("error", (e) => {
        console.error("MongoDB error:", e);
      });
      mongoose.connection.on("disconnected", () => {
        console.warn("MongoDB disconnected");
      });

      const close = async () => {
        await mongoose.connection.close();
        console.log("DB connection closed");
        process.exit(0);
      };
      process.once("SIGINT", close);
      process.once("SIGTERM", close);
    }

    console.log(`DB connected: ${conn.connection.host}`);
    return mongoose.connection;
  } catch (err) {
    console.error("Failed to connect DB:", err);
    throw err;
  }
};
