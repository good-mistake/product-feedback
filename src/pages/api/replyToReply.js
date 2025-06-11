import { connectDB } from "../../utils/db";
import ProductRequest from "../../../models/ProductRequest";

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "POST") return res.status(405).end();

  try {
    const { productId, commentId, replyId, content, replyingTo, user } =
      req.body;

    const product = await ProductRequest.findById(productId);
    const comment = product.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    const targetReply = comment.replies.id(replyId);
    if (!targetReply)
      return res.status(404).json({ message: "Reply not found" });

    targetReply.repliesToReply = targetReply.repliesToReply || [];

    targetReply.repliesToReply.push({
      content,
      replyingTo,
      user,
    });

    await product.save();

    const updatedProduct = await ProductRequest.findById(productId);

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("replyToReply error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
