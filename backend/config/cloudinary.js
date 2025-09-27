// config/cloudinary.js
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dhaj5jjcc',
  api_key: process.env.CLOUDINARY_API_KEY || '316682575128269',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'V5acHLZJKXSzX74JIrXRD7veAQM',
});

export default cloudinary;