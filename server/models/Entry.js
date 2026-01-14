import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["income", "expense", "transaction"]
  },
  amountPHP: Number,
  effect: {
    type: String,
    enum: ["credit", "debit", "rebate"]
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Entry", entrySchema);
