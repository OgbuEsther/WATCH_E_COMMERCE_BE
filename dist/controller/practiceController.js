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
const UserModel_1 = __importDefault(require("../models/UserModel"));
const router = express_1.default.Router();
//get all users
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchUsers = yield UserModel_1.default.find();
        return res.status(200).json({
            message: "Success",
            data: fetchUsers,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "User not found",
        });
    }
}));
//get one user
router.get("/:userID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchUser = yield UserModel_1.default.findById(req.params.userID);
        return res.status(200).json({
            message: "Success",
            data: fetchUser,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "User not found",
        });
    }
}));
//register a user
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, phoneNum } = req.body;
        const user = yield UserModel_1.default.create({
            name,
            email,
            password,
            phoneNum
        });
        return res.status(200).json({
            message: "Success",
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "could not create user",
        });
    }
}));
//login user
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const loginUser = yield UserModel_1.default.findOne({ email });
        if (loginUser) {
            return res.status(200).json({
                message: "success",
                data: loginUser,
            });
        }
        else {
            return res.status(200).json({
                message: "user not found",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "could not create user",
        });
    }
}));
exports.default = router;
