import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth";
import categoryRoutes from "./routes/category";
import materialRoutes from "./routes/material";
import taskRoutes from "./routes/task";
import userRoutes from "./routes/user";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
  res.send("Server is running!");
});

export default app;
