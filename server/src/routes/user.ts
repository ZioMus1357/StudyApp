import express from "express";
import User from "../models/User";
import { authenticate, authorize } from "../middleware/auth";

const router = express.Router();


router.get("/", authenticate, authorize(["admin"]), async (req, res) => {
  const users = await User.find({ role: "user" }).select("_id email");
  res.json(users);
});


router.put("/promote/:id", authenticate, authorize(["admin"]), async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { role: "admin" }, { new: true });
  res.json(user);
});

export default router;
