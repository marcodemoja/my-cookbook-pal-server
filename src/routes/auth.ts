import {} from "dotenv/config";
import express, { Request, Response } from "express";
import UserController from "../controllers/user-controller";
import jwt from "jsonwebtoken";

const authRoutes = express.Router();
const controller = new UserController();

authRoutes.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    email.trim();
    password.trim();
    const user = await controller.login(email, password);
    const token = jwt.sign(
      JSON.stringify(user),
      process.env.JWT_SALT as string
    );
    res.status(200).header("x-auth-token", token).json({ user });
  } catch (err) {
    console.log("ERROR @ POST /auth/login", err);
    res.status(400).send("Unauthorized");
  }
});

authRoutes.post("/verify", async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    const user = await jwt.verify(token, process.env.JWT_SALT as string);
    res.status(200).header("x-auth-token", token).json({ user });
  } catch (err) {
    console.log("ERROR @ POST /auth/verify", err);
    res.status(401).send("Unauthorized");
  }
});

authRoutes.post("/signup", async (req: Request, res: Response, next) => {
  try {
    let { name, email, password } = req.body;
    const signup = await controller.signUp(email, password, name);
    res.status(201).json(signup);
  } catch (err) {
    console.log("ERROR @ POST /auth/signup", err);
    res.status(400).send("Unauthorized");
  }
});

export default authRoutes;
