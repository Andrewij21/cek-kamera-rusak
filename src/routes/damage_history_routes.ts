import Damage_History_controllers from "../controllers/damage_history_controllers";
import { Router } from "express";
const router = Router();

router
  .route("/")
  .get(Damage_History_controllers.getDamageHistories)
  .post(Damage_History_controllers.createDamageHistory);

router
  .route("/:id")
  .get(Damage_History_controllers.getDamageHistoryById)
  .delete(Damage_History_controllers.deleteDamageHistory)
  .patch(Damage_History_controllers.updateDamageHistoryById);

export default router;
