import symptom_controllers from "../controllers/symptomps_controllers";
import { Router } from "express";
const router = Router();

router
  .route("/")
  .get(symptom_controllers.getSymptoms)
  .post(symptom_controllers.createSymptom);

router
  .route("/:id")
  .get(symptom_controllers.getSymptomById)
  .delete(symptom_controllers.deleteSymptom)
  .patch(symptom_controllers.updateSymptomById);

export default router;
