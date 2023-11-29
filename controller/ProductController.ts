
import productModels from "../models/productModels";
import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();
import cloudinary from "../utils/cloudinary";
import { uploadProducConfig } from "../utils/multer";
import {  payOut } from "./payWithFlutter";
import Flutterwave from "flutterwave-node-v3";
import axios from "axios";
import mongoose from "mongoose";
import categoryModel from "../models/categoryModel";
// create product

router.post("/new-product",uploadProducConfig, async (req: Request, res: Response) => {
  try {
    const { title, price, productImage, quantity, status , desc ,category } = req.body;
    const imgUploader = await cloudinary.uploader.upload(req?.file!.path);
    let getCatName = await categoryModel.findOne({ name: category });
    if (getCatName?.name === category) {
      const products = await productModels.create({
        title,
        price,
        productImage :imgUploader?.secure_url,
        quantity,
        status: true,
        desc,
        category
      });

         

          await getCatName?.products.push(
            new mongoose.Types.ObjectId(products?._id)
          );

          await getCatName?.save();

          if (!products) {
            return res.status(201).json({
              message: "couldn't create product",
             
            });
          } else {
            return res.status(201).json({
              message: "new product added",
              data: products,
            });
          }
        }else{
          return res.status(400).json({
            message: "failed to find an existing category ",
           
          
          });
        }
  

   
  } catch (error:any) {
    return res.status(400).json({
      message: "unable to create product",
      data: error,
      errMsg : error.message
    });
  }
});

//purchasing product

router.patch(
  "/purchase/:productID",
  async (req: Request, res: Response) => {
    try {
      const { qty } = req.body;

      const getProducts = await productModels.findById(req.params.productID);

      if (getProducts!.quantity == 0) {
        await productModels.findByIdAndUpdate(getProducts!._id, {
          status: false,
        },{new:true});
      } else {
        await productModels.findByIdAndUpdate(getProducts!._id, {
          quantity: getProducts?.quantity! - qty,
        },{new:true});

        return res.status(200).json({
          message : "added to cart",
          data : qty,
          result : getProducts?.quantity! - qty
        })
      }
    } catch (error) {
      res.status(404).json({
        message: "an error occured",
      });
    }
  }
);



//get all products

router.get("/allproducts", async (req: Request, res: Response) => {
  try {
    const getProducts = await productModels.find().sort({createdAt : -1});

    return res.status(200).json({
      messsage: "gotten all products",
      data: getProducts,
    });
  } catch (error) {
    res.status(404).json({
      message: "an error occured",
    });
  }
});

router.get("/allproducts/:id", async (req: Request, res: Response) => {
  try {
    const getProducts = await productModels.findById(req.params.id);

    return res.status(200).json({
      messsage: "gotten all products",
      data: getProducts,
    });
  } catch (error) {
    res.status(404).json({
      message: "an error occured",
    });
  }
});

router.post("/payOut" , payOut)
// router.post("/payOut" , makePayment)

router.post("/payment-callback", async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    const response = await axios.post(

      "https://api.flutterwave.com/v3/payments",
      {
        headers: {
          Authorization: `Bearer FLWSECK_TEST-8e72e4f893620e8e9cdb06e6ca76bf14-X`,
        },
        json: {
          tx_ref: "hooli-tx-1920bbtytty",
          amount: amount,
          currency: "NGN",
          redirect_url:
            "https://webhook.site/9d0b00ba-9a69-44fa-a43d-a82c33c36fdc",
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
      },
      // console.log("this is first reponse" , response)
      
    );
    if (req.query.status === "successful") {
      // const transactionDetails = await Transaction.find({ref: req.query.tx_ref});
      const response = await Flutterwave.Transaction.verify({
        id: req.query.transaction_id,
      });
      if (
        response.data.status === "successful" &&
        response.data.amount === amount &&
        response.data.currency === "NGN"
      ) {
        // Success! Confirm the customer's payment
        return res.status(200).json({
          message : "Successfull",
          data : response
        })
      } else {
        // Inform the customer their payment was unsuccessful
      }
    }
  } catch (err: any) {
    console.log(err.code);
    console.log(err.response.body);
  }
});

export default router;
