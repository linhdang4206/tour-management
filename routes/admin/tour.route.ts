import { Router } from "express";
import multer from "multer";
import * as controller from "../../controllers/admin/tour.controller";
import * as uploadCloud "../../middlewares/admin/uploadCloud.middleware";

const router : Router = Router();

const upload = multer();


router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create",upload.fields([{ name: 'image', maxCount: 10 }]),uploadCloud.uploadFields, controller.createPost);


export const tourRoutes: Router = router;