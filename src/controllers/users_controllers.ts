import { NextFunction, Request, Response } from "express";
import users_services from "../services/users_services";
import { HTTP } from "../utils/http_code";

class Users_Controllers {
  async getUsers(req: Request, res: Response) {
    const user = await users_services.getAll();
    res.status(200).json({ ...HTTP.success, data: user });
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await users_services.getById(req.params.id);
      res.status(200).json({ ...HTTP.success, data: user });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    try {
      const newUser = await users_services.add(body);
      res.status(201).json({ ...HTTP.created, data: newUser });
    } catch (error) {
      next(error);
    }
  }

  async updateUserById(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    const { id } = req.params;

    try {
      const user = await users_services.update(id, body);
      res.status(200).json({ ...HTTP.success, data: user });
    } catch (error) {
      next(error);
    }
  }
  async addTodo(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    const { id } = req.params;

    try {
      const user = await users_services.update(id, body);
      res.status(201).json({ ...HTTP.created, data: user });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await users_services.delete(req.params.id);
      res.status(200).json({ ...HTTP.success, data: user });
    } catch (error) {
      next(error);
    }
  }
}

export default new Users_Controllers();
