import { Router } from "express";
import Material from "../models/Material";
import { authenticate, authorize } from "../middleware/auth";

const router = Router();


router.get("/subcategory/:subId", authenticate, async (req, res) => {
  const materials = await Material.find({
    subcategory: req.params.subId
  });
  res.json(materials);
});

router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  async (req, res) => {
    const materials = await Material.find()
      .populate("category", "name")
      .populate("subcategory", "name")
      .populate("createdBy", "email");

    res.json(materials);
  }
);


router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  async (req, res) => {
    const material = await Material.create({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      subcategory: req.body.subcategory,
      createdBy: (req as any).user.sub
    });

    res.status(201).json(material);
  }
);



router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  async (req, res) => {
    await Material.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  }
);

export default router;
