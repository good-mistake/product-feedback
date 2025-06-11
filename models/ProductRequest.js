import mongoose from "mongoose";

const productRequestSchema = new mongoose.Schema(
  {
    title: String,
    category: String,
    upvotes: Number,
    status: String,
    description: String,
    comments: [
      {
        content: String,
        user: {
          image: String,
          name: String,
          username: String,
        },
        replies: [
          {
            content: String,
            replyingTo: String,
            user: {
              image: String,
              name: String,
              username: String,
            },
            repliesToReply: [
              {
                _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
                content: String,
                replyingTo: String,
                user: {
                  image: String,
                  name: String,
                  username: String,
                },
              },
            ],
          },
        ],
      },
    ],
    userId: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "GuestUser" },
    isSeed: { type: Boolean, default: false },
    isPublic: { type: Boolean, default: false },
    publicId: String,
    upvotedBy: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.ProductRequest ||
  mongoose.model("ProductRequest", productRequestSchema);
