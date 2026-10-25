import { Router } from "express";
import * as controller from "../../controllers/client/category.controller";

const router : Router = Router();


router.get("/category", controller.index);

export const categoryRoutes: Router = router;