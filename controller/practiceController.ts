
import productModels from "../models/productModels";
import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel";
 const router = express.Router();

//get all users
router.get("/", async (req: Request, res: Response) => {
  try {
    const fetchUsers = await UserModel.find();

    return res.status(200).json({
      message: "Success",
      data: fetchUsers,
    });
  } catch (error) {
    return res.status(404).json({
      message: "User not found",
    });
  }
});
//get one user
router.get("/:userID", async (req: Request, res: Response) => {
  try {
    const fetchUser = await UserModel.findById(req.params.userID);

    return res.status(200).json({
      message: "Success",
      data: fetchUser,
    });
  } catch (error) {
    return res.status(404).json({
      message: "User not found",
    });
  }
});

//register a user

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password ,phoneNum } = req.body;

    const user = await UserModel.create({
      name,
      email,
      password,
      phoneNum
    });

    return res.status(200).json({
      message: "Success",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "could not create user",
    });
  }
});

//login user
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const loginUser = await UserModel.findOne({ email });
    if (loginUser) {
      return res.status(200).json({
        message: "success",
        data: loginUser,
      });
    } else {
      return res.status(200).json({
        message: "user not found",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "could not create user",
    });
  }
});


export default router