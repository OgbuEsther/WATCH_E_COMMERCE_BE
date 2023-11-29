"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
    },
    desc: {
        type: String,
    },
    price: {
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
}, { timestamps: true });
exports.default = mongoose_1.default.model("products", ProductSchema);
