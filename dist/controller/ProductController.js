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
const router = express_1.default.Router();
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const multer_1 = require("../utils/multer");
const payWithFlutter_1 = require("./payWithFlutter");
const flutterwave_node_v3_1 = __importDefault(require("flutterwave-node-v3"));
const axios_1 = __importDefault(require("axios"));
const mongoose_1 = __importDefault(require("mongoose"));
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
// create product
router.post("/new-product", multer_1.uploadProducConfig, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, price, productImage, quantity, status, desc, category } = req.body;
        const imgUploader = yield cloudinary_1.default.uploader.upload(req === null || req === void 0 ? void 0 : req.file.path);
        let getCatName = yield categoryModel_1.default.findOne({ name: category });
        if ((getCatName === null || getCatName === void 0 ? void 0 : getCatName.name) === category) {
            const products = yield productModels_1.default.create({
                title,
                price,
                productImage: imgUploader === null || imgUploader === void 0 ? void 0 : imgUploader.secure_url,
                quantity,
                status: true,
                desc,
                category
            });
            yield (getCatName === null || getCatName === void 0 ? void 0 : getCatName.products.push(new mongoose_1.default.Types.ObjectId(products === null || products === void 0 ? void 0 : products._id)));
            yield (getCatName === null || getCatName === void 0 ? void 0 : getCatName.save());
            if (!products) {
                return res.status(201).json({
                    message: "couldn't create product",
                });
            }
            else {
                return res.status(201).json({
                    message: "new product added",
                    data: products,
                });
            }
        }
        else {
            return res.status(400).json({
                message: "failed to find an existing category ",
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "unable to create product",
            data: error,
            errMsg: error.message
        });
    }
}));
//purchasing product
router.patch("/purchase/:productID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { qty } = req.body;
        const getProducts = yield productModels_1.default.findById(req.params.productID);
        if (getProducts.quantity == 0) {
            yield productModels_1.default.findByIdAndUpdate(getProducts._id, {
                status: false,
            }, { new: true });
        }
        else {
            yield productModels_1.default.findByIdAndUpdate(getProducts._id, {
                quantity: (getProducts === null || getProducts === void 0 ? void 0 : getProducts.quantity) - qty,
            }, { new: true });
            return res.status(200).json({
                message: "added to cart",
                data: qty,
                result: (getProducts === null || getProducts === void 0 ? void 0 : getProducts.quantity) - qty
            });
        }
    }
    catch (error) {
        res.status(404).json({
            message: "an error occured",
        });
    }
}));
//get all products
router.get("/allproducts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getProducts = yield productModels_1.default.find().sort({ createdAt: -1 });
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
router.post("/payOut", payWithFlutter_1.payOut);
// router.post("/payOut" , makePayment)
router.post("/payment-callback", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount } = req.body;
        const response = yield axios_1.default.post("https://api.flutterwave.com/v3/payments", {
            headers: {
                Authorization: `Bearer FLWSECK_TEST-8e72e4f893620e8e9cdb06e6ca76bf14-X`,
            },
            json: {
                tx_ref: "hooli-tx-1920bbtytty",
                amount: amount,
                currency: "NGN",
                redirect_url: "https://webhook.site/9d0b00ba-9a69-44fa-a43d-a82c33c36fdc",
                meta: {
                    consumer_id: 23,
                    consumer_mac: "92a3-912ba-1192a",
                },
                customer: {
                    email: "user@gmail.com",
                    phonenumber: "080****4528",
                    name: "Yemi Desola",
                },
                customizations: {
                    title: "Pied Piper Payments",
                    logo: "http://www.piedpiper.com/app/themes/joystick-v27/images/logo.png",
                },
            },
        });
        if (req.query.status === "successful") {
            // const transactionDetails = await Transaction.find({ref: req.query.tx_ref});
            const response = yield flutterwave_node_v3_1.default.Transaction.verify({
                id: req.query.transaction_id,
            });
            if (response.data.status === "successful" &&
                response.data.amount === amount &&
                response.data.currency === "NGN") {
                // Success! Confirm the customer's payment
                return res.status(200).json({
                    message: "Successfull",
                    data: response
                });
            }
            else {
                // Inform the customer their payment was unsuccessful
            }
        }
    }
    catch (err) {
        console.log(err.code);
        console.log(err.response.body);
    }
}));
exports.default = router;
