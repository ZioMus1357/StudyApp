import { Schema, model, Types } from "mongoose";

const materialSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    category: {
      type: Types.ObjectId,
      ref: "Category",
      required: true
    },
    subcategory: {
      type: Types.ObjectId,
      ref: "Category",
      required: true
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

export default model("Material", materialSchema);
