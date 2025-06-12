import { connectDB } from "../utils/db";
import ProductRequest from "../../models/ProductRequest";

export async function generateParamsFromFeedbacks() {
  try {
    await connectDB();
    const feedbacks = await ProductRequest.find({}, "_id").lean();

    if (!feedbacks || feedbacks.length === 0) {
      console.warn("No feedbacks found during build.");
      return [];
    }

    return feedbacks.map((f) => ({ id: f._id.toString() }));
  } catch (error) {
    console.error("Error in generateParamsFromFeedbacks:", error);
    return [];
  }
}
