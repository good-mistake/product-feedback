import { connectDB } from "../../utils/db";
import ProductRequest from "../../../models/ProductRequest";

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "POST") return res.status(405).end();

  const { productId, commentId, reply } = req.body;

  try {
    const updated = await ProductRequest.findOneAndUpdate(
      {
        _id: productId,
        "comments._id": commentId,
      },
      {
        $push: {
          "comments.$.replies": reply,
        },
      },
      { new: true }
    ).lean();

    res.status(200).json(updated);
  } catch (err) {
    console.error("Error adding reply:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}
