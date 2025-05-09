import { NextFunction, Request, Response } from "express";
import { HTTP } from "../utils/http_code";
import auth_services from "../services/auth_services";

class Auth_Controllers {
  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      const result = await auth_services.login(email, password);
      res.status(200).json({ ...HTTP.success, data: result });
    } catch (error) {
      next(error);
    }
  }
}

export default new Auth_Controllers();
