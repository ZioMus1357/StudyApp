import express from "express";
import Task from "../models/Task";
import { authenticate, authorize } from "../middleware/auth";
import TaskProgress from "../models/TaskProgress";

const router = express.Router();


router.get("/", authenticate, async (req, res) => {
  const userId = (req as any).user.sub;

  const tasks = await Task.find({
    $or: [
      { isGlobal: true },
      { assignedTo: userId }
    ]
  }).populate("createdBy", "email");

  res.json(tasks);
});




router.get("/my", authenticate, async (req, res) => {
  const user = (req as any).user.sub;

  const tasks = await Task.find({
    $or: [
      { isGlobal: true },
      { assignedTo: user }
    ]
  });

  const progress = await TaskProgress.find({ user });

  const progressMap = new Map(
    progress.map(p => [p.task.toString(), p.done])
  );

  const result = tasks.map(task => ({
    ...task.toObject(),
    done: progressMap.get(task._id.toString()) || false
  }));

  res.json(result);
});


router.get("/:id", authenticate, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Not found" });
  res.json(task);
});


router.post("/:id/toggle", authenticate, async (req, res) => {
  const user = (req as any).user.sub;
  const task = req.params.id;

  let progress = await TaskProgress.findOne({ user, task });

  if (!progress) {
    progress = await TaskProgress.create({
      user,
      task,
      done: true
    });
  } else {
    progress.done = !progress.done;
    await progress.save();
  }

  res.json(progress);
});





router.get(
  "/admin",
  authenticate,
  authorize(["admin"]),
  async (req, res) => {
    const tasks = await Task.find()
      .populate("assignedTo", "email")
      .populate("createdBy", "email");

    res.json(tasks);
  }
);

router.get("/", authenticate, authorize(["admin"]), async (req, res) => {
  const tasks = await Task.find().populate("assignedTo", "email");
  res.json(tasks);
});


router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  async (req, res) => {
    const { title, description, isGlobal, assignedTo } = req.body;
    const adminId = (req as any).user.sub;

    if (!isGlobal && (!assignedTo || assignedTo.length === 0)) {
      return res
        .status(400)
        .json({ message: "assignedTo required when isGlobal = false" });
    }

    const task = await Task.create({
      title,
      description,
      createdBy: adminId,
      isGlobal,
      assignedTo: isGlobal ? [] : assignedTo
    });

    res.status(201).json(task);
  }
);


router.put("/:id", authenticate, authorize(["admin"]), async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(task);
});


router.delete("/:id", authenticate, authorize(["admin"]), async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
