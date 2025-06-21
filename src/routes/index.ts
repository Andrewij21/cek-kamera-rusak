import { Router } from "express";
import categories_routes from "./categories_routes";
import users_routes from "./users_routes";
import symptomps_routes from "./symptomps_routes";
import damage_history_routes from "./damage_history_routes";
import auth_routes from "./auth_routes";
const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API",
  });
});

router.use("/auth", auth_routes);
router.use("/symptomps", symptomps_routes);
router.use("/users", users_routes);
router.use("/categories", categories_routes);
router.use("/damage-histories", damage_history_routes);

export default router;
