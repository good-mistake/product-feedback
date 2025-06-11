import { connectDB } from "../../utils/db";
import ProductRequest from "../../../models/ProductRequest";
import GuestUser from "../../../models/GuestUser";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  await connectDB();

  try {
    const { title, description, category, publicUserId } = req.body;

    if (!publicUserId) {
      return res.status(400).json({ error: "Missing publicUserId" });
    }

    const guestUser = await GuestUser.findOne({ publicUserId });

    if (!guestUser) {
      return res.status(404).json({ error: "Guest user not found" });
    }

    const newProduct = await ProductRequest.create({
      title,
      category,
      description,
      status: "suggestion",
      upvotes: 0,
      comments: [],
      userId: guestUser._id.toString(),
      user: guestUser._id,
      publicId: guestUser.publicUserId,
      isPublic: true,
    });
    guestUser.productRequest.push(newProduct._id);
    await guestUser.save();
    return res.status(200).json(newProduct);
  } catch (error) {
    console.error("Add feedback error:", error);
    return res.status(500).json({ error: "Failed to add feedback" });
  }
}
