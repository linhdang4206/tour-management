import express, { Express } from "express";
// import sequelize from "./config/database";
import dotenv from "dotenv";
import path from "path";
import moment from "moment";
import bodyParser from "body-parser";
import clientRoutes from "./routes/client/index.route";
import adminRoutes from "./routes/admin/index.route";
import { systemConfig } from "./config/system";

dotenv.config();

// sequelize;

const app : Express = express();
const port: number | string = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));\
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

app.locals.moment = moment;
app.locals.prefixAdmin = systemConfig.prefixAdmin;

clientRoutes(app);
adminRoutes(app);



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