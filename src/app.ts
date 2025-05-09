import express, { Express, NextFunction, Request, Response } from "express";
import createError, { HttpError } from "http-errors";
import routes from "./routes";
const app: Express = express();
import cors from "cors";

app.use(cors());

app.use(express.json());

app.use(routes);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404, "Request Not Found"));
});
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500).json({ message: err, error: err.stack });
});

export default app;
