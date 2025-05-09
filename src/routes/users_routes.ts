import users_controllers from "../controllers/users_controllers";
import { Router } from "express";
const router = Router();

router
  .route("/")
  .get(users_controllers.getUsers)
  .post(users_controllers.createUser);

router
  .route("/:id")
  .get(users_controllers.getUserById)
  .post(users_controllers.addTodo)
  .delete(users_controllers.deleteUser)
  .patch(users_controllers.updateUserById);

export default router;
