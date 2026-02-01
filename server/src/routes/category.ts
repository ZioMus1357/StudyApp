import { Router } from "express";
import Category from "../models/Category";
import { authenticate, authorize } from "../middleware/auth";

const router = Router();


router.get("/", async (req, res) => {
  const { parent } = req.query;

  const filter =
    parent === "null"
      ? { parent: null }
      : parent
      ? { parent }
      : {};

  const categories = await Category.find(filter).sort({ name: 1 });
  res.json(categories);
});


router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  async (req, res) => {
    const { name, parent } = req.body;

    const category = await Category.create({
      name,
      parent: parent || null
    });

    res.status(201).json(category);
  }
);


router.put(
  "/:id",
  authenticate,
  authorize(["admin"]),
  async (req, res) => {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(category);
  }
);


router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  }
);

export default router;
