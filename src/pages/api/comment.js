import { connectDB } from "../../utils/db";
import ProductRequest from "../../../models/ProductRequest";

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "POST") return res.status(405).end();

  const { productId, content, user } = req.body;

  const updated = await ProductRequest.findByIdAndUpdate(
    productId,
    {
      $push: {
        comments: {
          content,
          user,
          replies: [],
        },
      },
    },
    { new: true }
  ).lean();
  return res.status(200).json(updated);
}
