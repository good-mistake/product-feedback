import { connectDB } from "../../utils/db";
import ProductRequest from "../../../models/ProductRequest";

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "GET") return res.status(405).end();

  const { id } = req.query;
  const feedback = await ProductRequest.findById(id).lean();

  if (!feedback) return res.status(404).json({ message: "Not found" });

  res.status(200).json(feedback);
}
