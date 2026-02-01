import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();
const PORT = 4000;
const MONGO =
  process.env.MONGO_URI!;

mongoose
  .connect(MONGO)
  .then(() => {
    console.log("Mongo connected");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("Mongo connection error:", err);
    process.exit(1);
  });
