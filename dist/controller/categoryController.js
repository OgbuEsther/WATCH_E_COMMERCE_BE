"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const router = express_1.default.Router();
//get all users
router.post("/new-category", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const newCat = yield categoryModel_1.default.create({
            name,
        });
        return res.status(201).json({
            message: "new category added",
            data: newCat,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "an error occurred while creating a category",
            data: error.message,
            err: error,
        });
    }
}));
router.get("/all-category", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCat = yield categoryModel_1.default.find();
        return res.status(201).json({
            message: "new category added",
            data: newCat,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "an error occurred while creating a category",
            data: error.message,
            err: error,
        });
    }
}));
router.get("/all-category/:catId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const newCat = yield categoryModel_1.default.findById(req.params.catId).populate({ path: "products" });
        return res.status(201).json({
            message: "new category added",
            data: newCat,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "an error occurred while creating a category",
            data: error.message,
            err: error,
        });
    }
}));
exports.default = router;
