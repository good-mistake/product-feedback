import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  image: String,
  name: String,
  username: String,
});

export default mongoose.models.User || mongoose.model("User", userSchema);
