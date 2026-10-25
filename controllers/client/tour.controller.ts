import Tour from "../../models/tour.model";
import { Request, Response } from "express";


export const index = async (req: Request, res: Response) => {
    //SELECT * FROM tours WHERE deleted = false AND status = "active";
    const tours = await Tour.findAll({
    where: {
      deleted: false,
      status: "active"
    },
      raw: true
    });
    
    console.log("Dữ liệu lấy từ DB:", tours); 
    res.render("client/pages/tours/index.pug", {
        pageTitle: "Danh sách tour",
        tours: tours
    });
  };