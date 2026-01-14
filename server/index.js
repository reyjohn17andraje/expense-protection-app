import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import entryRoutes from "./routes/entries.js";

const app = express();
app.use(cors());
app.use(express.json());

await connectDB();
app.use("/api/entries", entryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on ${PORT}`)
);
