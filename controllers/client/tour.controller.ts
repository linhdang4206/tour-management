import { QueryTypes } from "sequelize";
import sequelize from "../../config/database";
import Tour from "../../models/tour.model";
import { Request, Response } from "express";


export const index = async (req: Request, res: Response) => {
    const slugCategory = req.params.slugCategory;
    //SELECT * FROM tours WHERE deleted = false AND status = "active";
    // const tours = await Tour.findAll({
    // where: {
    //   deleted: false,
    //   status: "active"
    // },
    //   raw: true
    // });
    
//     SELECT tours.*, price * (1 - discount/100) AS price_special
//     FROM tours
//     JOIN tours_categories ON tours.id = tours_categories.tour_id
//     JOIN categories ON tours_categories.categorie_id = categories.id
//     WHERE 
//     categories.slug = 'du-lich-trong-nuoc'
//     AND categories.deleted = 0
//     AND categories.status = 'active'
//     AND tours.deleted = 0
//     AND tours.status = 'active';

    const tours = await sequelize.query(`
    SELECT tours.*, ROUND(price * (1 - discount/100), 0) AS price_special
    FROM tours
    JOIN tours_categories ON tours.id = tours_categories.tour_id
    JOIN categories ON tours_categories.categories_id = categories.id
    WHERE 
        categories.slug = ${slugCategory}
        AND categories.deleted = 0
        AND categories.status = 'active'
        AND tours.deleted = 0
        AND tours.status = 'active';
    `, {
      type: QueryTypes.SELECT
    });
    
    tours.forEach((item : any) =>{
       if(item["images"]) {
         const images = JSON.parse(item["images"]);
         item["images"] = images[0];
       }

       item["price_special"] = parseFloat(item["price_special"]);
    });


    res.render("client/pages/tours/index.pug", {
        pageTitle: "Danh sách tour",
        tours: tours
    });
};

export const detail = async (req: Request, res: Response) => {
  const slugTour = req.params.slugTour;
  
  const tourDetail = await Tour.findOne({
    where: {
      slug: slugTour,
      deleted: false,
      status: "active"
    },
    raw: true
  });

  tourDetail["images"] = JSON.parse(tourDetail["images"]);
  tourDetail["price_special"] =  tourDetail["price"] * (1 - tourDetail["discount"]/100);

  res.render("client/pages/tours/detail.pug", {
        pageTitle: "Chi tiết tour",
        tourDetail: tourDetail
    });

};