import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  createdBy: mongoose.Types.ObjectId;
  isGlobal: boolean;
  assignedTo: mongoose.Types.ObjectId[];
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    isGlobal: {
      type: Boolean,
      default: true
    },

    assignedTo: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", TaskSchema);
