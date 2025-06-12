import { getFeedbackById } from "../../lib/getFeedbackById";
import { connectDB } from "../../utils/db";
import GuestUser from "../../../models/GuestUser";

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;
  const guestToken = req.headers["x-guest-token"];

  if (!guestToken) {
    return res.status(401).json({ message: "Missing guest token" });
  }

  const guest = await GuestUser.findOne({ guestToken });
  if (!guest) {
    return res.status(401).json({ message: "Invalid guest token" });
  }
  const feedback = await getFeedbackById(id);
  if (!feedback) {
    return res.status(404).json({ message: "Feedback not found" });
  }
  if (String(feedback.user) !== String(guest._id)) {
    return res.status(403).json({ message: "Forbidden" });
  }

  return res.status(200).json({ message: "Access granted" });
}
