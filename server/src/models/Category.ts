import { Schema, model, Types } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    parent: {
      type: Types.ObjectId,
      ref: "Category",
      default: null
    }
  },
  { timestamps: true }
);

export default model("Category", CategorySchema);
