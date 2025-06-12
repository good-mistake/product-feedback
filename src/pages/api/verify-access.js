import jwt from "jsonwebtoken";
import { getFeedbackById } from "../../lib/getFeedbackById";

export default async function handler(req, res) {
  const { id } = req.query;
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Missing authorization" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Invalid authorization format" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const feedback = await getFeedbackById(id);

    if (!feedback) {
      return res.status(404).json({ message: "Resource not found" });
    }

    if (feedback.ownerId !== decoded.userId) {
      return res
        .status(403)
        .json({ message: "Forbidden: No access to this resource" });
    }

    return res.status(200).json({ message: "Access granted" });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
