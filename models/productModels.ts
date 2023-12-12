import mongoose from "mongoose";

interface Iprod {
  title: string;
  desc: string;
  price: number;
  quantity: number;
  productImage: string;
  status: boolean;
  category: string;
  oldPrice: number;
}

interface UserData extends Iprod, mongoose.Document {}

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    desc: {
      type: String,
    },

    price: {
      type: Number,
    },
    oldPrice: {
      type: Number,
    },
    quantity: {
      type: Number,
    },

    productImage: {
      type: String,
    },

    status: {
      type: Boolean,
    },
    category: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<UserData>("products", ProductSchema);
