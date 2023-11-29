"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("cloudinary"));
const cloudinary = cloudinary_1.default.v2;
cloudinary.config({
    cloud_name: 'dlb98zagi',
    api_key: '818232649117599',
    api_secret: 'udn5wq3dGFPKIAaMCYxAPDCChak',
    secure: true
});
exports.default = cloudinary;
