import { connectDB } from "../utils/db";
import ProductRequest from "../../models/ProductRequest";
import mongoose from "mongoose";

export async function getFeedbackById(id) {
  await connectDB();
  if (!mongoose.Types.ObjectId.isValid(id)) return null;

  const feedback = await ProductRequest.findById(id).lean();
  return feedback;
}
