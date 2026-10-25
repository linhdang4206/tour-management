import express, { Express } from "express";
// import sequelize from "./config/database";
import dotenv from "dotenv";
import clientRoutes from "./routes/client/index.route";

dotenv.config();

// sequelize;

const app : Express = express();
const port: number | string = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/public`));

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');


clientRoutes(app);

app.listen(port, () => {
    console.log(`App listenning on port ${port}`);
});
// app.get("/tours", async (req: Request, res: Response) => {
//   try {
//     const tours = await Tour.findAll({
//       raw: true
//     });
    

//     console.log("Dữ liệu lấy từ DB:", tours); 

//     res.status(200).json({
//       message: "Lấy dữ liệu thành công",
//       data: tours
//     });
//   } catch (error) {
//     console.error("Lỗi khi lấy data:", error);
//     res.status(500).json({ message: "Lỗi server", error });
//   }
// });
// res.redirect("client/pages/tours/index.pug");