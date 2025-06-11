import { connectDB } from "../../utils/db";
import ProductRequest from "../../../models/ProductRequest";
import GuestUser from "../../../models/GuestUser";

export default async function handler(req, res) {
  await connectDB();
  if (req.method !== "POST") return res.status(405).end();

  const { productId, publicUserId } = req.body;

  try {
    const guest = await GuestUser.findOne({ publicUserId });
    const product = await ProductRequest.findById(productId);

    if (!guest || !product) return res.status(404).end();
    const alreadyUpvoted = product.upvotedBy.includes(guest._id);
    if (alreadyUpvoted) {
      product.upvotes -= 1;
      product.upvotedBy.pull(guest._id);
    } else {
      product.upvotes += 1;
      product.upvotedBy.push(guest._id);
    }
    await product.save();
    return res.status(200).json({ upvotes: product.upvotes });
  } catch {
    return res.status(500).json({ error: "Failed to toggle upvote." });
  }
}
