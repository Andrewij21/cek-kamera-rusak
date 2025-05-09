import { NextFunction, Request, Response } from "express";
import categories_services from "../services/categories_services";
import { HTTP } from "../utils/http_code";

class Categories_Controllers {
  async getCategories(req: Request, res: Response) {
    const categories = await categories_services.getAll();
    res.status(200).json({ ...HTTP.success, data: categories });
  }

  async getCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await categories_services.getById(req.params.id);
      res.status(200).json({ ...HTTP.success, data: category });
    } catch (error) {
      next(error);
    }
  }

  async createCategory(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    try {
      const newCategory = await categories_services.add(body);
      res.status(201).json({ ...HTTP.created, data: newCategory });
    } catch (error) {
      next(error);
    }
  }

  async updateCategoryById(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    const { id } = req.params;

    try {
      const category = await categories_services.update(id, body);
      res.status(200).json({ ...HTTP.success, data: category });
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await categories_services.delete(req.params.id);
      res.status(200).json({ ...HTTP.success, data: category });
    } catch (error) {
      next(error);
    }
  }
}

export default new Categories_Controllers();
