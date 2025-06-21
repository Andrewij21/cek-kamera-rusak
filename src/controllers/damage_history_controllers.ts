import { NextFunction, Request, Response } from "express";
import damage_history_services from "../services/damage_history_services"; // pastikan path-nya benar
import { HTTP } from "../utils/http_code";

class Damage_History_Controllers {
  async getDamageHistories(req: Request, res: Response) {
    const symptoms = await damage_history_services.getAll();
    res.status(200).json({ ...HTTP.success, data: symptoms });
  }

  async getDamageHistoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const symptom = await damage_history_services.getById(req.params.id);
      res.status(200).json({ ...HTTP.success, data: symptom });
    } catch (error) {
      next(error);
    }
  }

  async createDamageHistory(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    try {
      const newSymptom = await damage_history_services.add(body);
      res.status(201).json({ ...HTTP.created, data: newSymptom });
    } catch (error) {
      next(error);
    }
  }

  async updateDamageHistoryById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { body } = req;
    const { id } = req.params;

    try {
      const symptom = await damage_history_services.update(id, body);
      res.status(200).json({ ...HTTP.success, data: symptom });
    } catch (error) {
      next(error);
    }
  }

  async deleteDamageHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const symptom = await damage_history_services.delete(req.params.id);
      res.status(200).json({ ...HTTP.success, data: symptom });
    } catch (error) {
      next(error);
    }
  }
}

export default new Damage_History_Controllers();
