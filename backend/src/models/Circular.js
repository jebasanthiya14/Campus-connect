import mongoose from "mongoose";

const circularSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Circular", circularSchema);