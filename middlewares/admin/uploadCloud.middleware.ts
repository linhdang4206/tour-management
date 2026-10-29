import { Request, Response, NextFunction } from "express";
import { uploadToCloudinary } from "../../helpers/uploadToCloudinary.ts";

export const uploadSinger = async (req : Request, res: Response, next: NextFunction) => {
  try{
    const result = await uploadToCloudinary(req["file"].buffer);
    req.body[req{"file"}.fieldname] = result;

  } catch (error) {

  }
  next();
};

export const uploadFields = async (req : Request, res: Response, next: NextFunction) => {
  for (const key in req["file"]){
    req.body[key] = [];

    const array = req["file"][key];
    for (const item of array){
      try { 
        const result = await uploadToCloudinary(req["file"].buffer);
        req.body[key].push(result);

  } catch (error) {
      
  }
  }
  next();
};