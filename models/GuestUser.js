import mongoose from "mongoose";

const guestUserSchema = new mongoose.Schema({
  publicUserId: { type: String, required: true },
  userAgent: String,
  ip: String,
  hasCopiedProduct: { type: Boolean, default: false },
  productRequest: [
    { type: mongoose.Schema.Types.ObjectId, ref: "ProductRequest" },
  ],
  guestToken: { type: String, required: true, unique: true },
});

export default mongoose.models.GuestUser ||
  mongoose.model("GuestUser", guestUserSchema);
