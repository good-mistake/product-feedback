import { connectDB } from "../../utils/db";
import ProductRequest from "../../../models/ProductRequest";
import mongoose from "mongoose";

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "PUT")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const { title, description, category, productId, status } = req.body;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid productId" });
    }

    const updatedProduct = await ProductRequest.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(String(productId)),
      },
      { title, description, category, status },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Update feedback error:", error);
    return res.status(500).json({ error: "Failed to update feedback" });
  }
}
