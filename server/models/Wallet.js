import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  balancePHP: { type: Number, default: 0 }
});

export default mongoose.model("Wallet", walletSchema);
