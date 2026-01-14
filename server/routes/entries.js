import express from "express";
import Entry from "../models/Entry.js";
import { getWallet, applyDelta } from "../services/walletService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { type, amountPHP } = req.body;
  const wallet = await getWallet();

  if (type === "expense" || type === "transaction") {
    if (wallet.balancePHP < amountPHP) {
      return res.status(400).json({ error: "Insufficient savings" });
    }

    await applyDelta(-amountPHP);
    await Entry.create({ type, amountPHP, effect: "debit" });

    await applyDelta(amountPHP);
    await Entry.create({ type, amountPHP, effect: "rebate" });

    return res.json({ status: "approved" });
  }

  if (type === "income") {
    await applyDelta(amountPHP);
    await Entry.create({ type, amountPHP, effect: "credit" });
    return res.json({ status: "added" });
  }

  res.status(400).json({ error: "Invalid type" });
});

router.get("/summary", async (_, res) => {
  const wallet = await getWallet();
  const entries = await Entry.find().sort({ createdAt: -1 });
  res.json({ balancePHP: wallet.balancePHP, entries });
});

export default router;
