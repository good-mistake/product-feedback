import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import ProductRequest from "../models/ProductRequest.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGO_URI = process.env.MONGO_URI;

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const alreadySeeded = await ProductRequest.findOne({ isSeed: true });
    if (alreadySeeded) {
      console.log("⚠️ Already seeded. Skipping...");
      process.exit();
    }

    const dataPath = path.join(__dirname, "../data.json");
    const file = fs.readFileSync(dataPath, "utf-8");
    const data = JSON.parse(file);

    const seededRequests = data.productRequests.map((req) => ({
      title: req.title,
      category: req.category,
      upvotes: req.upvotes,
      status: req.status,
      description: req.description,
      comments:
        req.comments?.map((comment) => ({
          content: comment.content,
          user: comment.user,
          replies:
            comment.replies?.map((reply) => ({
              content: reply.content,
              replyingTo: reply.replyingTo,
              user: reply.user,
            })) || [],
        })) || [],
      isSeed: true,
      isPublic: true,
      userId: crypto.randomUUID(),
    }));

    await ProductRequest.insertMany(seededRequests);

    console.log("✅ Seeding completed.");
    process.exit();
  } catch (e) {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  }
};

seed();
