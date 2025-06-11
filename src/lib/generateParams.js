import { connectDB } from "../utils/db";
import ProductRequest from "../../models/ProductRequest";

export async function generateParamsFromFeedbacks() {
  await connectDB();
  const feedbacks = await ProductRequest.find({}, "_id");
  return feedbacks.map((f) => ({ id: f._id.toString() }));
}
