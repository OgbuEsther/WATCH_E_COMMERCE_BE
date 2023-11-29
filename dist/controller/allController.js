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
const productModels_1 = __importDefault(require("../models/productModels"));
const express_1 = __importDefault(require("express"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const router = express_1.default.Router();
//get all users
router.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchUser = yield UserModel_1.default.find();
        return res.status(200).json({
            message: "success",
            data: fetchUser,
        });
    }
    catch (err) {
        res.status(404).json({
            message: "an error occured",
        });
    }
}));
// register a user
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const createUser = yield UserModel_1.default.create({
            name,
            email,
            password,
        });
        return res.status(200).json({
            message: "success",
            data: createUser,
        });
    }
    catch (err) {
        res.status(404).json({
            message: "an error occured",
        });
    }
}));
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const createUser = yield UserModel_1.default.create({
            name,
            email,
            password,
            isAdmin: false,
        });
        return res.status(200).json({
            message: "success",
            data: createUser,
        });
    }
    catch (err) {
        res.status(404).json({
            message: "an error occured",
        });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const checkUser = yield UserModel_1.default.findOne({ email: email });
        if (checkUser) {
            return res.status(200).json({
                message: "success",
                data: checkUser,
            });
        }
        else {
            return res.status(200).json({
                message: "user not found",
            });
        }
    }
    catch (err) {
        res.status(404).json({
            message: "an error occured",
        });
    }
}));
// create product
router.post("/createProduct", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, desc, price, uploadProducConfig, quantity, status } = req.body;
        const imgUploader = yield cloudinary_1.default.uploader.upload(req === null || req === void 0 ? void 0 : req.file.path);
        const creating = yield productModels_1.default.create({
            title,
            desc,
            price,
            uploadProducConfig: imgUploader === null || imgUploader === void 0 ? void 0 : imgUploader.secure_url,
            quantity,
            status: true,
        });
        res.status(200).json({
            message: "successfully created",
            data: creating,
        });
    }
    catch (err) {
        res.status(404).json({
            message: "an error occured",
        });
    }
}));
//purchasing product
router.patch("/purchaseProduct/:productID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { qty } = req.body;
        // const getUser = await UserModel.findById(req.params.userID);
        const getProducts = yield productModels_1.default.findById(req.params.productID);
        if (getProducts.quantity == 0) {
            yield productModels_1.default.findByIdAndUpdate(getProducts._id, {
                status: false,
            });
        }
        else {
            yield productModels_1.default.findByIdAndUpdate(getProducts._id, {
                quantity: (getProducts === null || getProducts === void 0 ? void 0 : getProducts.quantity) - qty,
            });
        }
    }
    catch (err) {
        res.status(404).json({
            message: "an error occured",
        });
    }
}));
//get all products
router.get("/allproducts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getProducts = yield productModels_1.default.find();
        return res.status(200).json({
            messsage: "gotten all products",
            data: getProducts,
        });
    }
    catch (error) {
        res.status(404).json({
            message: "an error occured",
        });
    }
}));
router.get("/allproducts/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getProducts = yield productModels_1.default.findById(req.params.id);
        return res.status(200).json({
            messsage: "gotten all products",
            data: getProducts,
        });
    }
    catch (error) {
        res.status(404).json({
            message: "an error occured",
        });
    }
}));
exports.default = router;
