import { Router } from "express";
import bcrypt from "bcrypt";
import { signAccessToken } from "../utils/jwt";
import User from "../models/User";

const router = Router();


router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
    role: "user", // ⬅️ DOMYŚLNA ROLA
  });

  res.status(201).json({
    message: "User created",
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
    },
  });
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }


  const accessToken = signAccessToken({
    sub: user._id,
    role: user.role,
  });


  res.json({
    accessToken,
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
    },
  });
});

export default router;
