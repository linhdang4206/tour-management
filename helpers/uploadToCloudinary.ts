import { Request, Response, NextFunction } from "express";
import { v2 as cloudinary } from "cloudinary";
import streamifier from 'streamifier';
import dotenv from "dotenv";
dotenv.config();

//Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET, // Click 'View API Keys' above to copy your API secret
});

//End Cloudinary
let streamUpload = (buffer) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream(
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
      );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export const uploadToCloudinary= async (buffer: any) => {
    let result = await streamUpload(buffer);
    return result["url"];
  }
