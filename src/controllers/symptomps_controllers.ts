import { NextFunction, Request, Response } from "express";
import symptom_services from "../services/symtomps_services"; // pastikan path-nya benar
import { HTTP } from "../utils/http_code";

class Symptom_Controllers {
  async getSymptoms(req: Request, res: Response) {
    const symptoms = await symptom_services.getAll();
    res.status(200).json({ ...HTTP.success, data: symptoms });
  }

  async getSymptomById(req: Request, res: Response, next: NextFunction) {
    try {
      const symptom = await symptom_services.getById(req.params.id);
      res.status(200).json({ ...HTTP.success, data: symptom });
    } catch (error) {
      next(error);
    }
  }

  async createSymptom(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    try {
      const newSymptom = await symptom_services.add(body);
      res.status(201).json({ ...HTTP.created, data: newSymptom });
    } catch (error) {
      next(error);
    }
  }

  async updateSymptomById(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    const { id } = req.params;

    try {
      const symptom = await symptom_services.update(id, body);
      res.status(200).json({ ...HTTP.success, data: symptom });
    } catch (error) {
      next(error);
    }
  }

  async deleteSymptom(req: Request, res: Response, next: NextFunction) {
    try {
      const symptom = await symptom_services.delete(req.params.id);
      res.status(200).json({ ...HTTP.success, data: symptom });
    } catch (error) {
      next(error);
    }
  }
}

export default new Symptom_Controllers();
