"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProducConfig = void 0;
const multer_1 = __importDefault(require("multer"));
const Storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("productImage")) {
//     cb(null, true);
//   } else {
//     cb("Please upload only images.", false);
//   }
// };
// const writerImgConfig = multer({
//   storage: Storage,
//   // fileFilter: multerFilter
// }).single("writerImg")
const uploadProducConfig = (0, multer_1.default)({
    storage: Storage,
    // fileFilter: multerFilter
}).single("productImage");
exports.uploadProducConfig = uploadProducConfig;
