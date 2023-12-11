import {} from "dotenv/config";
import express, { Request, Response } from "express";
import * as AuthController from "../controllers/auth-controller";
import { validateRequestMiddleware } from "../middlewares";
import { handleResponseError } from "../Errors";
const authRoutes = express.Router();

authRoutes.post(
  "/login",
  validateRequestMiddleware("/login"),
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const result = await AuthController.login(email, password);
      const token = AuthController.tokenize(result);
      res.status(200).header("x-auth-token", token).json({ user: result });
    } catch (error) {
      handleResponseError(res, error);
    }
  }
);

authRoutes.post(
  "/verify",
  validateRequestMiddleware("/verify"),
  async (req: Request, res: Response) => {
    try {
      const { token } = req.body;
      const result = await AuthController.verify(token);
      res.status(200).header("x-auth-token", token).json({ user: result });
    } catch (error) {
      handleResponseError(res, error);
    }
  }
);

authRoutes.post(
  "/signup",
  validateRequestMiddleware("/signup"),
  async (req: Request, res: Response, next) => {
    try {
      let { name, email, password } = req.body;
      const result = await AuthController.signUp(name, email, password);
      res.status(201).json(result);
    } catch (error) {
      handleResponseError(res, error);
    }
  }
);

export default authRoutes;
