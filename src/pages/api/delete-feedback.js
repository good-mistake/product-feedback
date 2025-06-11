import { connectDB } from "../../utils/db";
import ProductRequest from "../../../models/ProductRequest";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await connectDB();
    const { productId } = req.body;

    const deleted = await ProductRequest.findByIdAndDelete(productId);
    if (!deleted) return res.status(404).json({ error: "Not found" });

    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
