import mongoose from "mongoose";

const recordSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "Please add an amount"],
      min: [0, "Amount cannot be negative"],
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: [true, "Please specify if this is income or expense"],
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: [true, "Please add a date"],
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, "Notes cannot be more than 500 characters"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Record = mongoose.model("Record", recordSchema);
export default Record;
