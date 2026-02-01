import { Schema, model, Types } from "mongoose";

const taskProgressSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    task: {
      type: Types.ObjectId,
      ref: "Task",
      required: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);


taskProgressSchema.index({ user: 1, task: 1 }, { unique: true });

export default model("TaskProgress", taskProgressSchema);
