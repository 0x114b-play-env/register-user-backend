import mongoose from "mongoose";

export default async () => {
  try {
    mongoose.connect(process.env.MONGOURL_LOCAL);
    console.log("✅ [Startup] Initial MongoDB connection established");
  } catch (error) {
    console.error("❌ [Startup] MongoDB connection failed:", error);
    process.exit(1);
  }

  let isFirstConnect = true;

  const { connection } = mongoose;

  // Fires when a (re)connection succeeds
  connection.on("connected", () => {
    if (isFirstConnect) {
      isFirstConnect = false;
      return;
    }
    console.log(`🔄 [Runtime] MongoDB reconnected to host: ${connection.host}`);
  });

  // Fires if the connection is lost
  connection.on("disconnected", () => {
    console.log("⚠️ [Runtime] MongoDB disconnected");
  });

  // Fires on connection errors
  connection.on("error", (err) => {
    console.error("🚨 [Runtime] MongoDB error:", err);
  });
};
