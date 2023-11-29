"use strict";
// Processing the payment with Flutterwave:
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
exports.payOut = void 0;
const express_1 = require("express");
// import adminModel from "../../model/admin/adminModel";
// import adminWalletModel from "../../model/admin/dashBoard/adminWallets";
// import adminTransactionHistory from "../../model/admin/dashBoard/adminTransactionHistorys";
// export const payInToWallet = async (req: Request, res: Response) => {
//   try {
//     const { amount } = req.body;
//     const getRegisterAdmin = await adminModel.findById(req.params.adminid);
//     if (getRegisterAdmin) {
//       const response = await fetch("https://api.flutterwave.com/v3/payments", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer FLWSECK_TEST-8e72e4f893620e8e9cdb06e6ca76bf14-X`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           tx_ref: `GenerateTransactionReference010`,
//           amount: `${amount}`,
//           currency: "NGN",
//           redirect_url: "https://firstcapital.vercel.app/",
//           meta: {
//             consumer_id: getRegisterAdmin?._id,
//             // consumer_mac: "92a3-912ba-1192a",
//           },
//           customer: {
//             email: getRegisterAdmin?.email,
//             phonenumber: 9078544231,
//             name: getRegisterAdmin?.name,
//           },
//           customizations: {
//             title: "easy pay",
//             logo: "https://firstcapital.vercel.app/assets/logo1-b9ccfcb5.png",
//           },
//         }),
//       });
//       if (response.ok) {
//         const responseBody = await response.json();
//         console.log(responseBody);
//         const getWallet = await adminWalletModel.findById(
//           getRegisterAdmin?._id
//         );
//         await adminWalletModel.findByIdAndUpdate(
//           getWallet?._id,
//           {
//             balance: getWallet?.balance! + amount,
//           },
//           { new: true }
//         );
//         const createHisorySender = await adminTransactionHistory.create({
//           message: `an amount of ${amount} has been credited to your wallet`,
//           transactionType: "credit",
//           // transactionReference: "12345",
//         });
//         getRegisterAdmin?.transactionHistory?.push(
//           new mongoose.Types.ObjectId(createHisorySender?._id)
//         );
//       }
//     } else {
//       return res.status(404).json({
//         message: "admin  not found",
//       });
//     }
//   } catch (error: any) {
//     return res.status(404).json({
//       message: "an error occurred",
//       err: error.message,
//     });
//   }
// };
const flutterwave_node_v3_1 = __importDefault(require("flutterwave-node-v3"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
// import clientModel from "../../model/client/clientModel";
//pay out
const payOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount } = req.body;
        // const getAdmin = await adminModel.findById(req.params.adminId)
        const getClient = yield UserModel_1.default.findById(req.params.clientId);
        const flw = new flutterwave_node_v3_1.default("FLWPUBK_TEST-03f9eb9c309accebdf4276837771bf91-X", "FLWSECK_TEST-8e72e4f893620e8e9cdb06e6ca76bf14-X");
        const details = {
            account_bank: "044",
            account_number: "0690000040",
            amount: amount,
            currency: "USD",
            narration: "Example DOM Payout",
            reference: "SAMPLE-REF003000",
            beneficiary_name: "SWMG",
            // redirect_url: "https://glaciers.titanic.com/handle-flutterwave-payment",
            meta: [
                {
                    // sender: getClient?.name,
                    // first_name: getClient?.name,
                    // last_name: getClient?.name,
                    // email: getClient?.email,
                    // beneficiary_country: "NG",
                    // mobile_number: getClient?.email,
                    // merchant_name: "Spotify",
                    sender: "getClient?.name",
                    first_name: "getClient?.name",
                    last_name: "getClient?.name",
                    email: "getClient?.email",
                    beneficiary_country: "NG",
                    mobile_number: "getClient?.email",
                    merchant_name: "Spotify",
                },
            ],
        };
        flw.Transfer.initiate(details).then(console.log).catch(console.log);
        // const createHistorySender = await adminTransactionHistory.create({
        //   message: `an amount of ${amount} has been credited to your account b y ${getClient?.name}`,
        //   transactionType: "credit",
        //   // transactionReference: "12345",
        // });
        // getAdmin?.transactionHistory?.push(
        //   new mongoose.Types.ObjectId(createHistorySender?._id)
        // );
        // getAdmin?.save()
        return res.status(201).json({
            message: "transfer successful",
            data: details,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "error",
            data: error,
        });
    }
});
exports.payOut = payOut;
const app = (0, express_1.Router)();
