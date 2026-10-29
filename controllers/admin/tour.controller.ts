import { QueryTypes } from "sequelize";
import sequelize from "../../config/database";
import Tour from "../../models/tour.model";
import { Request, Response, Router } from "express";
import Category from "../../models/category.model";
import { generateTourCode } from "../../helpers/generate";
import { systemConfig } from "../../config/system";
import TourCategory from "../../models/tour_category.model";


export const index = async (req: Request, res: Response) => {
    // const slugCategory = req.params.slugCategory;
    //SELECT * FROM tours WHERE deleted = false AND status = "active";
    const tours = await Tour.findAll({
    where: {
      deleted: false,
      status: "active"
    },
      raw: true
    });
    
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

    // const tours = await sequelize.query(`
    // SELECT tours.*, ROUND(price * (1 - discount/100), 0) AS price_special
    // FROM tours
    // JOIN tours_categories ON tours.id = tours_categories.tour_id
    // JOIN categories ON tours_categories.categories_id = categories.id
    // WHERE 
    //     categories.slug = ${slugCategory}
    //     AND categories.deleted = 0
    //     AND categories.status = 'active'
    //     AND tours.deleted = 0
    //     AND tours.status = 'active';
    // `, {
    //   type: QueryTypes.SELECT
    // });
    
    tours.forEach((item : any) =>{
       if(item["images"]) {
         const images = JSON.parse(item["images"]);
         item["images"] = images[0];
       }

       item["price_special"] = parseFloat(item["price_special"]);
    });


    res.render("admin/pages/tours/index.pug", {
        pageTitle: "Danh sách tour",
        tours: tours
    });
};

export const create = async (req: Request, res: Response) => {
      //SELECT * FROM tours WHERE deleted = false AND status = "active";
    const categorys = await Category.findAll({
    where: {
      deleted: false,
      status: "active"
    },
      raw: true
    });

  res.render("admin/pages/tours/create.pug", {
        pageTitle: "Thêm tour mới",
        categorys: categorys  
    });

};

export const createPost = async (req: Request, res: Response) => {
  const countTour = await Tour.count();
  const code = generateTourCode(countTour + 1);

  if(req.body.position == ""){
      req.body.position = countTour + 1;
  } else {
     req.body.position = parseInt(req.body.position);
  }

  const dataTour = {
    title: req.body.title,
    code: code,
    images: JSON.stringify(req.body.images),
    price: parseInt(req.body.price),
    discount: parseInt(req.body.discount),
    stock: parseInt(req.body.stock),
    timeStart: req.body.timeStart,
    position: req.body.position,
    status: req.body.status,
    infomation: req.body.infomation,
    schedule: req.body.schedule,
  };

  const tour = await Tour.create(dataTour);
  const tourId = tour["id"];

  const dataTourCategory = {
    tour_id: "",
    category_id: parseInt(req.body.category_id)
  };

  await TourCategory.create(dataTour);

  res.redirect(`${systemConfig.prefixAdmin}/tours`);
}