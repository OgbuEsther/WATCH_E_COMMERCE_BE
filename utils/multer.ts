import multer from "multer";

import { Request } from "express";

type DestinationCallBack = (error: Error | null, destination: string) => void;

type FileCallBack = (error: Error | null, filename: string) => void;

const Storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallBack
  ) => {
    cb(null, "Uploads");
  },

  filename: (req: Request, file: Express.Multer.File, cb: FileCallBack) => {
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


const uploadProducConfig = multer({
  storage: Storage,
  // fileFilter: multerFilter
}).single("productImage")




//.single("productImage")
//array("productImage" ,10)




export {uploadProducConfig}