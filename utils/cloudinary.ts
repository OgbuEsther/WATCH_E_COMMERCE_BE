import Cloud, { v2 } from "cloudinary";

const cloudinary: typeof v2 = Cloud.v2;

cloudinary.config({ 
  cloud_name: 'dlb98zagi', 
  api_key: '818232649117599', 
  api_secret: 'udn5wq3dGFPKIAaMCYxAPDCChak' ,
  secure : true
});
export default cloudinary;