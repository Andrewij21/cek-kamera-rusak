import auth_controllers from "../controllers/auth_controllers";
import { Router } from "express";
const router = Router();

router.route("/login").post(auth_controllers.login);

export default router;
