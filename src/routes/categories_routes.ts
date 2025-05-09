import categories_controllers from "../controllers/categories_controllers";
import { Router } from "express";
const router = Router();

router
  .route("/")
  .get(categories_controllers.getCategories)
  .post(categories_controllers.createCategory);

router
  .route("/:id")
  .get(categories_controllers.getCategoryById)
  .delete(categories_controllers.deleteCategory)
  .patch(categories_controllers.updateCategoryById);

export default router;
