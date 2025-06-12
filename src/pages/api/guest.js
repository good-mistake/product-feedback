import { connectDB } from "../../utils/db";
import GuestUser from "../../../models/GuestUser";
import ProductRequest from "../../../models/ProductRequest";
import requestIp from "request-ip";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const clientIp = requestIp.getClientIp(req);
    const { userAgent, guestToken: clientGuestToken } = req.body;

    let guest = null;
    let newGuestToken = clientGuestToken;

    if (clientGuestToken) {
      guest = await GuestUser.findOne({ guestToken: clientGuestToken });
    }

    if (!guest) {
      guest = await GuestUser.findOne({ userAgent, ip: clientIp });
    }

    if (!guest) {
      newGuestToken = uuidv4();
      guest = await GuestUser.create({
        publicUserId: crypto.randomUUID(),
        userAgent,
        ip: clientIp,
        guestToken: newGuestToken,
        hasCopiedProduct: false,
        productRequest: [],
      });
    } else {
      if (!guest.guestToken) {
        newGuestToken = uuidv4();
        guest.guestToken = newGuestToken;
      }

      if (guest.userAgent !== userAgent || guest.ip !== clientIp) {
        guest.userAgent = userAgent;
        guest.ip = clientIp;
      }

      await guest.save();
    }

    if (!guest.hasCopiedProduct) {
      const seedProducts = await ProductRequest.find({
        isPublic: true,
        isSeed: true,
      });

      const duplicatedProducts = seedProducts.map((product) => {
        return new ProductRequest({
          title: product.title,
          category: product.category,
          upvotes: product.upvotes,
          status: product.status,
          description: product.description,
          comments: product.comments,
          userId: product.userId,
          isSeed: false,
          isPublic: true,
          publicId: `${product._id}-${uuidv4()}`,
          user: guest._id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });

      const inserted = await ProductRequest.insertMany(duplicatedProducts);

      guest.productRequest = inserted.map((doc) => doc._id);
      guest.hasCopiedProduct = true;
      await guest.save();
    }

    const updatedGuest = await GuestUser.findById(guest._id).populate(
      "productRequest"
    );

    return res.status(200).json({
      publicUserId: updatedGuest.publicUserId,
      guestToken: updatedGuest.guestToken,
      productCount: updatedGuest.productRequest.length,
      products: updatedGuest.productRequest,
    });
  } catch (err) {
    console.error("❌ Guest API Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
