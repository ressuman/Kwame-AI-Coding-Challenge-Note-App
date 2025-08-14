import app from "./app.js";
import { connectDB } from "./config/db.js";
import { config } from "./config/env.js";

/**
 * The main function asynchronously connects to a database and starts a server listening on a specified
 * port.
 */
async function main() {
  await connectDB();

  app.listen(config.port, () => {
    console.log(`🚀 Server running on http://localhost:${config.port}`);
  });

  // Handle unhandled promise rejections
  process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    app.close(() => {
      process.exit(1);
    });
  });
}

main();
